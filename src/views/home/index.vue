<template>
    <div class="container">
        <menu-bar></menu-bar>
        <div class="side-bar" v-show="potinIndex !== 10">
            <ul>
                <li v-for="(item, index) in tabs" :key="index" :class="{'tab-active' : tab === item.id}" @click="setPageTitle(item.id)">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <swiper :options="swiperOption" class="swiper-box" v-show="potinIndex !== 10">
                <swiper-slide  style="height: 100%;background-color: red" class="swiper-item tab-1-1">
                    <div class="red-head">
                            <img src="~@/assets/images/head-red.png" alt="">
                    </div>
                    <div class="red-middle-1">
                        <img src="~@/assets/images/page-1/1-2.png" alt="">
                    </div>
                    <div class="red-foot-1">
                        <img src="~@/assets/images/page-1/1-3.png" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide  style="height: 100%;background-color: green" class="swiper-item tab-1-2 page-2">
                    <div class="red-head">
                            <img src="~@/assets/images/head-red.png" alt="">
                    </div>
                    <div class="red-page-middle-2">
                       <img src="~@/assets/images/page-1/2/2-2.png" alt="">
                    </div>
                    <div class="red-page-foot-2">
                        <img src="~@/assets/images/page-1/2/2-3.png" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide   style="height: 100%;background-color: antiquewhite" class="swiper-item tab-1-3">
                    <div class="red-head">
                       <img src="~@/assets/images/head-red.png" alt="">
                    </div>
                    <div class="red-page-foot-3">
                        <img src="~@/assets/images/page-1/3/3-2.png" alt="">
                        <img src="~@/assets/images/page-1/3/3-3.png" alt="">
                    </div>
                </swiper-slide>
            <swiper-slide style="height: 100%;background-color: red" class="swiper-item tab-2-1">
                <div class="blue-head new-title">
                    <img src="~@/assets/images/page-2/1/head.png" alt="">
                </div>
                <div class="blue-page-middle-1">
                     <img src="~@/assets/images/page-2/1/2-1.png" alt="">
                </div>
                <div class="text">
                    <p>商品、优惠、活动、各种对外信息</p>
                    <p>一个全社区的“朋友圈”</p>
                    <p>文字 + 九宫格，客户随时 <b>看</b> ！</p>
                </div>
                <div class="red-page-foot-1" style="margin-left: 0">
                    <div class="">
                       <img src="~@/assets/images/page-2/1/2-2.png" alt="">
                    </div>
                    <!-- <p class="last-title">无需商品线上售卖，可单选微社区 有商品售卖需求，大可双管齐下</p> -->
                </div>
            </swiper-slide>
            <swiper-slide style="height: 100%;background-color: antiquewhite" class="swiper-item tab-2-3">
                <!-- <div class="blue-head">
                      <img src="~@/assets/images/page-2/head-2.png" alt="">
                  </div> -->
                <div class="blue-page-middle-3">
                    <img src="~@/assets/images/page-2/3/2-2-1.png" alt="">
<!--                    <img src="~@/assets/images/page-2/3/2-2-0.png" alt="">-->
                    <img src="~@/assets/images/page-2/3/2-2-2.png" alt="">
                </div>
                <div class="blue-page-3-text">
                    <p>附近的人在家里、在公司、在商场喝咖啡
                        拿起手机就能看到你的信息！
                    <br/>（不用走到店门口看海报）</p>
                    <h2>用户知晓身边动态，<br/>
                        出门前就锁定你！</h2>
                </div>
            </swiper-slide>
            <swiper-slide style="height: 100%;background-color: green" class="swiper-item tab-2-2">
                <!-- <div class="blue-head">
                    <img src="~@/assets/images/page-2/head-2.png" alt="">
                </div>
               -->
                <div class="blue-page-middle-2">
                    <img src="~@/assets/images/page-2/2/2-1.png" alt="">
                </div>
                <div class="red-page-foot-3">
                  <img src="~@/assets/images/page-2/2/2-2.png" alt="">
                  <img src="~@/assets/images/page-2/2/2-3.png" alt="">
<!--                    <div class="page-2-2-foot">-->
<!--                        <img src="~@/assets/images/page-2/2/2-2-4.png" alt="">-->
<!--                        <div class="foot">-->
<!--                            <p>有了小号和红卡，锁定老客户！即使平台上只有一个商家，也能盘活生意，带动生意</p>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <span class="guider">马上入驻</span>
            </swiper-slide>
            <swiper-slide style="height: 100%;" class="swiper-item tab-3-1 tab-3">
                <div class="head">
                    <img src="~@/assets/images/page-3/1/head.png" alt="">
                </div>
                <div class="sub-title">
                   
                    <img src="~@/assets/images/page-3/1/3-1-1.png" alt="">
                </div>
                <div class="middle">
                    <img src="~@/assets/images/page-3/1/middle.png" alt="">
                </div>
                <div class="foot">
                    <p>呼哈让每一个人从人脉关联中获取福利， 从启动阶段的现金奖励到永久的呼哈币奖励，真正提供源源不断的终身福利。</p>
                </div>
            </swiper-slide>
            <swiper-slide style="height: 100%;background-color: green" class="swiper-item tab-3-2 tab-3-1 tab-3">
                <div class="head">
                    <img src="~@/assets/images/page-3/1/head.png" alt="">
                </div>
                <div class="sub-title">
                    <h2 id="title-3-3" style="">善用人脉·逛逛街</h2>
                    <img src="~@/assets/images/page-3/3/title-x.png" alt="">
                </div>
                <div class="middle">
                    <img src="~@/assets/images/page-3/2/middle.png" alt="">
                </div>
                <div class="foot">
                    <h3>你分享的每个人可能是用户也可能是商家</h3>
                    <p>在登录状态下，你在呼哈平台各端分享出去的每一条链接都附带你的个人邀请码，通过你分享的页面注册的用户都在你的关联关系中。用你的专属二维码让朋友（商家）扫描注册，亦可进行关系绑定。</p>
                </div>
            </swiper-slide>
            <swiper-slide style="height: 100%;background-color: antiquewhite" class="swiper-item tab-3-3 tab-3-1 tab-3">
                <div class="head">
                    <img src="~@/assets/images/page-3/1/head.png" alt="">
                </div>
                <div class="sub-title">
                    <img  src="~@/assets/images/page-3/3/3-3-1.png" alt="">
                </div>
                <div class="middle-text">
                    <p>邀请好友注册呼哈，即可获得终身关联奖励： 关联金额每满 <i>100元</i>获得一次呼哈币奖励。 </p>
                    <h3>呼哈币可在购物时抵扣使用·10币=1元</h3>
                </div>
                <div class="middle">
                    <img  src="~@/assets/images/page-3/3/middle.png" alt="">
                </div>
                <div class="foot">
                    <p>满百返币值根据会员等级获取。 激活联盟号，立享V5等级，满百返5币。</p>
                    <h3>请登录呼哈城市APP查看及使用呼哈币</h3>
                </div>
            </swiper-slide>
            <swiper-slide style="height: 100%;background-color: antiquewhite" class="swiper-item tab-3-4">
                <div class="head">
                    <img src="~@/assets/images/page-3/1/head.png" alt="">
                </div>
                <div class="sub-title" style="margin-bottom: 0px;margin-top: 5vw">
                    <img  src="~@/assets/images/page-3/4/title-x.png" alt="">
                </div>
                <div class="middle" style="width: 76%">
                    <img src="~@/assets/images/page-3/4/middle.png" alt="">
                </div>
                <div class="foot">
                    <h3>请登录呼哈联盟查看各级佣金比例</h3>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <cooper-ration @func="setPageTitle" v-show="potinIndex === 10"></cooper-ration>
    </div>
</template>
<script>
    import menuBar from '@/components/menuBar/index.vue';
    import {getQueryStringV} from "@/plugins/extension";
    import cooperRation from '_v/cooperation/index';
    export default {
        name: "home",
        props: {
            id: {
                default: 1
            }
        },
        components: {
            menuBar,
            cooperRation
        },
        data (){
            return{
                tab:1,
                currentIndex:0,
                potinIndex:0,
                 tabs: [
                     {id: 1, name: '呼哈城市'},
                     {id: 2, name: '商家招募'},
                     {id: 3, name: '赚钱联盟'},
                     {id: 4, name: '城市代理'}
                ],
                swiperOption: {
                    direction: 'vertical',
                    on:{
                        slideToIndex:function(){
                          this.slideTo(4,1000,false);
                        },
                        myAction: function(n=0){
                            this.realIndex = n;
                        },
                        touchStart: function() {
                            window.startNum = this.realIndex;
                            //这里设置最后一张图滑动后跳转到代理城市 9 代表所有图片的长度
                            if(this.realIndex === 9 && window.endNum == window.startNum){
                                window.slideDown = true;
                                //切换tab到城市代理
                                window.myAction(4);
                            }
                        },
						touchEnd:function(){
							(this.realIndex === window.startNum && window.startNum === 9) && window.myAction(4);
						},
                        slideChange: function(){
                            window.endNum = this.realIndex;
                            let potinIndex;
                            if(this.realIndex <= 2){
                                potinIndex = 1;
                            }else if(this.realIndex <= 5){
                                potinIndex = 2;
                            }else if(this.realIndex <= 9){
                                potinIndex = 3;
                            }
                            window.myAction(potinIndex);
                        },
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        },
        created(){
            let _this = this;
            window.startNum = null;
            window.endNum = null;
            this.swiperOption.on.myAction();
            window.myAction = function(index){
                _this.tab = index;
                if(index === 4){
                    // _this.$router.push({name:'cooperation'})
					_this.setPageTitle(4);
                    window.startNum = null;
                    window.endNum = null;
                }
            }
        },
       async mounted() {
            this.tab = this.$route.params.id ? parseInt(this.$route.params.id) : 1;
            let _type = getQueryStringV(location.href,'type');
            this.setPageTitle(_type||this.tab);
            this.getInviteCode();
        },
        methods:{
            getInviteCode(){
                localStorage.setItem('inviteCode',getQueryStringV(location.href,'inviteCode'));
            },
            setPageTitle(n){
                this.tab = n;
                //tab下图片索引数组
                let points = [0, 3, 6, 10];
                let point = document.getElementsByClassName('swiper-pagination-bullet');
                this.potinIndex = points[n-1];
                n !== 4 && point[this.potinIndex].click();
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "~@/style/mixin";
    .tab-3 {
      .head{
        img{
          width: 221px;
          margin-left: 0 !important;
        }
        margin-top: 20px !important;
        margin-left: 20px;
       }
        .middle-text {
            padding-left: 30px;
            p {
                @include commonFont(12px, white);
                width: 241px;
            }
            h3 {
                @include commonFont(14px, white);
            }
        }
        .sub-title {
            margin-left: 10px;
            margin-bottom: 4vw;
            display: block;
            p {
                @include commonFont(18px, white);
                margin: 20px 0 5px 20px;
            }
            img {
                width: 66vw;
                margin-left: 20px;
            }
        }
        .middle {
            background-color: white;
            border-radius: 6px;
            width: 290px;
            margin-left: 30px;
            img {
                width: 296px;
                display: block;
                margin: auto;
            }
        }
        .foot {
            margin-top: 10px;
            h3 {
                @include commonFont(16px, white);
                margin-left: 30px;
                width: 76vw;
                margin-bottom: 0;
            }
            p {
                @include commonFont(14px, white);
                line-height: 24px;
                margin-left: 30px;
                width: 75vw;
                margin-top: 0;
            }
        }
    }
</style>