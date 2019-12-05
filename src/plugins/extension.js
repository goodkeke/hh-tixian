/*
* vue 扩展函数
 */
import CryptoJS from 'crypto-js'
import md5 from 'md5'
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
export function _throttle(fn, t){
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
 * @获取URL连接的参数
 * @param vhref {string}
 * @param name {string}
* */
export function getQueryStringV(vhref, name) {
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (vhref.indexOf("?") == -1 || vhref.indexOf(name + '=') == -1) {
        return '';
    }
    // 获取链接中参数部分
    var queryString = vhref.substring(vhref.indexOf("?") + 1);
    // 分离参数对 ?key=value&key2=value2
    var parameters = queryString.split("&");
    var pos, paraName, paraValue;
    for (var i = 0; i < parameters.length; i++) {
        // 获取等号位置
        pos = parameters[i].indexOf('=');
        if (pos == -1) {
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

//encode string
export const encryptBy =(plaintText,CRYPTOJSKEY) =>{
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
export const holdTodonwLoad = function(el='download',button='downloadBtn'){
  const qrcode = document.getElementsByClassName(el)[0];
  const btn = document.getElementById(button);
  qrcode.addEventListener('touchstart',()=>{
      this.startTime = +new Date();
      this.timer = setTimeout(()=>{
      },1000)
  })
  qrcode.addEventListener('touchend',()=>{
      this.endTime = +new Date();
      clearTimeout(this.timer);
      if(this.endTime - this.startTime < 1000){
          btn.click()
      }
  })
}

