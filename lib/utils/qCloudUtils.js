'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cosDelete = exports.cosDownload = exports.hfCosList = exports.cosList = exports.cosUpload = undefined;

var _cosJsSdkV = require('cos-js-sdk-v5');

var _cosJsSdkV2 = _interopRequireDefault(_cosJsSdkV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultBucket = 'yalejian-1252187891';
var HftBucket = 'hfmedia-1301416202';
var Region = 'ap-beijing';
var HfRegion = 'ap-guangzhou';

var _getAuthorization = function _getAuthorization(options, callback, bucket, server) {
    // 异步获取临时密钥
    var url = 'https://yalejian.com/service/qCloud/getSts?bucket=' + bucket + "&server=" + server;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
        var credentials = void 0;
        var data = {};
        try {
            data = JSON.parse(e.target.responseText);
            credentials = data.credentials;
        } catch (e) {}
        callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            XCosSecurityToken: credentials.sessionToken,
            ExpiredTime: data.expiredTime // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
        });
    };
    xhr.send();
};

// 初始化默认COS实例
var cos = new _cosJsSdkV2.default({
    getAuthorization: function getAuthorization(options, callback) {
        _getAuthorization(options, callback, DefaultBucket);
    }
});

//初始化华富默认COS实例
var hfCos = new _cosJsSdkV2.default({
    getAuthorization: function getAuthorization(options, callback, server) {
        _getAuthorization(options, callback, HftBucket, "hf");
    }
});

var cosUpload = exports.cosUpload = function cosUpload(e, folderName, bucket) {
    var file = undefined.files[0];
    if (!file) return;
    cos.putObject({
        Bucket: bucket || DefaultBucket,
        Region: Region,
        Key: folderName + "/" + file.name,
        Body: file
    }, function (err, data) {
        console.log(err || data);
    });
};
//获取文件列表
var cosList = exports.cosList = function cosList(folderName, func, delimiter, nextMarker, size) {
    getFileList(folderName, func, delimiter, nextMarker, size, DefaultBucket, cos, Region);
};

//华富-获取文件列表
var hfCosList = exports.hfCosList = function hfCosList(folderName, func, delimiter, nextMarker, size) {
    getFileList(folderName, func, delimiter, nextMarker, size, HftBucket, hfCos, HfRegion);
};

//获取文件列表方法
var getFileList = function getFileList(folderName, func, delimiter, nextMarker, size, bucket, cosObj, region) {
    var param = {
        Bucket: bucket,
        Region: region,
        Prefix: folderName
    };
    if (delimiter) param.Delimiter = delimiter;
    if (nextMarker) param.Marker = nextMarker;
    if (size) param.MaxKeys = size;

    cosObj.getBucket(param, function (err, data) {
        if (data) {
            func(data.Contents);
        } else {
            func(false, err);
        }
    });
};
var cosDownload = exports.cosDownload = function cosDownload(url) {
    cos.getObject({
        Bucket: DefaultBucket,
        Region: Region,
        Key: url
    }, function (err, data) {
        console.log(err || data.Body);
    });
};
var cosDelete = exports.cosDelete = function cosDelete(url) {
    cos.deleteObject({
        Bucket: DefaultBucket,
        Region: Region,
        Key: url
    }, function (err, data) {
        console.log(err || data);
    });
};
//# sourceMappingURL=qCloudUtils.js.map