<template>
    <div class="container">
        <menu-bar></menu-bar>
        <div class="header">
            <div class="head-img">
                <img src="~@/assets/images/register/logo-pink.png" alt="">
            </div>
            <div class="middle-part">
                <img src="~@/assets//images/cooperation/middle.png"/>
            </div>
            <div class="form">
                <img src="~@/assets/images/cooperation/title.png" alt="">
                <div class="form-cell">
                    <div class="form-item">
                        <input type="text" placeholder="真实姓名" v-model="form.name">
                    </div>
                    <div class="form-item">
                        <input type="tel" placeholder="手机号码" v-model="form.phone">
                    </div>
                    <div class="form-item">
                        <input type="text" placeholder="所在城市" v-model="form.provice">
                    </div>
                    <div class="form-item">
                        <input type="text" placeholder="经营领域（选填）">
                    </div>
                    <div class="form-item">
                        <input type="text" placeholder="所在公司（选填）">
                    </div>
                    <div class="form-item">
                        <input type="text" placeholder="电子邮箱（选填）">
                    </div>
                    <div class="form-item" @click="onSubmit"></div>
                </div>
            </div>
            <div class="foot">
                <div class="qrcode">
                    <div class="code-container">
                        <img src="~@/assets/images/cooperation/qrCode.png" alt="">
                    </div>
                </div>
                <p>长按下载二维码关注“呼哈商机”微信公众号了解更多</p>
            </div>
            <div class="side-bar">
                <ul>
                    <li v-for="(item, index) in tabs" :key="index" :class="{'tab-active' : tab === item.id}" @click="tab = item.id,setPage(item.id)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import menuBar from '_c/menuBar/index'
    import {commonApi} from "@/api";
    import {Toast} from 'vant'
    export default {
        components: {
            menuBar
        },
        name: "cooperation",
        data(){
            return {
                tab:4,
                form:{
                    name:'',
                    phone:'',
                    provice:'',
                    type:'huhaAllianceH5'
                },
                tabs: [
                    {id: 1, name: '呼哈城市'},
                    {id: 2, name: '商家招募'},
                    {id: 3, name: '赚钱联盟'},
                    {id: 4, name: '城市代理'}
                ],
            }
        },
        methods: {
            async onSubmit(){
                if(this.checkForm()){
                    let res = await commonApi(this.form,'cooperation','post');
                    res.retType === 1 && Toast('提交成功');
                }
            },
            checkForm(){
                if(this.form.phone == '' || !this.tools.isPhoneNumber(this.form.phone)){
                    Toast('请正确填写手机号码');
                    return false;
                }else if(this.form.name == ''){
                    Toast('姓名不能为空');
                    return false;
                }else if(this.form.provice == ''){
                    Toast('省份不能为空');
                    return false;
                }else{
                    return  true;
                }
            },
            setPage(n){
                if(n !== 4){
                    this.$emit('func',n);
                }
            }
        }

    }
</script>
<style scoped lang="scss">
    @import "~@/style/mixin";
    .container{
        .foot{
            margin-top: 20px;
            margin-bottom: 100px;
            position: relative;
            .qrcode{
                .code-container{
                    background: url("~@/assets/images/cooperation/qrcode-bg.png") no-repeat;
                    background-position: bottom;
                    background-size: 100%;
                    text-align: center;
                    width: 140px;
                    margin: auto;
                    display: block;
                    position: relative;
                    img{
                        width: 98px;
                        height: 98px;
                    }
                }
            }
            p{
                height: 100px;
                margin-top: 0;
                font-size: 12px;
                text-align: center;
                color: #666666;
            }
        }
        .form{
            width: 91% !important;
            .form-cell{
                text-align: center;
                margin: 30px auto 15px auto;
                .form-item{
                    position: relative;
                    width: 73%;
                    margin: 15px auto 0 auto;
                    padding: 8px 20px;
                    background-color: white;
                    border-radius: 20px;
                    border: 1px solid rgba(210, 210, 210, 1);
                    input{
                        width: 100%;
                        font-size: 12px;
                        color: black;
                    }
                    input::-webkit-input-placeholder {
                        color: #BEBEBE;
                    }
                    &:last-child{
                        height: 28px;
                        border: 0;
                        background: url("~@/assets/images/cooperation/btn-submit.png") no-repeat;
                        background-size: 100%;

                    }
                }
            }
            @include border;
            padding: 10px 0 1px 0;
            width: 388px;
            margin: 5px auto 10px auto;
            img{
                display: block;
                width: 245px;
                height: 41px;
                margin: 20px auto;
            }
        }
        .middle-part{
            margin: -130px auto 0 auto;
            width: 94%;
            img{
                width: 100%;
            }

        }
        .side-bar{
            top: 60px;
            position: absolute;
        }
        .header{
            height: 375px;
            .head-img{
                height: 100%;
                background: url("~@/assets/images/cooperation/banner-top.png") no-repeat;
                background-size: 100%;
                img{
                    width: 50px;
                    height: 50px;
                    margin: 15px 0 0 15px;
                }
            }
        }
    }
    @media screen and (max-width: 320px){

        .container{
            .middle-part{
                margin-top: -170px !important;
            }
            .side-bar{
                top: 30px ;
            }
        }
    }
</style>