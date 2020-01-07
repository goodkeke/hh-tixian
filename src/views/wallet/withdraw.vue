<template>
    <div class="container">
        <van-cell-group>
            <van-field
              v-model="cardNum"
			  readonly
              label="银行卡号"
              placeholder="请输入用户名"
            />
				
            <van-field
              v-model="existMoney"
              label="可提现金额"
              placeholder="0.00"
			  input-align="right"
            >
				<span class="unit" slot="button">元</span>
			</van-field>
            <van-field
              v-model="withdrawMoney"
              label="提现金额"
              placeholder="请输入100或100的倍数金额"
			  input-align="right"
            >
				<span class="unit" slot="button">元</span>
			</van-field>
            <van-field
              v-model="serveMoney"
              label="提现服务费"
              placeholder="0.00"
			  input-align="right"
            >
				<span class="unit" slot="button">元</span>
			</van-field>
          </van-cell-group>
		  <div class="tips">
            提现说明 <br/>1、最低提现金额为100元，且提现金额需是100的倍数。<br/> 2、提现将收取1%的服务费。
		  </div>
    </div>
</template>

<script>
    export default {
        name: 'withdraw',
        data () {
            return {
				cardNum: '',
				existMoney: '',
				withdrawMoney: '',
				serveMoney: ''
            }
		},
		mounted () {
			this.toast('轻提示')
		}
		
    }
</script>

<style scoped lang="scss">
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
    }
</style>