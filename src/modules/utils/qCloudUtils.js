import COS from "cos-js-sdk-v5";

let DefaultBucket = 'yalejian-1252187891';
let HftBucket = 'hfmedia-1301416202';
let Region = 'ap-beijing';
let HfRegion = 'ap-guangzhou';

let getAuthorization = function (options, callback, bucket, server) {
    // 异步获取临时密钥
    let url = 'https://yalejian.com/service/qCloud/getSts?bucket=' + bucket + "&server=" + server;
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
};

// 初始化默认COS实例
let cos = new COS({
    getAuthorization: function (options, callback){
        getAuthorization(options, callback, DefaultBucket)
    }
});

//初始化华富默认COS实例
let hfCos = new COS({
    getAuthorization: function (options, callback, server){
        getAuthorization(options, callback, HftBucket, "hf")
    }
});

export var cosUpload = (e, folderName, bucket) => {
    let file = this.files[0];
    if (!file) return;
    cos.putObject({
        Bucket: bucket || DefaultBucket,
        Region: Region,
        Key: folderName + "/" + file.name,
        Body: file,
    }, function (err, data) {
        console.log(err || data);
    });
};
//获取文件列表
export var cosList = (folderName, func, delimiter, nextMarker, size) => {
    getFileList(folderName, func, delimiter, nextMarker, size, DefaultBucket, cos, Region);
};

//华富-获取文件列表
export var hfCosList = (folderName, func, delimiter, nextMarker, size) => {
    getFileList(folderName, func, delimiter, nextMarker, size, HftBucket, hfCos, HfRegion);
};

//获取文件列表方法
let getFileList = (folderName, func, delimiter, nextMarker, size, bucket, cosObj, region) => {
    let param = {
        Bucket: bucket,
        Region: region,
        Prefix: folderName,
    };
    if (delimiter) param.Delimiter = delimiter;
    if (nextMarker) param.Marker = nextMarker;
    if (size) param.MaxKeys = size;

    cosObj.getBucket(param, function (err, data) {
        if(data) {
            func(data.Contents);
        }else {
            func(false, err);
        }
    });
};
export var cosDownload = (url) => {
    cos.getObject({
        Bucket: DefaultBucket,
        Region: Region,
        Key: url,
    }, function (err, data) {
        console.log(err || data.Body);
    });
};
export var cosDelete = (url) => {
    cos.deleteObject({
        Bucket: DefaultBucket,
        Region: Region,
        Key: url,
    }, function (err, data) {
        console.log(err || data);
    });
};