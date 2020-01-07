<template>
    <div class="container">
        <van-nav-bar
        title="账单详情"
        left-arrow
        @click-left="returnPreview"
        >
        </van-nav-bar>
        <div class="main">
            <van-tabs v-model="active" @click="tabOnClick">
                <van-tab title="全部"></van-tab>
                <van-tab title="收入"></van-tab>
                <van-tab title="支出"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "billsDetail",
        data(){
            return{
                active: 0
            }
        },
        mounted() {

        },
        methods:{
            returnPreview (){

            },
            tabOnClick(i,t){
               
            }
        }
    }
</script>

<style scoped>
    .container{
        background:rgba(243,243,243,1);
    }
</style>