<template>
    <div class="container">
        <div class="top">
            <div class="line" :class="{ 'last-step' : !firstStep}"></div>
            <div class="item active">
                <span class="circle-step">1</span>
                <span>实名认证</span>
            </div>
            <div class="item" :class="{'active': !firstStep}">
                <span class="circle-step">2</span>
                <span>绑定银行卡</span>
            </div>
        </div>
        <div class="upload-context" v-if="firstStep">
            <p>身份证证件</p>
            <div class="photo-container">
                <div class="item" @click="uploadFn('front')">
                    <transition name="fade">
                    <img v-show="showPic" :class="{'pic-active': isOssFront}" :src="idCard.front"/>
                    </transition>
                    <span v-if="fileList.length < 1">身份证人像面照片</span>
                </div>
                <div class="item" @click="uploadFn('back')">
                    <transition name="fade">
                    <img v-show="showPic1" :class="{'pic-active': isOssBack}" :src="idCard.back"/>
                    </transition>
                    <span v-if="fileList.length < 2">身份证国徽面照片</span>
                </div>
            </div>
            <van-uploader
                    v-model="fileList"
                    multiple
                    :max-count="2"
                    :after-read="uploaded"
                    style="display: none"
            />
            <van-cell-group>
                <van-field label="证件姓名" v-model="info.name" placeholder="请输入证件上的姓名" />
                <van-field label="证件号码" v-model="info.idNumber" placeholder="请输入证件上的号码" />
            </van-cell-group>

        </div>
        <button class="btn-submit" @click="smartFunc" :class="{'btn-active': !firstStep}">{{ firstStep ? '下一步' : '提交'}}</button>
        <div class="confirm-box" v-if="!firstStep">
            <p>请绑定真实姓名为 <i>某某某</i> 的储蓄卡</p>
        </div>
        <div class="bank-box" v-if="!firstStep">
            <van-cell-group>
                <van-field label="银行卡号" v-model="info.bankAccount" placeholder="请输入银行卡号" />
            </van-cell-group>
        </div>
        <div class="describe" v-if="!firstStep">
            <p>提现说明</p>
            <p>1、仅可使用储蓄卡，请不要填写信用卡。</p>
            <p>2、绑定储蓄卡的持卡人需与实名认证所用姓名一致。</p>
            <p>3、支持的银行卡：中国工商银行、中国农业银行、中国建设银行、中国交通银行、招商银行、兴业银行、华夏银行、中信银行、邮政储蓄等。</p>
        </div>
        <van-overlay :show="show"> <van-loading size="24px">上传中...</van-loading> </van-overlay>
    </div>
</template>
<script>
    import { Dialog, Toast } from 'vant';
    import { asyncCreatScript } from '@/plugins/extension'
    import {commonApi} from "../../api";
    export default {
        name: "applyInfo",
        data(){
            return {
                show: false,
                showPic: true,
                showPic1: true,
                fileList: [],
                info: {
                    name: '',
                    idNumber: '',
                    bankAccount: ''
                },
                firstStep: true,
                idCard: {
                    front: require('../../assets/images/wallet/icon-add.png'),
                    back: require('../../assets/images/wallet/icon-add.png')
                }
            }
        },
        computed:{
            isOssFront: function(){
                return this.idCard.front.indexOf('oss') > -1;
            },
            isOssBack: function(){
                return this.idCard.back.indexOf('oss') > -1;
            },
            smartFunc: function(){
                return this.firstStep ? this.onSubmit : this.finalSubmit;
            }
        },
        created() {
            if(!window.OSS) asyncCreatScript('https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js');
        },
        methods: {
            finalSubmit(){
                if(this.info.bankAccount && this.tools.isNumber(this.info.bankAccount)){
                    /**
                     ** @ 项目紧急，日后再优化！！
                     * **/
                            if(!this.tools.isChinese(this.info.name)){
                                Toast('姓名只能为中文');
                                return;
                            }
                            if(!this.tools.isIdCard(this.info.idNumber)){
                                Toast('请输入正确的身份证号码');
                                return;
                            }
                            Dialog.confirm(
                                {title:'提示',message:`请再次核对您的姓名和证件号信息！姓名：${this.info.name} 证件号：${this.info.idNumber}`,confirmButtonColor:'#E4061B'}).then(() =>{
                                this.submitInfo();
                            }).catch(() =>{
                                console.log('操作取消')
                            })

                }else{
                    Toast('请填写正确的银行卡卡号');
                }
            },
            onSubmit(){
                if(this.idCard.front.indexOf('oss')> -1 && this.idCard.back.indexOf('oss')> -1){
                    if(this.info.name && this.info.idNumber){
                        this.firstStep = false;
                         }else{
                            Toast('请正确填写证件姓名和证件号码');
                        }
                    }else{
                        Toast('请上传身份证照片');
                    }
            },
            uploadFn(side){
                let el = document.getElementsByClassName('van-uploader__input');
                if(side === 'back' && this.fileList.length < 1){
                    Toast('请先上传身份证正面！')
                }else{
                    el[el.length - 1].click();
                }
            },
           async submitInfo(){
                 this.showPic = false;
                 this.showPic1 = false;
                const methods = {
                    name: this.info.name,
                    cardFront: this.idCard.front,
                    cardBack: this.idCard.back,
                    bankCard: this.info.bankAccount,
                    cardNum: this.info.idNumber
                };
                const res = await commonApi(methods, 'apply');
                Toast(res.retCode === 'SUCCESS' ? '提交成功': res.retMsg);
                res.retCode === 'SUCCESS' && this.$router.push({name:'withdraw',params:{info:{bankCard: methods.bankCard}}});

            },
           async uploaded(file){
                this.show = true;
                let _this = this;
                const res = await commonApi({uploadType: 'headPortrait'}, 'ossToken');

                const client = new OSS.Wrapper({
                    region: res.data.region,                 // 创建Bucket时会选择不同地区，根据自己的选择填入对应名称
                    accessKeyId: res.data.AccessKeyId,         // 填入你的accessKeyId
                    accessKeySecret: res.data.AccessKeySecret, // 填入你的accessKeySecret
                    secure:true,
                    stsToken: res.data.SecurityToken,
                    bucket: res.data.bucketName
                });
                const Name = file.file.name;
                const suffix = Name.substr(Name.indexOf('.'));          // 文件后缀
                const filename = Date.parse(new Date()) + suffix;
                await client.multipartUpload(res.data.catalogue+'/'+filename, file.file).then(res => {   // 上传
                   let side = _this.fileList.length > 1 ? 'back' : 'front';
                   //身份证照片URL
                    _this.idCard[side] = res.res.requestUrls[0].split("?")[0];
                    this.show = false;
                    //延迟显示已经长传的图片，不延默认图片更换新图片会显示过程。
                    setTimeout(()=> {
                        let defPic = side === 'back' ? 'showPic1':'showPic';
                        this[defPic] = true;
                    },200)
                  }).catch(err => {
                   this.show = false;
                   Toast('上传失败！');
                  })
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "~@/style/_mixin";
    @mixin panel {
        margin-top: 10px;
        padding: 6px;
        background-color: white;
    }
    .btn-active{
        background:linear-gradient(#F10059, #FF0014);
    }
    .btn-submit{
        @include btn-submit(absolute, #FB7B8A, #F67BA3);
        bottom: 20px;
        left: 14px;
    }
    .pic-active{
        width: 100% !important;
    }
    .last-step{
        &::after{
            width: 100% !important;
        }
    }
    .van-cell {
        padding: 10px 0;
        font-size: 15px;
    }
    .btn-active{
        background:linear-gradient(#F10059, #FF0014) !important;
    }
    .van-loading{
        position: absolute !important;
        top: 50%;
        left: 35%;
        color: white;
    }
    .container{
        background-color: #F8F8F8;
        .describe{
            padding:10px;
            p{
                color: #666666;
                font-size: 12px;
                margin: 4px 0;
            }
        }
        .bank-box {
            @include panel;
            padding: 0 10px;
        }
        .confirm-box{
            @include panel;
            text-align: center;
            font-size: 14px;
            p{
                color: #333333;
                i{
                    color: #E4061B;
                    font-style: normal;
                }
            }
        }
        .upload-context{
            margin-top: 10px;
            background-color: white;
            padding: 2px 10px;
            font-size: 14px;
            p{
                margin: 10px 0;
            }
            .photo-container{
                @include flex-center(row,space-between,center);
                .item{
                    flex: 1;
                    background-color: #F6F6F6;
                    border-radius: 5px;
                    border: 1px solid rgba(216,216,216,1);
                    height: 100px;
                    margin: 8px;
                    text-align: center;
                    line-height: 100px;
                    overflow: hidden;
                    img{
                        width: 28px;
                        transition: width ease-in-out .5s;
                    }
                    span{
                        color: #999999;
                        display: block;
                        margin-top: -70px;
                    }
                }
            }
        }
        .top{
            position: relative;
            background-color: white;
            @include flex-center(row,flex-start,center);
            padding: 25px 0;
            .line{
                position: absolute;
                top: 40px;
                left: 118px;
                width: 140px;
                height: 1px;
                background-color: #CBCBCB;
                &::after{
                    content: '';
                    display: block;
                    width: 70px;
                    background-color: #E4061B;
                    height: 1px;
                    position: absolute;
                    top: 0;
                }
            }
            .active{
                span{
                    color: #E4061B !important;

                }
                .circle-step{
                    border: 1px solid #E4061B !important;
                    color: #E4061B !important;
                }
            }
            .item{
                flex: 1;
                text-align: center;
                span{
                    display: block;
                    font-size: 12px;
                    margin: 6px 0;
                    color: #888888;
                }
                .circle-step{
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid #888888;
                    background-color: white;
                    border-radius: 50px;
                    text-align: center;
                    margin: auto;
                    color: #888888;
                }
            }

        }
    }

</style>