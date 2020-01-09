<template>
    <div class="wrapper">
        <div class="panel">
            <div class="top">呼哈币余额（个）</div>
            <div class="btm">{{money}}</div>
        </div>
        <div class="field">
            <van-field label='兑换数量' placeholder='请输入数量' type="number" v-model="amount">
                <van-button slot="button" size="small" type="danger" plain @click="amount = parseInt(money/10000)*10000">全部</van-button>
            </van-field>
            <p class="tip" :class="err ? 'hh-red' : 'hh-blue'">{{tip}}</p>
        </div>
        <div class="button">
            <button class="btn-submit" :class="{'disable':disabled}" :disabled="disabled" @click="onExchange">马上兑换</button>
        </div>
        <div class="content">
            <span>说明：</span>
            <ul>
                <li>呼哈币购物抵用：100币=1元，最低抵用数额为100个币，每次抵用的数额只能是100的倍数；</li>
                <li>呼哈币兑换现金：10000币=95元（100币＜1元），最低兑换数额为10000个币，每次兑换的数额只能是10000的倍数；</li>
                <li>通过满百返币、交易收款、平台直接赠送及其他赏币功能获得的呼哈币可兑换成现金。</li>
            </ul>
        </div>
        <van-popup v-model="isShowPop" position="bottom" class="pop" round closeable >
            <p class="title">输入密码</p>
            <p class="tip">请输入登录密码，确保交易安全</p>
            <!-- 密码输入框 -->
            <van-password-input :value="pwd" :focused="showKeyboard" @focus="showKeyboard = true" />
            <div class="txt hh-red" @click="this.$route.push('/')">忘记密码?</div>
        </van-popup>
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    export default {
        name: "exchange",
        data(){
            return{
                money:'89999.90',
                amount:'',
                tip:'最低兑换数量10000个，请输入10000或10000的倍数',
                err:true,
                disabled:false,
                isShowPop:false,
                pwd:'',
                showKeyboard:'',
            }
        },
        watch:{
            amount:{
                handler(val){
                    if(val){
                        if(val>=10000 && val%10000 == 0){
                            this.err = false;
                            this.disabled = false;
                            this.tip = '可兑换'+parseInt(val/10000)*95+'元';
                        }else {
                            this.err = false;
                            this.disabled = true;
                            this.tip='请输入10000或10000的倍数'
                        }
                    }else {
                        this.err = true;
                        this.tip = '最低兑换数量10000个，请输入10000或10000的倍数';
                    }
                }
            }
        },
        methods:{
            //马上兑换
            onExchange(){
                Dialog.confirm({
                    message:'确定将呼哈币兑换成现金吗？',
                    confirmButtonText:'确定',
                    confirmButtonColor:'#E4061B'
                }).then(() =>{
                    this.isShowPop = !this.isShowPop;
                }).catch(() => {
                })
            },
            onInput(key) {
                this.pwd = (this.pwd + key).slice(0, 6);
            },
            onDelete() {
                this.pwd = this.pwd.slice(0, this.pwd.length - 1);
            }
        }
    }
</script>

<style lang="scss">
    .field{
        .van-button--danger{
            color: #E4061B;
            border: none;
            font-size: 13px;
        }
    }
</style>
<style lang="scss" scoped>
    @import "~@/style/_mixin";
.wrapper{
    width: 100%;
    height: 100%;
    background: #F6F6F6;
    .panel{
        height: 65px;
        text-align: center;
        padding: 25px 0;
        background: #fff;
        .top{
            font-size: 12px;
            height: 30px;
            line-height: 30px;
        }
        .btm{
            height: 35px;
            line-height: 35px;
            font-size:30px;
            font-weight:bold;
            color:rgba(228,6,27,1);
        }
    }
    .field{
        margin-top: 10px;
        .tip{
            font-size: 12px;
            padding: 0 15px;
            margin: 7px 0 ;
        }
    }
    .button{
        padding: 0 15px;
        margin: 35px auto;
        .btn-submit{
            @include btn-submit(relative);
        }
        .disable{
         opacity: 0.5;
        }
    }
    .content{
        padding: 15px;
        font-size:12px;
        color: #666;
        span{
            line-height: 20px;
        }
        ul {
            li{
                 list-style: decimal inside;
                    line-height: 18px;
             }
        }
    }
    .pop{
        height: 50%;
        .title{
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
            font-weight:500;
        }
        .tip{
            padding-left: 15px;
            font-size: 12px;
            color: #333;
        }
        .txt{
            font-size:15px;
            float: right;
            margin-right: 15px;
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>