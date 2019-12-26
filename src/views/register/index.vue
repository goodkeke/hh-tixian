<template>
    <div class="container">
        <transition name='fade'>
        <dialog-window @closeWindow="closeWin" @openDrop="opendrop" v-show="isShow"></dialog-window>
        </transition>
        <div class="form">
            <div class="form-top">
                <img class="photo-1" src="~@/assets/images/register/logo-pink.png" alt="">
                <p>注册呼哈</p>
                <img class="photo-2" src="~@/assets/images/register/title.png" alt="">
            </div>
            <div class="form-file">
                <div class="input-item">
                    <input type="tel" v-model="form.phone" placeholder="请输入手机号码" maxlength="11">
                </div>
                <div class="input-item">
                        <input type="text" v-model="form.smCode" ref="form"  placeholder="请输入验证码" maxlength="6">
                        <button class="btn-code" @click="validator" :class="{'disabled': !btnValible}">{{buttonName}}</button>
                </div>
                <div class="input-item">
                    <input type="password" v-model="form.password"  placeholder="请输入6位数字密码" maxlength="6">
                </div>
                <div class="btn-box">
                    <button class="btn-submit" @click="onSubmit">完 成 注 册</button>
                </div>
            </div>
            <div class="form-bottom">
                <!-- <p>已注册用户请点击下方按钮登录</p> -->
                <div class="icon-box">
<!--                    <div class="icon-item">-->
<!--                        <a href="https://a.app.qq.com/o/simple.jsp?pkgname=com.sunfun.huhacitybd">-->
<!--                        <img src="~@/assets/images/register/logo-blue.png" alt=""></a>-->
<!--                    </div>-->
<!--                    <div class="icon-item">-->
<!--                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sunfun.huhacity"><img src="~@/assets/images/register/logo-red.png" alt=""></a>-->
<!--                    </div>-->
<!--                    <div class="icon-item">-->
<!--                        <a href="http://lm.huhacity.com">-->
<!--                            <img src="~@/assets/images/register/logo-none.png" alt="">-->
<!--                        </a>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
        <div class="drop" @click="closeDrop" v-if="isDrop">
            <img src="~@/assets/images/register/drop_icon.png"/>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'vant'
    import dialogWindow from '_c/dialog/index'
    import {commonApi} from "@/api";
    import { clearTimeout, setTimeout } from 'timers';
    import {_debounce} from '@/plugins/extension'
    export default {
        name: "register",
        components: {
            dialogWindow
        },
        data(){
            return {
                buttonName: '获取验证码',
                btnValible: true,
                isShow:  false,
                second: 60,
				phoneAvailable: false,
                form:{
                    phone: '',
                    smCode: '',
                    password: '',
                    invitationCode: ''
                },
                isDrop: false
            }
        },
        watch: {
            //监听密码框
            'form.password':{
                    handler (value){
                        if(!this.tools.isNumber(value)){
                            Toast('密码只能为6位数字');
                            this.form.password = '';
                        }
                    }
            },
        },
        mounted(){
            this.form.invitationCode = localStorage.getItem('inviteCode');
        },
        methods:{
		   
		 async phoneCheck(){
			    const res = await commonApi({phone:this.form.phone},'checkPhone','post');
				if(!res.data){
					this.sendMsg();
				}else{
					Toast('手机号已被注册');
				}
		   },
           async validator(){
               if(!this.tools.isPhoneNumber(this.form.phone)){
                   Toast('请输入正确的手机号码');
				   return;
               }else if(this.btnValible){
                   this.phoneCheck();
               }
            },
			async sendMsg(){
				let res = await commonApi({sc: 'register',phone:this.form.phone},'getCode','post');
				res.retType == 1 && Toast('发送成功');
				if(res.success){
					this.timer();
				}	
			},
            timer () {
                let result = setInterval(()=>{
                    this.second--;
                    this.buttonName = `重新获取(${this.second}s)`;
                    this.btnValible = false;
                    if(this.second <= 0)
                    {
                        clearInterval(result);
                        this.btnValible = true;
                        this.buttonName = '获取验证码';
                        this.second = 60;
                    }
                }, 1000);
            },
            onSubmit:_debounce(function(){
               if(this.tools.isNull(this.form.phone)){
                    Toast('请输入手机号码');
                }else if(this.tools.isNull(this.form.smCode)){
                    Toast('请输入验证码');
                }else if(this.tools.isNull(this.form.password)){
                    Toast('请输入密码');
                }else if(!this.tools.isNumber(this.form.password)){
                    Toast('密码只能为6位数字');
                }else{
                    this.register()
                }
            },500),
           async register(){
               let res = await commonApi(this.form,'register','post');
               if(res.retType == 1){
                   this.isShow = true;
               }
            },
            closeWin() {
                this.isShow = false;
				location.href = location.href;
            },
            opendrop () {
                this.isDrop = true
            },
            closeDrop () {
                this.isDrop = false
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "~@/style/mixin";
.container{
    .disabled{
        color:#999999 !important;
    }
    background: url("~@/assets/images/tab-1-1-bg.png") no-repeat;
    background-size: 130%;
    background-color:rgba(255, 74, 42, 1) ;
    .form{
        padding-top: 5vh;
        .form-bottom{
            display: block;
            position: relative;
            width: 75%;
            margin: auto;
            p{
                color: white;
                font-size: 14px;
                margin: 20px auto 10px auto;
                text-align: center;
            }
            .icon-box{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                margin-top: 30px;
                .icon-item{
                    flex: 1;
                    width: 33.33%;
                    text-align: center;
                    img{
                        width: 58px;
                        height: 58px;
                    }
                }
            }
        }
        .form-file{
            text-align: center;
            width: 20rem;
            margin: 3vh auto 2vh auto;
            .btn-submit{
                display: block;
                width: 100%;
                padding: 2px;
                font-size: 18px;
                color: white;
                border-radius: 20px;
                border: 0;
                background-color: rgba(247, 181, 0, 1);
            }
            .btn-box{
                position: relative;
                width: 72vw;
                margin: 15px auto 0 auto;
                padding: 8px 20px;
                background-color: rgba(247, 181, 0, 1);
                border-radius: 22px;
            }
            .input-item{
                position: relative;
                width: 72vw;
                margin: 15px auto 0 auto;
                padding: 8px 20px;
                background-color: white;
                border-radius: 20px;
                input{
                    width: 100%;
                    font-size: 14px;
                    color: rgba(153, 153, 153, 1);
                }
                .btn-code{
                    @include btn-common;
                    background-color: white;
                    color: rgba(228, 6, 27, 1);
                    font-size: 14px;
                    position: absolute;
                    top: 50%;
                    margin-top: -12px;
                    right: 10px;
                }
            }
        }
        .form-top{
            text-align: center;
            p{
                color: white;
                font-size: 15px;
                margin: 0;
            }
            .photo-2{
                width: 6.8rem;
                height: 1.3rem;
                margin-top: 12px;
            }
            .photo-1{
                width: 87px;
                height: 89px;
            }
        }
    }
    .drop {
        background: rgba(0,0,0,0.5);
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        img {
            width: 300px;
            position: absolute;
            right: 15px;
            top: 15px;
        }
    }
}
</style>