import React from 'react';
import './weather.css'
import Header from "../common/Header";
import Main from "../common/Main";
class Weather extends React.Component{

    constructor(props){
        super(props);
        this.getData();
        this.state = {

        }
    }
    render() {
        return <>
            <Header children={"天气"} className={"center"}/>
            <Main>
                <div className={"ya-weather"}>

                </div>
            </Main>
        </>;
    }

    getData = ()=>{

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(onSuccess , onError);
        }else{
            alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
        }
        //定位数据获取成功响应
        function  onSuccess(position){
            alert('纬度: '          + position.coords.latitude          + '\n' +
                '经度: '         + position.coords.longitude         + '\n' +
                '海拔: '          + position.coords.altitude          + '\n' +
                '水平精度: '          + position.coords.accuracy          + '\n' +
                '垂直精度: ' + position.coords.altitudeAccura);
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let token = "WgebFTmqCckFVqQk";
            let url = "https://api.caiyunapp.com/v2/"+token+"/{"+longitude+", "+latitude+"}/realtime.json";

        }
        //定位数据获取失败响应
        function onError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("您拒绝对获取地理位置的请求");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("位置信息是不可用的");
                    break;
                case error.TIMEOUT:
                    alert("请求您的地理位置超时");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("未知错误");
                    break;
            }
        }

        map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })

            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete)
            AMap.event.addListener(geolocation, 'error', onError)

            function onComplete (data) {
                console.log(data)
                // data是具体的定位信息
            }

            function onError (data) {
                // 定位出错
            }
        })
    }
}
export default Weather;