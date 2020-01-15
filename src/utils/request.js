import axios from 'axios'
import { Toast } from 'vant';
import { encryptBy, decryptBy, callMd5,getQueryStringV } from "@/plugins/extension";
import apiList from "../api/config";
import Qs from 'qs'
import router from '../router'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_MOCK === 'true' ? 'http://rap2api.taobao.org/' : process.env.VUE_APP_API, // api的baseURL如果启用mock则使用mock地址
    timeout: 60000 // 请求超时时间,
});
const requestKey = 'U2FsdGVkX189N3VRCrUckSMoQM98v8PB';
const responseKey = 'U2FsdGVkXN32VRRCrUckSMoQM98v8PBHUHA';
const appKey = 'cb6015828a44b5234ce9ed1c3bc7acb0';
const SEEDMD5 = callMd5(requestKey);
// request拦截器
service.interceptors.request.use(config => {
    // @如果启用mock则使用mock地址
    if( process.env.VUE_APP_MOCK === 'true'){
        return config;
    }
    // 加密请求参数
    let slol = JSON.stringify(config.data);
    let data = encryptBy(slol, SEEDMD5);  //加密参数
    let t = Date.parse(new Date());       //时间戳

    let fString = appKey + "&" + t + "&" + data;
    let token = sessionStorage.token || getQueryStringV(window.location.href,'token');
    let sign = encryptBy(fString, SEEDMD5);
    let newParams = {
        data,
        appKey,
        t,
        sign,
        token
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
    // @如果启用mock则使用mock地址
    if( process.env.VUE_APP_MOCK === 'true'){
        if(response.data.retType !==1){
            Toast(response.data.message||'服务器器异常，请稍后再试');
            return false
        }else{
            return response.data;
        }
    }
    //解密接受参数
    response.data = JSON.parse(decryptBy(response.data,callMd5(responseKey)));
    const resData = response.data;
    console.log(resData)
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
        // const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
        Toast.fail(resData.retMsg  ? resData.retMsg : '服务器异常，请稍后再试');
        // router.replace({
        //     path: 'home',
        //     query: {redirect: router.currentRoute.fullPath}
        // });
        return {
            resData
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
