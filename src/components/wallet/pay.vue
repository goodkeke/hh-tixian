<template>
    <div class="pay-panel">
		<van-popup 
		  v-model="isShow"
		  round
		  @click-overlay="close"
		>
			<div class="pay-box">
				<div class="pay-title">
					输入密码<img class="close" src="~@/assets/images/wallet/icon-close.png" alt="" @click="close">
				</div>
				<div class="pay-sub">请输入密码，确保交易安全</div>
				<input class="pay-input" type="tel" v-model="payPassword" @keyup="touchFunc">
				<ul>
					<li><span v-show="payPassword[0]"></span></li>
					<li><span v-show="payPassword[1]"></span></li>
					<li><span v-show="payPassword[2]"></span></li>
					<li><span v-show="payPassword[3]"></span></li>
					<li><span v-show="payPassword[4]"></span></li>
					<li><span v-show="payPassword[5]"></span></li>
				</ul>
				<div class="toNext"><span>忘记密码？</span></div>
			</div>
		</van-popup>
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
				payPassword: ''
            }
		},
		methods: {
			touchFunc () {
				if (this.payPassword.length === 6) {
					this.isShow = false
					this.payPassword = ''
					this.$emit('pay-success', this.payPassword)
				}
			},
			close () {
				this.isShow = false
				this.payPassword = ''
				this.$emit('pay-fail', false)
			}
		},
		watch: {
			show (val) {
				this.isShow = val
			}
		}
    }
</script>

<style scoped lang="scss">
    @import "~@/style/_mixin";
    .pay-panel{
		.pay-box {
			width: 95vw;
			border-radius: 20px;
			padding: 15px;
			box-sizing: border-box;
			position: relative;
			line-height: 1.2;
			overflow: hidden;
			.pay-title {
				text-align: center;
				font-size: 15px;
				position: relative;
				.close {
					width: 18px;
					height: 18px;
					display: inline-block;
					position: absolute;
					right: 0;
				}
			}
			.pay-sub {
				font-size: 12px;
				color: #333;
				margin-top: 30px;
				margin-bottom: 15px;
			}
			.pay-input {
				opacity: 0;
				width: 500px;
				height: 50px;
				position: absolute;
				color: transparent;
				margin-left: -50%;// 隐藏input光标
			}
			ul {
				@include flex-center(row,center,center);
				li:first-child {
					border-left: 1px solid #96969B;
				}
				li {
					width: 50px;
					height: 50px;
					border: 1px solid #96969B;
					border-left: 0;
					@include flex-center(row,center,center);
					span {
						display: inline-block;
						width: 10px;
						height: 10px;
						background: #333;
						border-radius: 50%;
					}
				}
			}
			.toNext {
				font-size: 12px;
				color: #DD021B;
				text-align: right;
				margin-top: 15px;
			}
		}
    }
</style>