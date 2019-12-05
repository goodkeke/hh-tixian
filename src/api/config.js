/**
 * @HomePageList 为请求地址前缀 例如 www.baidu.com/api/lgon 则前缀为 api/
 * */

const apiList = {
    getCode:`me.huha.platform.message.service.SmsCodeService.send/v1.0.0`,
    register:`me.huha.platform.api.service.UserInfoService.registered/v1.0.0`,
    cooperation: `me.huha.platform.operation.service.BusinessPartnerService.insertBusinessPartner/v1.0.0`
}

export default  apiList