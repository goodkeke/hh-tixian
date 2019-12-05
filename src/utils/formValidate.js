

export const formValidate = {
    //手机格式校验
    'tel':function(value){
        if(!value){
            return true;
        }
        return (value.length<12)&&/0?(13|14|15|17|18|19)[0-9]{9}/.test(value);
    } ,
    //0或者正整数校验
    'positiveInteger':function(value){
        if(!value){
            return true;
        }
        return  (value.length<9)&&/^(0|\+?[1-9][0-9]*)$/.test(value)
    } ,
    //非负数
    'positive':function(value){
        // console.log("传进来的值是"+value);
        // console.log(/[1-9]\d*/.test(value));
        if(!value){
            return true;
        }
        // return (value.length<9)&&/([1-9]\d*)|(^0$)/.test(value)&&(/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value))&&(value.indexOf('.') == -1)&&(value!='')&&(value!=null)&&(value!=undefined);
        return  (value.length<9)&& /^\d+(\.{0,1}\d+){0,1}$/.test(value);
    } ,
    //请输入'+minval+'到'+maxval+'字符'
    'rangelength':function(value,param=[]){
        var length = 0;
        if(value){
            length = value.length
        }
        // return ( length >= param[ 0 ] && length <= param[ 1 ] );
        return ( length >= param[ 0 ] && length <= param[ 1 ] );
    } ,
    //请输入数字
    'number':function(value){
        if(!value){
            return true;
        }
        return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
    } ,
    //请输入范围在'+minval+'到'+maxval+'之间的值
    'range':function(value,param){
        if(!value){
            return true;
        }
        return ( parseInt(value) >= parseInt(param[ 0 ]) && parseInt(value) <= parseInt(param[ 1 ] ));
    } ,
    //请输入大于零且最多两位小数的数字
    'amount':function(value){
        if(!value){
            return true;
        }
        return /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/.test( value );
    } ,
    //必填项
    'required':function(value){
        return (value!=''&&value!=null&&value!=undefined);
    } ,
    //输入格式有误!
    'email':function(value){
        if(!value){
            return true;
        }
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
    },
    //输入内容不能全是数字！
    'limitNumOnly':function (value) {
        if(!value) return true ;
        return !this.number(value)
    },
    //
    'regExpRule':function (value,regExpRule) {
        if(!value) return true ;
        return regExpRule.test(value)
    },
    'validate':function (prop,value,rangeArr) {
        return this[prop]?this[prop](value,rangeArr):true ;
    },
    //input输入校验
    'validateInput':function (box) {
        let result = true ;
        if(box.require&&!box.value){
            box.errorMsg=box.name+'为必输项！' ;
            result = false ;
        }
        if(result&&box.rule){
            for(let prop in box.rule){
                if(this.hasOwnProperty(prop)&&prop!='errorMsg'){
                    result = this.validate(prop,box.value,box.rule[prop])
                    if(!result){
                        box.errorMsg = box.rule.errorMsg ;
                        break ;
                    }
                }
            }
        }
        if(result) box.errorMsg=''
    },
    'validateDateRange':function (box,sequence) {//sequence表示检查的是上限还是下限，0为上限 1 为下限
        let result = true ;
        if(sequence===0){
            if(box.require&&!box.minValue){
                box.errorMsg = box.name + '的起始日期为必输项' ;
                result = false ;
            }
        }else{
            if(box.require&&!box.maxValue){
                box.errorMsg = box.name + '的结束日期为必输项' ;
                result = false ;
            }
        }
        if(result){
            if(box.require&&(!box.minValue || !box.maxValue)){
                box.errorMsg = box.name + '的起始日期/结束日期为必输项' ;
                result = false ;
            }
        }
        if(result){
            result = compareDate(box.minValue,box.maxValue);
            if(!result){
                box.errorMsg=box.name+'结束日期需大于起始日期' ;
            }
        }
        if(result){
            box.errorMsg = '';
        }
    },
    'validateNumberRange':function (box,sequence) {//sequence表示检查的是上限还是下限，0为上限 1 为下限
        let result = true ;
        if(sequence===0){
            if(box.require&&!box.minValue){
                box.errorMsg = box.name + '的下限值为必输项' ;
                result = false ;
            }
        }else{
            if(box.require&&!box.maxValue){
                box.errorMsg = box.name + '的上限值为必输项' ;
                result = false ;
            }
        }
        if(result){
            if(box.require&&(!box.minValue || !box.maxValue)){
                box.errorMsg = box.name + '的下限值/上限值为必输项' ;
            }
        }
        if(result){
            if(box.rule){
                for(let prop in box.rule){
                    if(this.hasOwnProperty(prop)&&prop!='errorMsg'){
                        result = this.validate(prop,box.value,box.rule[prop])
                        if(!result){
                            box.errorMsg = box.rule.errorMsg ;
                            break ;
                        }
                    }
                }
            }
        }
        if(result){
            result = compareNumber(box.minValue,box.maxValue);
            if(!result){
                box.errorMsg=box.name+'下限值需小于上限值' ;
            }
        }
        if(result){
            box.errorMsg = '';
        }
    },
    //比较两个数大小
    compareNumber(begin,end) {
        if(!begin || !end) return true ;
        let min = parseFloat(begin);
        let max = parseFloat(end);
        let result = max-min ;
        if(result>0){
            this.errorMsg = '';
        }else{
            this.errorMsg=this.name+'下限值需小于上限值' ;
        }
        return result>0 ;
    },
    //比较两个日期大小
    compareDate (begin,end) {
        let startDate = new Date(begin.replace(/\-/g,"\/"));
        let endDate = new Date(end.replace(/\-/g,"\/"));
        let result = endDate>startDate ;
        return result ;
    }
}
