<template>
    <div class="promotionPage">
        <div class="promotion-title">素材中已合成您的专属二维码<br/>通过此二维码注册的新用户都在您的绑定关系中</div>
        <div class="section section-one">
            <div class="tag">邀请商家便利传单</div>
            <div class="main">
                <div class="canvas" id="poster1" v-if="poster1">
                    <img class="bg"  :src="imgData1.images" alt="" @click="openImg(imgData1.images)"/>
                    <img class="code" :src="imgData1.qrCode" alt=""/>
                </div>
                <img class="bg" v-else :src="posterUrl1" />
            </div>
            <div class="download-text">{{this.tools.isWeiXin?'长按保存图片':'长按下载'}}，A4纸黑白打印低成本物料</div>
            <div class="download-desc">到店→简易介绍→放下传单→下一家</div>
        </div>
        <div class="block-gray"></div>
        <div class="section section-two">
            <div class="tag">邀请商家电子海报</div>
            <div class="main">
                <div class="canvas" id="poster2" v-if="poster2">
                    <img class="bg" :src="imgData2.images" alt=""/>
                    <img class="code" :src="imgData2.qrCode" alt=""/>
                </div>
                <img class="bg" v-else :src="posterUrl2"/>
            </div>
            <div class="download-text">{{this.tools.isWeiXin?'长按保存图片':'长按下载'}}，用于发微信好友及朋友圈等</div>
        </div>
        <div class="block-gray"></div>
        <div class="section section-three">
            <div class="tag">邀请商家电子海报</div>
            <div class="main scroll-box" v-if="imgData3.images">
                <div class="cell"  v-for="(item,index) in  imgData3.images" :key="index">
                    <div class="canvas" :id="poster3[index].id" >
                        <img class="bg" :src="item" alt="" @click="openImg(item)"/>
                        <img class="code" :src="imgData3.qrCode" alt=""/>
                    </div>
                    <img :src="posterUrl3[index]"/>
                </div>
                <div class="block"></div>
            </div>
            <div class="download-text">{{this.tools.isWeiXin?'长按保存图片':'长按下载'}} ，用于发微信好友及朋友圈等<br/>请根据您的社交圈特色自主选择</div>
        </div>

        <!-- 查看大图 -->
        <div class="back-drop" v-if="popupShow" style="background:#000000;" @click="popupShow=false"></div>
        <div class="images-box" v-if="popupShow" @click="popupShow=false">
          <img :src="popupUrl"/>
        </div>

    </div>
</template>
 
<script>
import { commonApi }from '@/api/index';
import html2canvas from 'html2canvas'
export default {
    name: "promotionPage",
    data () {
        return {
          imgData1: '',
          imgData2: '',
          imgData3: '',
          popupShow: false,
          popupUrl: '',
          posterUrl:'',

          poster1: true,
          posterUrl1: '',
          poster2: true,
          posterUrl2: '',
          poster3: [],
          posterUrl3: []
        }
    },
    mounted () {
        this.sendInviteFn('alliance_posterA')
        this.sendInviteFn('alliance_posterB')
        this.sendInviteFn('alliance_posterC')
       
    },
    methods: {
        // 合成海报
        async createQrcode (type){
            let index
            if (type === 'alliance_posterA') {index=1}
            if (type === 'alliance_posterB') {index=2}
           
            console.log(type)
            let poster = document.getElementById('poster'+index);//海报
            html2canvas(poster,{useCORS:true}).then(canvas => {
                if (type === 'alliance_posterA') {
                    // this.poster1 = false;
                    this.posterUrl1 = canvas.toDataURL("image/png");
                }
                if (type === 'alliance_posterB') {
                    this.poster2 = false;
                    this.posterUrl2 = canvas.toDataURL("image/png");
                }
                // if (type === 'alliance_posterC') {
                //     this.poster3 = false;
                //     this.posterUrl3 = canvas.toDataURL("image/png");
                // }
               
            });
        },
       async draw(element,url){
            let poster = document.getElementById(element);//海报
            console.log(poster)
           setTimeout(()=>{
 html2canvas(poster,{useCORS:true,windowWidth: poster.scrollWidth,
                windowHeight: poster.scrollHeight,allowTaint:true,taintText:true}).then(canvas => {
                // console.log(this.imgData3.images[0])
                this.imgData3,images[0] = '2222222222222'
            //    this[url].push(canvas.toDataURL("image/png"));
               this[element].show = false
            });
           },5000)
        },
        // 查看大图
        openImg (url) {
            this.popupUrl = url
            this.popupShow = true
        },
        // 获取海报
        async sendInviteFn(type){
            let params = {
                shareType: type,  // 海报类型
                invitationCode: this.$route.query.code  // 邀请码
            }
            const data = await commonApi(params,'sendInvite','post');
            if (type=='alliance_posterA') {
                this.imgData1 = data.data
            }
            if (type=='alliance_posterB') {
                this.imgData2 = data.data
            }
            if (type=='alliance_posterC') {
                this.imgData3 = data.data
                this.imgData3.images = this.imgData3.images.split(',')
                this.imgData3.images.map((item,index)=>{
                   this.poster3.push({id: 'poster3-'+index, show: true })
                   console.log(this.poster3[index])
                   console.log(this.poster3[index].id)
                   this.$nextTick(()=>{
                     this.draw(this.poster3[index].id,'posterUrl3')
                   })
                    
                })
                console.log(this.poster3)
            }
            setTimeout(()=>{
                this.createQrcode(type)
            },2000)
        }
    }
}
</script>

<style scoped lang="scss">
    .promotionPage {
        .back-drop{
            height:100%;
            width:100%;
            background:#000;
            left:0;
            bottom:0;
            position: fixed;
            z-index: 100;
        }
        .promotion-title {
            background: #E0E0E0;
            color: #E4061B;
            text-align: center;
            font-size: 13px;
            padding: 10px 0;
        }
        .block-gray {
            height: 10px;
            background: #f8f8f8;
        }
        .section {
            .tag {
                color: #333;
                font-weight: bold;
                font-size: 18px;
                text-align: center;
                padding: 10px 0;
            }
            .download-text {
                color: #027AFF;
                font-size: 13px;
                text-align: center;
                margin: 10px 0;
            }
            .download-desc {
                font-size: 15px;
                color: #333;
                text-align: center;
                margin-bottom: 10px;
            }
            .canvas {
               width: 200px;
               position: relative;
               margin: 0 auto;
            }
            .main {
                text-align: center;
                .bg {
                    width: 200px;
                    display: block;
                }
                // .code {
                //    width: 30px;
                //    position: absolute;
                //    bottom: 35px;
                //    right: 25px;
                // }
            }
            .scroll-box {
                display: flex;
                display: -moz-flex;
                display: -webkit-flex;
                overflow-x: scroll;
                -webkit-overflow-scrolling: touch;
                .cell {
                    margin-left: 10px;
                }
                img {
                   
                    display: block;
                }
                .block {
                    width: 10px;
                }
            }
        }
        .section-one {
            .code {
                width:25px;
                position: absolute;
                bottom: 36px;
                right: 25px;
            }
        }
        .section-two {
            .code {
                width: 30px;
                position: absolute;
                bottom: 35px;
                right: 25px;
            }
        }
        .section-three {
            .code {
                width: 30px;
                position: absolute;
                bottom: 35px;
                right: 25px;
            }
        }
        // 查看大图
        .images-box {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 100%;
            z-index: 999;
            text-align: center;
            img {
                max-width: 80%;
            }
        }
    }

</style>
