const path = require('path')
module.exports = {
    // 入口文件
    entry: './index.js',
    // 打包模式
    mode: 'development',
    resolve: {
        // 解析顺序
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        "presets": ["@babel/preset-react", "@babel/preset-env"],
                        "plugins": ["@babel/plugin-transform-runtime"]
                    }
                },
            }
        ],
        exclude: /node_modules/
    },
    output: {
        // 输出文件目录
        path: path.resolve(__dirname, 'dist'),
        // 输出文件名称 -打包需求不需要hash码 此处可以加hash
        filename: 'index.js'
    }
}