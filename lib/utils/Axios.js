'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.axios = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Progress = require('../Progress/Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 设置超时时间
_axios2.default.defaults.timeout = 10000;

//请求前
_axios2.default.interceptors.request.use(function (config) {
    // 请求之前加loading
    _Progress2.default.start();
    return config;
}, function (error) {
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        (0, _.Message)(_react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                null,
                'Error: ',
                error.response.status
            ),
            _react2.default.createElement(
                'div',
                null,
                'Url: ',
                error.response.config.url
            )
        ));
    } else {
        // Something happened in setting up the request that triggered an Error
        (0, _.Message)(error.message, false, true);
    }
    return Promise.reject(error);
});

//请求后
_axios2.default.interceptors.response.use(function (config) {
    // 响应成功关闭loading
    _Progress2.default.done();
    return config;
}, function (error) {

    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        (0, _.Message)(_react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                null,
                'Error: ',
                error.response.status
            ),
            _react2.default.createElement(
                'div',
                null,
                'Url: ',
                error.response.config.url
            )
        ));
    } else {
        // Something happened in setting up the request that triggered an Error
        (0, _.Message)(error.message, false, true);
    }
    return Promise.reject(error);
});
exports.axios = _axios2.default;
//# sourceMappingURL=Axios.js.map