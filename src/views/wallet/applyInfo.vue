<template>
    <div class="container">
        <div class="top">
            <div class="line"></div>
            <div class="item active">
                <span class="circle-step">1</span>
                <span>实名认证</span>
            </div>
            <div class="item">
                <span class="circle-step">2</span>
                <span>绑定银行卡</span>
            </div>
        </div>
        <div class="upload-context">
            <p>身份证证件</p>
            <div class="photo-container">
                <div class="item" @click="uploadFn('front')">
                    <img :class="{'pic-active':idCard.front.indexOf('oss') > -1}" :src="idCard.front"/>
                    <span v-if="fileList.length < 1">身份证人像面照片</span>
                </div>
                <div class="item" @click="uploadFn('back')">
                    <img :class="{'pic-active':idCard.back.indexOf('oss') > -1}" :src="idCard.back"/>
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
            <button class="btn-submit" @click="onSubmit" :class="{'btn-active': !firstStep}">下一步</button>
        </div>
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
        created() {
        //     if(!window.OSS) asyncCreatScript('https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js');
        },
        methods: {
            onSubmit(){
                Dialog.confirm(
                    {title:'提示',message:'请再次核对您的姓名和证件号信息！姓名：张三 证件号：33434',confirmButtonColor:'#E4061B'}).then(() =>{
                        console.log('done')
                }).catch(() =>{
                    console.log('done')
                })
            },
            uploadFn(side){
                let el = document.getElementsByClassName('van-uploader__input');
                if(side === 'back' && this.fileList.length < 1){
                    Toast('请先上传身份证正面！')
                }else{
                    el[el.length - 1].click();
                }
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
                   _this.idCard[side] = res.res.requestUrls[0].split("?")[0];
                    this.show = false;
                }).catch(err => {
                   this.show = false;
                   Toast('上传失败！')
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
    }
    .pic-active{
        width: 100% !important;
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
                    img{
                        width: 28px;
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