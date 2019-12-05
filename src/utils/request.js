import axios from 'axios'
import { Toast } from 'vant';
import { encryptBy, decryptBy, callMd5 } from "@/plugins/extension";
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API, // api的baseURL
    timeout: 60000 // 请求超时时间,
})
const requestKey = 'U2FsdGVkX189N3VRCrUckSMoQM98v8PB';
const responseKey = 'U2FsdGVkXN32VRRCrUckSMoQM98v8PBHUHA';
const appKey = 'cb6015828a44b5234ce9ed1c3bc7acb0';
const SEEDMD5 = callMd5(requestKey);
// request拦截器
service.interceptors.request.use(config => {
    //加密请求参数
    // let encode = encodeData(JSON.stringify(config.data),callMd5(requestKey));
    let slol = JSON.stringify(config.data);
    let data = encryptBy(slol, SEEDMD5);  //加密参数
    let t = Date.parse(new Date());       //时间戳

    let fString = appKey + "&" + t + "&" + data;
    let sign = encryptBy(fString, SEEDMD5);
    let newParams = {
        data,
        appKey,
        t,
        sign,
    }
    config.data = Qs.stringify(newParams);
    return config
}, error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
})
// response 拦截器
service.interceptors.response.use(response => {
    //解密接受参数
    console.log(response)
    response.data = JSON.parse(decryptBy(response.data,callMd5(responseKey)));
    const resData = response.data;
    const headers = response.headers;
    if (headers['content-type'] == 'application/vnd.ms-excel;charset=utf-8') {
        return response
    }

    //如果是否是文件流
    if (response.config.responseType === 'blob') {
        let a = new Blob([response.data]);
        let b = new FileReader()
        b.readAsText(a, 'utf-8');
        b.onload = () => {
            let msg = JSON.parse(b.result);
            Toast.fail(msg.message);
        }
    } else if (resData.retType !== 1 && resData.retType !== '1') {
        const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
        Toast.fail(resData.retMsg && reg.test(resData.retMsg) ? resData.retMsg : '服务器异常，请稍后再试')
        // return Promise.reject(new Error('error'))
        return {
            success: false
        }
    } else {
        return {
            success: true,
            ...resData
        }
    }
}, error => {
    Toast.fail(error.response && error.response.data.retMsg ? error.response.data.retMsg : '服务器异常，请稍后再试')
    // return Promise.reject(error)
    return {
        success: false
    }
})
export default service
