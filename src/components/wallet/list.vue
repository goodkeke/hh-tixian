<template>
    <div class="container">
        <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onload"
        :offset="10"
        >
            <div class="empty" v-if="!list[0]">
                <img src="~@/assets/images/wallet/none.png" alt="">
                <p>暂无收益信息</p>
            </div>
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <div class="item">
                        <p>{{item.sourceTitle}}</p>
                        <p>{{item.bussDate}}</p>
                    </div>
                    <div class="item">
                        <span> <img src="~@/assets/images/wallet/icon-coin.png"/> {{item.amt}}</span>
                    </div>
                </li>
            </ul>
        </van-list>
    </div>
</template>
<script>
    import { commonApi } from "../../api";
    export default {
        name:'common-list',
        props: {
          request: {
              type: Object,
              default: function(){
                  return {};
              }
          }
        },
      data(){
          return{
              loading: false,
              finished: false,
              list: []
          }
      },
        mounted() {
            this.query();
        },
        methods: {
            onload(){
                this.request.query.pageNum ++;
                this.query();
            },
           async query(type){
                const { query, method } = this.request;
                query.type = type || 'all';
                const res = await commonApi(query, method);
                if(res.data.length === 0 || !res.data){
                    this.finished = true;
                    return;
                }
                this.list = this.list.concat(res.data || []);
            },
        }
    }
</script>
<style scoped lang="scss">
    @import "~@/style/_mixin";
    //过度效果
.container{
    .empty{
        padding-top: 20px;
        text-align: center;
        img{
            width: 115px;
            margin-left: -15px;
        }
        p{
            font-size: 12px;
            color: #333333;
        }
    }
    padding: 0 10px;
    background-color: white !important;
    li{
       @include flex-center(row,flex-start,center);
        border-bottom: 1px solid #eeeeee;
        padding: 5px 0 10px 0;
        background-color: white;
        transition: background-color .5s ease-in-out;
        .item{
            flex: auto;
            &:first-child{
                p{
                    margin: 3px 0;
                    color: #333333;
                    &:first-child{
                        font-size: 14px;
                        font-weight: 500;
                    }
                    &:last-child{
                        font-size: 12px;
                        color: #666666;
                    }
                }
            }
            &:last-child{
                text-align: right;
                font-size: 18px;
                color: #E4061B;
                img{
                    display: inline;
                    width: 10px;
                }
            }
        }
    }
}
</style>