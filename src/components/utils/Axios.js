import React from "react";
import axios from 'axios';
import {Progress} from '..';
import {Message} from "..";
// 设置超时时间
axios.defaults.timeout = 10000;

//请求前
axios.interceptors.request.use(config => {
    // 请求之前加loading
    Progress.start();
    return config
}, error => {
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        Message(<div>
            <div>Error: {error.response.status}</div>
            <div>Url: {error.response.config.url}</div>
        </div>);
    } else {
        // Something happened in setting up the request that triggered an Error
        Message(error.message, false, true);
    }
    return Promise.reject(error)
});

//请求后
axios.interceptors.response.use(config => {
    // 响应成功关闭loading
    Progress.done();
    return config
}, error => {

    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        Message(<div>
            <div>Error: {error.response.status}</div>
            <div>Url: {error.response.config.url}</div>
        </div>);
    } else {
        // Something happened in setting up the request that triggered an Error
        Message(error.message, false, true);
    }
    return Promise.reject(error)
});
export {axios};