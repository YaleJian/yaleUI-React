import axios from 'axios'
import Progress from '../Progress/Progress'
// 设置超时时间
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
    // 请求之前加loading
    Progress.start();
    return config
}, error => {
    alert(error);
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error)
});
axios.interceptors.response.use(config => {
    // 响应成功关闭loading
    Progress.done();
    return config
}, error => {
    alert(error);
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error)
});
export default axios;