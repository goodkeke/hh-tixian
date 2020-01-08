<template>
    <div class="container">
     <ul>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
         <li>
             <div class="item">
                 <p>到店付收款-订单号：1235234</p>
                 <p>2019-01-09 21:11:11</p>
             </div>
             <div class="item">
                 <span> + <img src="~@/assets/images/wallet/icon-coin.png"/> 50</span>
             </div>
         </li>
     </ul>
    </div>
</template>
<script>
    export default {
        name:'common-list',
      data(){
          return{

          }
      }
    }
</script>
<style scoped lang="scss">
    @import "~@/style/_mixin";
.container{
    padding: 0 10px;
    background-color: white !important;
    li{
       @include flex-center(row,flex-start,center);
        border-bottom: 1px solid #eeeeee;
        padding: 5px 0 10px 0;
        .item{
            flex: 1;
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