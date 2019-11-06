import COS from "cos-js-sdk-v5";

let Bucket = 'yalejian-1252187891';
let Region = 'ap-beijing';
// 初始化实例
let cos = new COS({
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        let url = 'https://yalejian.com/service/qCloud/getSts';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            let credentials;
            let data = {};
            try {
                data = JSON.parse(e.target.responseText);
                credentials = data.credentials;
            } catch (e) {
            }
            callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                XCosSecurityToken: credentials.sessionToken,
                ExpiredTime: data.expiredTime, // SDK 在 ExpiredTime 时间前，不会再次调用 getAuthorization
            });
        };
        xhr.send();
    }
});
export var cosUpload = (e, folderName) => {
    let file = this.files[0];
    if (!file) return;
    cos.putObject({
        Bucket: Bucket,
        Region: Bucket,
        Key: folderName + "/" + file.name,
        Body: file,
    }, function (err, data) {
        console.log(err || data);
    });
};
//获取文件列表
export var cosList = (folderName, func, delimiter, nextMarker, size) => {

    let param = {
        Bucket: Bucket,
        Region: Region,
        Prefix: folderName,
    };
    if (delimiter) param.Delimiter = delimiter;
    if (nextMarker) param.Marker = nextMarker;
    if (size) param.MaxKeys = size;

    cos.getBucket(param, function (err, data) {
        func(data.Contents);
    });
};
export var cosDownload = (url) => {
    cos.getObject({
        Bucket: Bucket,
        Region: Region,
        Key: url,
    }, function (err, data) {
        console.log(err || data.Body);
    });
};
export var cosDelete = (url) => {
    cos.deleteObject({
        Bucket: Bucket,
        Region: Region,
        Key: url,
    }, function (err, data) {
        console.log(err || data);
    });
};