<template>
    <div class="container">
		<van-popup v-model="isShow">
			<div class="pay-box">
			<ul>
				<li>{{payPassword[0]}}</li>
				<li>{{payPassword[1]}}</li>
				<li>{{payPassword[2]}}</li>
				<li>{{payPassword[3]}}</li>
				<li>{{payPassword[4]}}</li>
				<li>{{payPassword[5]}}</li>
			</ul>
		</div>
		</van-popup>
		<div @click="close">关闭</div>
    </div>
</template>
<script>
    export default {
		name:'pay',
		props:{
			show:{
				type: Boolean,
				default: function(){
					return false
				},
			}
		},
        data(){
            return{
				isShow: this.show,
				payPassword: [1,2,3,4,5,6]
            }
		},
		methods: {
			// 关闭
			close () {
			  	this.isShow = false
			  	this.$emit('paySuccess', this.payPassword)
			}
		}
		
    }
</script>

<style scoped lang="scss">
    @import "~@/style/_mixin";
    .container{
      
    }
</style>