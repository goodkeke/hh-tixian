/*
 工具集合
*/
export default class tools{
    /**
     * @判断字符串是否为空
     * @return { boolean }
     * @param str
     **/
    static isNull (str){
        return str == null || str.length === 0 || str === '';
    }
    /**
     * @判断是否为身份证号码
     * @return { boolean }
     * @param str
     **/
    static isIdCard(str){
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }
    /**
     * @判断是否为手机号码
     * @return { boolean }
     * @param str
     **/
    static isPhoneNumber(str){
        return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
    }
    /**
     * @判断是否为数字
     * @return { boolean }
     * @param str
     **/
    static isNumber(str){
        return /^\d+$/.test(str)
    }
    /**
     * @数组去重
     * @return { array }
     * @param arr
     **/
    static _unique(arr){
        return Array.from(new Set(arr))
    }
    /**
     * @获取当前日期
     * @param {boolean} withTime-表示是否返回带有时分秒的日期默认为false
     * @return { string }
     **/
    static getToday(withTime = false){
        let now = new Date();
        let year = now.getFullYear(); //得到年份
        let month = now.getMonth(); //得到月份
        let date = now.getDate(); //得到日期
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        month = month + 1;
        month = month.toString().padStart(2, "0");
        date = date.toString().padStart(2, "0");
        hour = hour <= 9 ? '0' + hour : hour;
        minute = minute <= 9 ? '0' + minute : minute;
        second = second <= 9 ? '0' + second : second;
        return withTime ? `${year}-${month}-${date} ${hour}:${minute}${second}` : `${year}-${month}-${date}`;
    }
}
