/**
 * @api配置
 * */

const apiList = {
    prefix: 'me.huha.platform.',
    version: '/v1.0.0',
    getCode: 'message.service.SmsCodeService.send',  //获取验证码
    register:'api.service.UserInfoService.registered', //注册
    cooperation: 'operation.service.BusinessPartnerService.insertBusinessPartner', //联盟合作
    sendInvite: 'api.service.ShareService.sendInvite', //邀请码
	checkPhone: 'usercenter.service.UserInfoService.checkPhone', //检查手机号码是否注册过
    walletIndex: 'finance.service.ScheduleInterestService.walletIndex', //钱包首页
    walletList: 'finance.service.ScheduleInterestService.getUserScheduleInterest', //钱包列表
    ossToken: 'message.service.ALiYunOssService.getOssSTSToken' //获取OSS上传token
};

export default  apiList