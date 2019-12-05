import request from '../utils/request'
import api from './config'
export function commonApi(data, method, requestType = 'get') {
    let link = api[method];
    let config = {
        url: link,
        method: requestType,
    }
    if (requestType === 'post') {
        config.data = data;
    } else {
        config.params = data;
    }
    return request(config)
}