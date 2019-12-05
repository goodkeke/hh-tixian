<template>
    <div class="container">
        <div class="canvas" id="poster">
            <img v-show="showBg"  id="background" src="http://static.online.huhacity.com/huhagroup1/M00/00/6B/CgY8CF3omwOACBuoAAYb3a5_KN0427.png" />
            <img  :src="qrcodeImg" id="canvas" alt="" >
            <img v-show="posterUrl" :src="posterUrl" alt="">
            <canvas class="qr" id="qrCode-canvas"></canvas>
        </div>
    </div>
</template>
<script>
    import {commonApi} from "../../api";
    import QRcode from'qrcode'
    import html2canvas from 'html2canvas';
    export default {
        name: 'loginWindow',
        data(){
            return {
                posterUrl:'',
                qrcodeImg:'',
                showBg: true,
            }
        },
        methods:{
            async createQrcode (){
                let canvas = document.getElementById('qrCode-canvas');  //二维码
                QRcode.toCanvas(canvas, 'http://baidu.com', (error) => {
                    if(error){
                        console.log(error)
                    }else{
                        canvas.style.width = '5rem';
                        canvas.style.height = '5rem';
                        let poster = document.getElementById('poster');//海报
                        html2canvas(poster,{useCORS:true}).then(canvas => {
                            this.showBg = false;
                            this.posterUrl = canvas.toDataURL("image/png");
                        });
                    }
                })
            },
            isLoad(){
                let pic = document.getElementById('background');
                if(pic.offsetHeight === 0){
                    setTimeout(()=>{
                        this.createQrcode()
                    },2000)
                }else{
                    this.createQrcode()
                }
            }
        },
        mounted() {
            // this.createQrcode();
            this.isLoad();
        }
    }
</script>
<style scoped lang="scss">
    #poster{
        width: 375px;
        height: auto;
        position: relative;
    }
    img {
        width: 100%;
    }
    #canvas{
        width: 375px;
        height: 175px;
        position: absolute; bottom: 0;right:0;
    }
    #qrCode-canvas{
        position: absolute; bottom: 45px;right:20px;
    }
</style>