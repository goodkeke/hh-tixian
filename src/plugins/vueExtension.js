import { Dialog } from 'vant'
import Vue from 'vue'
const common = {}
common.install = function (Vue){  //挂载vue扩展
    /**
     * @name 全局确认窗口
     * @param {Object}
     * @_title 为弹窗标题,msg为提示内容
     * @fn 为确认后执行的函数名
     * @data 如果需要在执行函数里传入参数则传入此字段
     * **/
    Vue.prototype.dialog = function(_title = '提示：', msg ='确认继续此操作吗？', fn='',data=[]){
        Dialog.confirm({
            title: _title,
            message: msg
        }).then(() => {
            fn && this[''+fn+''](data)
        }).catch(() => {
            // on cancel
        });
    }
}
Vue.use(common)