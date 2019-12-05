import Cookie from 'js-cookie'

const TokenKey = 'token';
const AccountKey = 'userName';

/**
 * @name 获取token
 * @return {function}
 * **/
export function getToken (){
    return Cookie.get(TokenKey);
}
/**
 * @name 设置token
 * @param token {string}
 * @return {function}
 * **/
export function setToken (token){
    return Cookie.set(TokenKey, token);
}
/**
 * @name 移除token
 * @return {function}
 * **/
export function removeToken (){
    return Cookie.remove(TokenKey)
}
/**
 * @name 获取用户名
 * @return {JSON}
 * **/
export function getAccount () {
    return JSON.parse(Cookie.get(AccountKey) || '{}')
}
/**
 * @name 设置用户名
 * @param user {Object}
 * @return {function}
 * **/
export function setAccount (user){
    return Cookie.set(AccountKey, JSON.stringify(user))
}
/**
 * @name 移除用户名
 * @return {function}
 * **/
export function removeAccount () {
    return Cookie.remove(AccountKey)
}