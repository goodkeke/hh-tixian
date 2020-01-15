<template>
    <div class="container">
        <van-cell-group>
            <van-field
              v-model="bankNum"
              label="银行卡号"
              placeholder=""
			  readonly="readonly"/>
            <van-field
              v-model="existMoney"
              label="可提现金额"
			  readonly="readonly"
              placeholder="0.00"
			  input-align="right">
				<span class="unit" slot="button">元</span>
			</van-field>
            <van-field
              v-model="amount"
              label="提现金额"
              placeholder="请输入100或100的倍数金额"
			  input-align="right">
				<span class="unit" slot="button">元</span>
			</van-field>
            <van-field
              v-model="serveMoney"
              label="提现服务费"
			  readonly="readonly"
              placeholder="0.00"
			  input-align="right">
				<span class="unit" slot="button">元</span>
			</van-field>
          </van-cell-group>
		  <div class="tips">
            提现说明 <br/>1、最低提现金额为100元，且提现金额需是100的倍数。<br/> 2、提现将收取1%的服务费。
		  </div>
		  <pay :show="payShow" @pay-success="paySuccess" @pay-fail="payFail"></pay>
		  <div class="btn-submit" @click="submit">提交</div>
    </div>
</template>
<script>
	import pay from '../../components/wallet/pay.vue'
	import {commonApi} from "../../api";
    export default {
		name: 'withdraw',
		components: {
			pay
		},
        data () {
            return {
				bankNum: '',
				existMoney: '',
				amount: '',
				serveMoney: '',
				payShow: false
            }
		},
		created() {
			this.bankNum = this.$route.params.info.bankCard;
		},
		mounted () {
		},
		methods: {
			async paySuccess (password) {
				console.log(password)
				const res = await commonApi({amount: this.amount, passWord: password},'withdraw');
				console.log(res);
				this.payShow = false
			},
			payFail () {
				this.payShow = false
			},
			 submit () {
				this.payShow = true
			}
		}
    }
</script>
<style scoped lang="scss">
	@import "~@/style/_mixin";
    .container{
		background:rgba(243,243,243,1);
		.tips {
			padding: 15px;
			font-size: 12px;
			color:rgba(102,102,102,1);
			line-height: 18px;
		}
		.unit {
			color:rgba(228,6,27,1);
		}
		.btn-submit {
			@include btn-submit;
			left: 15px;
			text-align: center;
			bottom: 20px;
		}
    }
</style>