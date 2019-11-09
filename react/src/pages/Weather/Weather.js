import React, {Component} from 'react'
import Header from "../common/Header";
import Main from "../common/Main";
import "./weather.css";
import axios from "../../modules/utils/Axios";
import result from "../../modules/utils/result";

const AMap = window.AMap;
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poi: [],
        }
    }

    componentDidMount = () => {
        this.getLocation();
    };

    render() {
        return (<>
                <Header title={"天气"}/>
                <Main>
                    <div className={"ya-weather"}>
                        <div id="container" className="map"/>
                    </div>
                </Main>
            </>
        )
    }

    //获取当前定位
    getLocation = () => {
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });

        //解析定位结果
        let onComplete = (data) => {
            let poi = data.position.toString().split(',')

            //获取天气信息
            let token = "izqe37yftnNrln7z";
            let pois = poi.toString();
            let url = "https://api.caiyunapp.com/v2/"+token+"/"+pois+"/realtime.json";
            console.log(url)
            axios.get(url,{withCredentials:true}).then((res) => {
                    result(res, () => {
                        console.log(res)
                    });
                })
                .catch(function (res) {
                    console.log(res);
                });
            this.setState({poi});
        };

        map.plugin('AMap.Geolocation', () => {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：无穷大
                zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete.bind(this)); //返回定位信息
            AMap.event.addListener(geolocation, 'error', onError) //返回定位出错信息
        });

        //解析定位错误信息
        let onError = (data) => {
            alert('定位失败')
        }
    };
}

export default Weather
