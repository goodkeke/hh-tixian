(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b89090a"],{"092c":function(t,e,a){t.exports=a.p+"img/middle.80cba81b.png"},"1e4c":function(t,e,a){},"3b8c":function(t,e,a){},"4e78":function(t,e,a){"use strict";var i=a("3b8c"),n=a.n(i);n.a},"521c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-box"},[t._m(0),a("div",{staticClass:"btn-box"},[a("button",{staticClass:"btn",on:{click:t.jumpToRegister}},[t._v("注册")])])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"logo"},[i("img",{attrs:{src:a("9d64"),alt:""}}),i("div",{staticClass:"sub-name"},[i("h2",[t._v("呼哈")]),i("p",[t._v("城市·生活·圈")])])])}],s={name:"menuBar",data:function(){return{active:0}},methods:{jumpToRegister:function(){this.$router.push({name:"register"})}}},r=s,c=(a("4e78"),a("2877")),o=Object(c["a"])(r,i,n,!1,null,"3d63c0d8",null);e["a"]=o.exports},"7ef8":function(t,e,a){t.exports=a.p+"img/title.58d862be.png"},"9d64":function(t,e,a){t.exports=a.p+"img/logo.7eeec91f.png"},a97c:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("menu-bar"),i("div",{staticClass:"header"},[t._m(0),t._m(1),i("div",{staticClass:"form"},[i("img",{attrs:{src:a("7ef8"),alt:""}}),i("div",{staticClass:"form-cell"},[i("div",{staticClass:"form-item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],attrs:{type:"text",placeholder:"真实姓名"},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value)}}})]),i("div",{staticClass:"form-item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.phone,expression:"form.phone"}],attrs:{type:"tel",placeholder:"手机号码"},domProps:{value:t.form.phone},on:{input:function(e){e.target.composing||t.$set(t.form,"phone",e.target.value)}}})]),i("div",{staticClass:"form-item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.form.provice,expression:"form.provice"}],attrs:{type:"text",placeholder:"所在城市"},domProps:{value:t.form.provice},on:{input:function(e){e.target.composing||t.$set(t.form,"provice",e.target.value)}}})]),t._m(2),t._m(3),t._m(4),i("div",{staticClass:"form-item",on:{click:t.onSubmit}})])]),t._m(5),i("div",{staticClass:"side-bar"},[i("ul",[i("li",{class:{"tab-active":"home"===t.tab},on:{click:function(e){t.tab=1,t.setPageTitle(1)}}},[t._v(" 呼哈城市 ")]),i("li",{class:{"tab-active":"bluePage"===t.tab},on:{click:function(e){t.tab=2,t.setPageTitle(2)}}},[t._v(" 商家招募 ")]),i("li",{class:{"tab-active":"orangePage"===t.tab},on:{click:function(e){t.tab=3,t.setPageTitle(3)}}},[t._v(" 赚钱联盟 ")]),i("li",{staticClass:"tab-active",on:{click:function(e){t.tab=4,t.setPageTitle(4)}}},[t._v(" 城市代理 ")])])])])],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"head-img"},[i("img",{attrs:{src:a("7b80"),alt:""}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"middle-part"},[i("img",{attrs:{src:a("092c")}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item"},[a("input",{attrs:{type:"text",placeholder:"经营领域（选填）"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item"},[a("input",{attrs:{type:"text",placeholder:"所在公司（选填）"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item"},[a("input",{attrs:{type:"text",placeholder:"电子邮箱（选填）"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"foot"},[i("div",{staticClass:"qrcode"},[i("div",{staticClass:"code-container"},[i("img",{attrs:{src:a("8dae"),alt:""}})])]),i("p",[t._v("长按下载二维码关注“呼哈商机”微信公众号了解更多")])])}],s=(a("b0c0"),a("d3b7"),a("e7e5"),a("d399")),r=(a("96cf"),a("521c")),c=a("365c"),o={components:{menuBar:r["a"]},name:"cooperation",data:function(){return{tab:4,form:{name:"",phone:"",provice:"",type:"huhaAllianceH5"},names:["home","bluePage","orangePage","cooperation"]}},mounted:function(){},methods:{onSubmit:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.checkForm()){e.next=5;break}return e.next=3,regeneratorRuntime.awrap(Object(c["a"])(this.form,"cooperation","post"));case 3:t=e.sent,1===t.retType&&Object(s["a"])("提交成功");case 5:case"end":return e.stop()}}),null,this)},checkForm:function(){return""!=this.form.phone&&this.tools.isPhoneNumber(this.form.phone)?""==this.form.name?(Object(s["a"])("姓名不能为空"),!1):""!=this.form.provice||(Object(s["a"])("省份不能为空"),!1):(Object(s["a"])("请正确填写手机号码"),!1)},setPageTitle:function(t){4!==t&&(console.log(t),this.$emit("func",t))}}},l=o,m=(a("b3b2"),a("2877")),u=Object(m["a"])(l,i,n,!1,null,"4b54b280",null);e["default"]=u.exports},b3b2:function(t,e,a){"use strict";var i=a("1e4c"),n=a.n(i);n.a}}]);