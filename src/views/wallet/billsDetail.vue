<template>
    <div class="container">
        <div class="main">
            <van-tabs v-model="active" @click="tabOnClick">
                <van-tab title="全部"></van-tab>
                <van-tab title="收入"></van-tab>
                <van-tab title="支出"></van-tab>
            </van-tabs>
            <common-list ref="mychild" :request="childRequest"/>
        </div>
    </div>
</template>
<script>
    import commonList from '../../components/wallet/list.vue'
    export default {
        components:{
            commonList
        },
        name: "billsDetail",
        data(){
            return{
                active: 0,
                childRequest: {
                    method: 'walletList',
                    query: {
                        type: 'all',
                        pageSize: 10,
                        pageNum: 1
                    }
                },
                actions: [
                    { type: 'all' },
                    { type: 'income' },
                    { type: 'disbursement' }
                ]
            }
        },
        methods:{
            returnPreview (){
                this.$router.go(-1);
            },
            tabOnClick(i,t){
                this.$refs.mychild.query(this.actions[i].type);
            }
        }
    }
</script>

<style scoped>
    .container{
        background:rgba(243,243,243,1);
    }
</style>