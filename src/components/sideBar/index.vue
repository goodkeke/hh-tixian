<template>
        <div class="side-bar">
            <ul>
                <li :class="{'tab-active' : tab === 'home'}" @click="tab = 1,setPageTitle(1)">
                    呼哈城市
                </li>
                <li :class="{'tab-active' : tab === 'bluePage'}" @click="tab = 2,setPageTitle(2)">
                    商家招募
                </li>
                <li :class="{'tab-active' : tab === 'orangePage'}" @click="tab = 3,setPageTitle(3)">
                    赚钱联盟
                </li>
                <li :class="{'tab-active' : tab === 'cooperation'}" @click="tab = 4,setPageTitle(4)">
                    城市代理
                </li>
            </ul>
        </div>
</template>
<script>
    export default {
        name: "sidBar",
        props:{
            tab:{
                type: String,
                default: function(){
                    return 'home'
                },
            }
        },
        data(){
            return {
                names: [
                    'home',
                    'bluePage',
                    'orangePage',
                    'cooperation'
                ]
            }
        },
        methods:{
            setPageTitle(n){
                this.$router.push({name: 'home',params:{id:n}})
            }
        },
        mounted(){
           this.tab = this.$route.name;
        }
    }
</script>

<style scoped>

</style>