let express = require('express');   //引入express
let Mock = require('mockjs');       //引入mock

let app = express();        //实例化express
app.listen('8082', () => {
    console.log('模拟请求服务启动，监听端口：8082')
});

let simulatedData = [
    ['/service/user/login',{
        'code': 10000,
        'msg':'成功',
        'data': {
            'phoneNumber':17715263652,
            'nickName':'昵称测试'
        }
    }],
];
for (let i in simulatedData){
    app.use(simulatedData[i][0], function (req, res) {
        res.json(Mock.mock(simulatedData[i][1]));
    });
}