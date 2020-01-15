<template>
    <div class="container">
<!--        <van-nav-bar title="呼哈钱包"></van-nav-bar>-->
        <div class="main" v-if="indexData">
        <div class="wallet-card">
            <div class="card-item">
                <p>现金余额(元)</p>
                <div class="price">
                    <div class="item">
                        <span>￥<i>{{indexData.wallet}}</i> </span>
                    </div>
                    <div class="item">
                        <button class="btn-cashing" @click="withdraw">提现</button>
                    </div>
                </div>
            </div>
            <div class="split"></div>
            <div class="card-item">
                <p>呼哈币余额(元)</p>
                <div class="price">
                    <div class="item">
                        <span class="tag">支付抵用·100币=1元</span>
                        <span><img src="~@/assets/images/wallet/icon-coin.png" alt=""><i>{{indexData.coin}}</i> </span>
                    </div>
                    <div class="item">
                        <button class="btn-cashing last-btn" @click="$router.push('/exchange')">兑换</button>
                        <span class="des">支付现金：10000币=95元</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner">
            <img :src="indexData.ad || require('@/assets/images/wallet/banner.png')"/>
        </div>
        <div class="benefits">
            <div class="head">
                <div class="item">
                    <span>实时收益</span>
                </div>
               <div class="item" @click="$router.push('/billsDetail')">
                   <span>账单明细</span> <img src="../../assets/images/wallet/icon-arrow.png" alt="">
               </div>
            </div>
            <common-list :request="childRequest" />
        </div>
        </div>
    </div>
</template>
<script>
    import commonList from '../../components/wallet/list.vue'
    import { commonApi } from '../../api/index'
    export default {
        components:{
            commonList,
        },
        name: "wallet",
        data(){
            return{
                indexData: [],
                childRequest: {
                    method: 'walletList',
                    query: {
                        type: 'income',
                        pageSize: 10,
                        pageNum: 1
                    }
                }
            }
        },
        created() {
            this.getData();
        },
        methods:{
            async getData(){
                const res = await commonApi({}, 'walletIndex');
                this.indexData = res.data || [];
            },
            withdraw(){
                let path = this.indexData.attestation ? 'withdraw' : 'applyInfo';
                this.$router.push(path);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "~@/style/_mixin";
    .btn-cashing{
        width: 60px;
        height: 26px;
        line-height: 24px;
        background: white;
        border-radius: 13px;
        color: #E4061B;
        font-size: 12px;
        border: 0;
    }
    .container{
        .banner{
            margin-top: 22px;
            img{
                width: 100%;
            }
        }
        .main{
            padding: 10px;
        }
        background:rgba(243,243,243,1);
        .benefits{
            border-radius: 10px;
            background-color: white;
            padding: 10px 0;
            margin-top: 10px;
            .head{
                padding: 10px;
                @include flex-center(row,flex-start,center);
                border-bottom: 1px solid #eeeeee;
                .item{
                    flex: 1;
                    &:first-child{
                        font-size: 17px;
                        color: #333333;
                    }
                    &:last-child{
                        text-align: right;
                        font-size: 12px;
                        color: #E4061B;
                        img{
                            display: inline;
                            width: 6px;

                        }
                    }
                }
            }
        }
        .split{
            margin: 20px 0;
            display: block;
            height: 1px;
            width: 100%;
            background: white;
        }
        .wallet-card{
            padding: 10px 10px 1px 10px;
            border-radius: 10px;
            color: white;
            background-image: linear-gradient(to right, #F82744, #FE8E64);
            .card-item{
            p{
                font-size: 14px;
                margin: 0;
            }
            .price{
                margin: 10px 0;
                @include flex-center(row,flex-start,center);
                .tag{
                    padding: 0 3px;
                    font-size: 12px;
                    color: #F82744;
                    position: absolute;
                    top: -36px;
                    right: -50px;
                    background-color: white;
                    border-radius:  10px 10px 10px 0;
                }
                .item{
                    position: relative;
                    vertical-align: middle;
                    flex: 1;
                    &:last-child{
                        text-align: right;
                    }
                    img{
                        margin-right: 8px;
                        width: 10px;
                        height: 10px;
                    }
                    .des{
                        font-size: 12px;
                    }
                    .last-btn{
                        position: absolute;
                        top: -25px;
                        right: 0;
                    }
                }
                span{
                    i{
                        font-size: 20px;
                        font-style: normal;
                        font-weight: bold;
                    }
                }
            }
           }
        }
    }
</style>