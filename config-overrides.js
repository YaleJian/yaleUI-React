const path = require('path');

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
    }

    return config;
};
