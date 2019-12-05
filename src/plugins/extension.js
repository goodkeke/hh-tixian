/*
*  扩展函数
 */
import CryptoJS from 'crypto-js'
import md5 from 'md5'
import moment from "moment";
/**
 * @md5加密
 * @param str {string}
 * @return md5 {string}
 * */
export function callMd5(str){
    return md5(str)
}
/**
 * @防抖
 * @param fn {function}
 * @param delay {number}
 * */
export function _debounce(fn, delay){
    let timer;
    return function(){
        let args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
            timer = null;
            fn.apply(this,args)
        },delay)
    }
}
/**
 * @节流
 * @param fn {function}
 * @param t {number}
 * */
export function _throttle(fn, t) {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
}
/**
 * @name
 * @param timestamp {string|number} 时间戳
 * @param type {string} 类型
 * 时间戳格式化 */
 export function timestampToTime(timestamp,type) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() <10? '0'+date.getDate()+ ' ' : date.getDate() + ' ';
    let h = date.getHours()<10? '0'+date.getHours()+ ':' : date.getHours() + ':';
    let m = date.getMinutes() <10? '0'+date.getMinutes()+ ':' : date.getMinutes() + ':';
    let s = date.getSeconds() <10?'0'+date.getSeconds():date.getSeconds();
  if(type === 'ymdhms'){
      return Y + M + D + h + m + s;
  }else if (type === 'ymdhm'){
      return Y + M + D + h + m;
  } else {
      return Y + M + D
  }
}
/**
 * @本地存储数据
 * @param arg {string|Object} 参数如果为字符串则默认为set 如需存入object则传入对象 对象里必须包含key和data data 值可以为对象也可以为字符串
 * @return {Object || string}
 * */
export function localSet (arg){
    let type = typeof arg === 'string' ? 'get':'set';
    let action = {
        set(){
            localStorage.setItem(arg.key,JSON.stringify(arg.data));
        },
        get(){
            let data = localStorage.getItem(arg);
            return JSON.parse(data) ? JSON.parse(data) : data;
        }
    }
    return action[type]();
}

/**
 * @获取URL连接的参数
 * @param vhref {string}
 * @param name {string}
 * @return { string }
* */
export function getQueryStringV(vhref, name) {
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (vhref.indexOf('?') == -1 || vhref.indexOf(name + '=') == -1) {
        return '';
    }
    // 获取链接中参数部分
    let queryString = vhref.substring(vhref.indexOf('?') + 1);
    // 分离参数对 ?key=value&key2=value2
    let parameters = queryString.split('&');
    let pos, paraName, paraValue;
    for (let i = 0; i < parameters.length; i++) {
        // 获取等号位置
        pos = parameters[i].indexOf('=');
        if (pos === -1) {
            continue;
        }
        // 获取name 和 value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);

        if (paraName == name) {
            return parseInt(unescape(paraValue.replace(/\+/g, " ")));
        }
    }
    return '';
}

//参数加密
export const encryptBy = (plaintText,CRYPTOJSKEY) =>{
    var plaintText = plaintText;
    var options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
    var encryptedData = CryptoJS.DES.encrypt(plaintText, key, options);
    var encryptedBase64Str = encryptedData.toString();
    return encryptedBase64Str;
}

//参数解密
export const decryptBy = (encryptedBase64Str,CRYPTOJSKEY, type) => {

    var encryptedBase64Str = encryptedBase64Str;
    var options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
    // 解密
    var decryptedData = CryptoJS.DES.decrypt(encryptedBase64Str, key, options);
    // 解密后，需要按照Utf8的方式将明文转位字符串
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}

/**
 * @name 动态引入JS
 * @param jsSrc {string}
 * **/
export const asyncCreatScript = (jsSrc) => {
    let script=document.createElement("script");
    script.type="text/javascript";
    script.src= jsSrc;
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = ()=>{}
}
 export const util ={
    /*
    * 文件上传
    * e 选图片事件
    * type 1 头像 2 公告图片 3 资料管理 4 发文管理
    * imgSize 最大可上传图片大小，以M为单位 默认5M
    * fileSize 最大可上传文件大小，以M为单位 默认50M
    * */
    async upLoadFile(e,type,token,imgSize,fileSize){
        try {
            let file = await this.selectFile(e,imgSize,fileSize)
            // console.log('888888888',file) ;
            let form = new FormData();
            form.append('file', file);
            form.append('type', type);
            form.append('token', token);
            let respone = await new Promise((resolve,reject)=>{
                // httpFetch.defaultHttp(api,apiUrl.dataManage.imageUpload,form,respone=>{
                //   resolve(respone)
                // })
            })
            return respone ;
        } catch (e){
            // this.toast(e)
            console.log('error====>',e)
        }

    },
    async selectFile(e,imgSize,fileSize){
        let self = this ;
        let maxImgSize = imgSize?imgSize*1024*1024:5242880 ;
        let maxFileSize = fileSize?fileSize*1024*1024:52428800 ;
        let files = e.target.files || e.dataTransfer.files;
        if (files.length) {
            let allImgExt = '.jpg|.jpeg|.gif|.bmp|.png|.JPG|.JPEG|.GIF|.BMP|.PNG|' ;
            let allFileExt ='.doc|.docx|.xls|.xlsx|.ppt|.pptx|.wps|.txt|.PDF|' ;
            let filePath = files[0].name;
            let extName = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
            if (allImgExt.indexOf(extName + '|') == -1 && allFileExt.indexOf(extName + '|') == -1 ) {
                throw '请选择正确的文件类型！！！' ;
                return;
            }
            let arr = filePath.split('\\');
            let fileName = arr[arr.length - 1];
            let file = files[0];
            if (file) {
                //判断上传的附件是否为图片
                if(allImgExt.indexOf(extName + '|')>=0){
                    if (file.size > maxImgSize) {
                        throw '请上传不大于'+`${imgSize?imgSize:5}`+'M的图片！！！' ;
                    }
                    let Orientation ;
                    EXIF.getData(file, function(){
                        Orientation = EXIF.getTag(this, 'Orientation');
                    });
                    //图片超过指定大小500K则进行压缩
                    if (file.size > 512000) {
                        //读取图片url
                        let dateUrl = await new Promise((resolve,reject)=>{
                            let reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend=e=>resolve(reader.result)
                        })
                        //获取image对象
                        let  image = await new Promise((resolve,reject)=>{
                            let image = new Image();
                            image.name = name;
                            image.src = dateUrl;
                            image.onload=e=>resolve(image)
                        })
                        //图片压缩并转成Blob对象
                        file = await new Promise((resolve,reject)=>{
                            let canvas = document.createElement('canvas');
                            canvas.width = image.width || 3800;
                            canvas.height = image.height || 1900;
                            let imgWidth = image.width || 3800;
                            let imgHeight = image.height || 1900;
                            let ctx = canvas.getContext('2d');
                            ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
                            //修复ios上传图片的时候 被旋转的问题
                            if(Orientation != "" && Orientation != 1){
                                switch(Orientation){
                                    case 6://需要顺时针（向左）90度旋转
                                        self.rotateImg(image,'left',canvas);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转
                                        self.rotateImg(image,'right',canvas);
                                        break;
                                    case 3://需要180度旋转
                                        self.rotateImg(image,'right',canvas);//转两次
                                        self.rotateImg(image,'right',canvas);
                                        break;
                                }
                            }
                            var base64 = canvas.toDataURL('image/jpeg', 0.3);
                            var blob = self.dataURItoBlob(base64);
                            resolve(blob);
                        })
                    }
                    return file ;
                }else{
                    if (file.size > maxFileSize) {
                        throw '请上传不大于'+`${fileSize?fileSize:5}`+'M的文件！！！' ;
                    }
                    return file ;
                }

            }

        }
    },
    rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
            step = min_step;
        }
        if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
        } else {
            step--;
            step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
        }
    },
    dataURItoBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let blob = new Blob([ab], {type: mimeString}) ;
        return blob ;
    },

}
