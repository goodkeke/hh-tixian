<template>
    <div>
        <div class="mask">
        </div>
        <div class="dialog-win">
            <img @click="closeWin" class="close-window" src="~@/assets/images/dialog/icon-close.png" alt="">
            <div class="dialog-title">
                <img  src="~@/assets/images/dialog/icon-success.png" alt="">
                <h2>注册成功</h2>
            </div>
            <div class="dialog-body">
<!--                <p>请选择操作</p>-->
                <ul>
<!--                    <li>-->
<!--                        <div class="box">-->
<!--                            <p>注册商号</p>-->
<!--                            <div class="box-item">-->
<!--                                <div class="title-icon">-->
<!--                                    <img src="~@/assets/images/register/logo-blue.png" alt=""> <span>呼哈城市商家版</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="box-item">-->
<!--                                <button class="btn-small" @click="jump(1)">打开</button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </li>-->
                    <li style="padding:  10px 0">
                        <div class="box">
                            <div class="sigle-box">
                                <img style="display: block;margin: auto;" src="~@/assets/images/register/logo-red.png" alt="">
                                <span style="display: block;margin: auto;text-align: center;color: #333333">呼哈城市App</span>
                            </div>
                            <div class="">
                                <!-- <button class="btn-small" style="padding: 10px 20px;margin: 10px auto;display: block;font-size:14px" @click="jump(2)">点击下载APP</button> -->
                                <!-- 应用宝下架临时解决方案 -->
                                 <button class="btn-small" style="padding: 10px 20px;margin: 10px auto;display: block;font-size:14px" @click="jump(0)">android下载</button>
                                  <button class="btn-small" style="padding: 10px 20px;margin: 10px auto;display: block;font-size:14px" @click="jump(1)">ios下载</button>
                            </div>
                        </div>
                    </li>
<!--                    <li>-->
<!--                        <div class="box">-->
<!--                            <p>开通社区号·查看会员权限</p>-->
<!--                            <div class="box-item">-->
<!--                                <div class="title-icon">-->
<!--                                    <img src="~@/assets/images/register/logo-red.png" alt=""> <span>呼哈城市App</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="box-item">-->
<!--                                <button class="btn-small" @click="jump(2)">打开</button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <div class="box">-->
<!--                            <p>激活联盟号</p>-->
<!--                            <div class="box-item">-->
<!--                                <div class="title-icon">-->
<!--                                    <img src="~@/assets/images/register/logo-none.png" alt=""> <span>呼哈联盟</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="box-item">-->
<!--                                <button class="btn-small" @click="jump(3)">打开</button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </li>-->
                </ul>
            </div>
<!--            <div class="footer">-->
<!--                <h2>城市代理</h2>-->
<!--                <p>关注微信公众号"呼哈商机"和我们联系</p>-->
<!--                <a class="download" href="~@/assets/images/cooperation/qrCode.png" download="qrCode.png" style="display: none"></a>-->
<!--                <img id="downloadBtn" src="~@/assets/images/cooperation/qrCode.png" alt="">-->
<!--                <p>长按下载二维码</p>-->
<!--            </div>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: "dialogWindow",
        data (){
            return {
                timer:null,
                startTime:'',
                endTime:''
            }
        },
        mounted(){
        },
        methods:{
            closeWin(){
                this.$emit('closeWindow');
            },
            jump(num){
                // let links = ['https://a.app.qq.com/o/simple.jsp?pkgname=com.sunfun.huhacitybd','http://a.app.qq.com/o/simple.jsp?pkgname=com.sunfun.huhacity','http://lm.huhacity.com']
                // location.href = links[num-1];
                //  应用宝下架临时解决方案 
                let links = [
                    'http://static.online.huhacity.com/huhagroup1/M00/00/A4/CgY8CF4Cti2ATRWuAe9P8xNpt-c220.apk',
                    'https://apps.apple.com/cn/app/id1099020818'
                ]
                if (this.tools.isWeiXin()&&num==0) {
                    this.$emit('openDrop');
                } else {
                    location.href = links[num];
                }
            },
        }
    }
</script>
<style scoped lang="scss">
    .dialog-win{
        padding: 40px 20px !important;
        .dialog-title{
            margin-top: -20px !important;
            margin-bottom: 10px;
        }
    }

    .footer{
        padding: 10px;
        margin-top: 10px;
        text-align: center;
        h2{
            font-size:18px;
            margin:0 !important;
        }
        p{
            font-size: 12px;
            color:rgba(51,51,51,1);
            &:last-child{
                color: rgba(228,6,27,1);
            }
        }
    }
    .btn-small{
        border: 0;
        background-color: #E4061B ;
        font-size: 12px;
        border-radius: 20px;
        padding: 5px 20px;
        color: white;
        min-width: 115px;
    }
    .close-window{
        width:41px ;
        height: 41px;
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translate(-50%,0);
    }
</style>