const path = require('path');
const CosPlugin = require('cos-webpack');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {
    //使用@绝对路径
    config.resolve.alias = {
        '@': resolve('src')
    };

    // 去除css，js名称中的哈希
    /*config.output.filename = 'static/js/[name].js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';
    config.plugins[5].options.filename = "static/css/[name].css";
    config.plugins[5].options.chunkFilename = "static/css/[name].chunk.css";*/

    if (process.env.NODE_ENV === 'production') {

        //引用腾讯云对象存储源，加速静态资源下载，不占用本机服务器带宽
        config.output.publicPath = 'https://homepage-1252187891.cos.ap-beijing.myqcloud.com/build';

        //上传到腾讯云cos对象存储
        config.plugins.push(
            new CosPlugin({  // 配置 Plugin
                secretId: '',
                secretKey: '',
                bucket: 'homepage-1252187891',  // COS 存储对象名称，格式为对象名称加应用ID (APPID)，如： bucket-1250000000
                region: 'ap-beijing',  // COS 存储地域
                // exclude: /index.html$/,  // 可选，排除特定文件，正则表达式，如: /index.html$/
                path: '/'  // 存储路径， 默认为 [hash]
            })
        );
    }

    return config;
};
