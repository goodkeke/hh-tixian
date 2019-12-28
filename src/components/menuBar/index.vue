<template>
        <div class="bottom-box">
            <div class="logo">
                <img src="~@/assets/images/logo.png" alt="">
                <div class="sub-name">
                    <h2>呼哈</h2>
                    <p>城市·生活·圈</p>
                </div>
            </div>
            <div class="btn-box">
                <button class="btn" @click="guide">攻略</button>
                <button class="btn" @click="jumpToRegister">注册</button>
            </div>
        </div>
</template>
<script>
    export default {
        name: "menuBar",
        data (){
             return {
                 active: 0
             }
        },
        methods:{
            jumpToRegister (){
                this.$router.push({name:'register'})
            },
            guide (){
                window.location.href = 'https://q.eqxiu.com/s/nc66XWqm';
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.container{
    .bottom-box{
        width: 100%;
        display: block;
        position: fixed;
        bottom: 0;
        background-color: white;
        height: 10vh;
        z-index: 100;
        border-top: 1px solid #ECECEC;
        @include center;
        .logo{
            display: inline-block;
            width: 50%;
            height: 11vh;
            vertical-align: middle;
            img{
                width: 2.2rem;
                height:2.2rem;
                vertical-align: middle;
                margin-top: 2vh;
                margin-left: 15px;
                display: inline-block;
            }
            .sub-name{
                margin-left: 3vw;
                margin-top:2vh;
                display: inline-block;
                width: 6rem;
                vertical-align: middle;
                h2{
                    font-size: 15px;
                    margin: 0;
                }
                p{
                    font-size: 12px;
                    margin: 0;
                }
            }
        }
        .btn-box{
            display: inline-block;
            width: 48%;
            vertical-align: middle;
            text-align: right;
            margin-top: -1vh;
            button{
                display: inline-block;
            }
        }
        .btn{
            @include btn-common(15px,rgba(248, 39, 68, 1));
            padding: 4px 25px;
            margin-right: 5px;
            font-size: 14px;
        }
    }
}
</style>