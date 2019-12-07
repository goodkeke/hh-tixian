/**
 * @HomePageList 为请求地址前缀 例如 www.baidu.com/api/lgon 则前缀为 api/
 * */

const apiList = {
    getCode: 'me.huha.platform.message.service.SmsCodeService.send/v1.0.0',  //获取验证码
    register:'me.huha.platform.api.service.UserInfoService.registered/v1.0.0', //注册
    cooperation: 'me.huha.platform.operation.service.BusinessPartnerService.insertBusinessPartner/v1.0.0', //联盟合作
    sendInvite: 'me.huha.platform.api.service.ShareService.sendInvite/v1.0.0', //邀请码
	checkPhone: 'me.huha.platform.usercenter.service.UserInfoService.checkPhone/v1.0.0', //检查手机号码是否注册过
	
}

export default  apiList