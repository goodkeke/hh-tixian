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
                <li>呼哈币兑换现金：10000币=95元（100币＜1元），10000币起兑，每次兑换须为10000币的倍数。兑换成现金余额后，依照现金使用规则进行提现。</li>
                <li>呼哈币支付抵用：作为用户在呼哈上消费时（向商家付款）抵扣使用，100币=1元，100币起抵，每次抵用须为100币的倍数。</li>
            </ul>
        </div>
        <van-popup v-model="isShowPop" position="bottom" class="pop" round closeable >
            <p class="title">输入密码</p>
            <p class="tip">请输入登录密码，确保交易安全</p>
            <!-- 密码输入框 -->
            <van-password-input :value="pwd" :focused="showKeyboard" type="tel" @focus="showKeyboard = true" />
            <!-- 数字键盘 -->
            <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false"/>
            <div class="txt hh-red" @click="this.$route.push('/')">忘记密码?</div>
        </van-popup>
    </div>
</template>

<script>
    import {Dialog,Toast} from 'vant'
    import {commonApi} from "@/api";
    export default {
        name: "exchange",
        data(){
            return{
                money:'',
                amount:'',
                tip:'最低兑换数量10000个，请输入10000或10000的倍数',
                err:true,
                disabled:true,
                isShowPop:false,
                pwd:'',
                showKeyboard: true
            }
        },
        mounted(){
            this.money = this.$route.params.coin || 0;
            console.log(this.money)
        },
        watch:{
            amount:{
                handler(val){
                    if(val){
                        if(val>=10000 && val%10000 == 0 && Number(val) <= Number(this.money)){
                            this.err = false;
                            this.disabled = false;
                            this.tip = '可兑换'+parseInt(val/10000)*95+'元';
                        }else {
                            if(Number(val) > Number(this.money)){
                                this.err = true;
                                this.disabled = true;
                                this.tip='您输入的兑换数值大于余额数值'
                            }else {
                                this.err = false;
                                this.disabled = true;
                                this.tip='请输入10000或10000的倍数'
                            }
                        }
                    }else {
                        this.err = true;
                        this.tip = '最低兑换数量10000个，请输入10000或10000的倍数';
                    }
                },
                deep:true
            },
            pwd:{
               async handler(val){
                    if(val.length == 6){
                        const res = await commonApi({passWord:val,coin:this.amount},'exchange','post');
                        console.log('2222222222',res)
                        if(res.data == true){
                            this.pwd = '';
                            this.money -= this.amount;
                            this.disabled = true;
                            this.amount = '';
                            this.isShowPop = !this.isShowPop;
                            Toast('兑换成功');
                            await this.$router.push('/wallet')
                        }
                    }
                },
                deep:true
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
                    Toast('兑换失败');
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
        height: 60%;
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
            font-size:14px;
            float: right;
            margin-right: 15px;
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>