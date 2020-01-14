import request from '../utils/request'
import api from './config'

export function commonApi(data, method, requestType = 'post') {
    let link = api.prefix + api[method] + api.version;
    let config = {
        url: link,
        method: requestType,
    };
    if (requestType === 'post') {
        config.data = data;
    } else {
        config.params = data;
    }
    return request(config)
}