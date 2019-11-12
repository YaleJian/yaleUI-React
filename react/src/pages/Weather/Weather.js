import React, {Component} from 'react'
import Header from "../common/Header";
import Main from "../common/Main";
import "./weather.css";
import axios from "../../modules/utils/Axios";
import result from "../../modules/utils/result";

const AMap = window.AMap;
const STATE = {
    skycon: {
        "CLEAR_DAY": "晴",
        "CLEAR_NIGHT": "晴",
        "PARTLY_CLOUDY_DAY": "多云",
        "PARTLY_CLOUDY_NIGHT": "多云",
        "CLOUDY": "阴",
        "WIND": "大风",
        "HAZE": "雾霾",
        "RAIN": "雨",
        "SNOW": "雪",
    },
    ultraviolet: ["无", "很弱", "弱", "中等", "强", "很强", "极强"],
    comfort: ["闷热", "酷热", "很热", "热", "温暖", "舒适", "凉爽", "冷", "很冷", "寒冷", "极冷", "刺骨的冷", "湿冷", "干冷"],
    carWashing: ["适宜", "较适宜", "较不适宜", "不适应"],
    coldRisk: ["少发", "较易发", "易发", "极易发"],
    rainOrSnowFall: (level, type) => {
        let desc = Number.parseInt(level);
        if (0.03 < level < 0.25) desc = "小";
        if (0.03 < level < 0.25) desc = "中";
        if (0.03 < level < 0.25) desc = "大";
        if (0.03 < level < 0.25) desc = "暴";
        desc += type || "";
        if (type !== "雨" && type !== "雨") desc = "无";
        return desc;
    },
};

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            location: [],
            data: false,
        }
    }

    componentDidMount = () => {
        this.getLocation();
    };

    render() {

        let widget = <div className={"ya-loading"}>
            <div className="loader3"><span/><span/></div>
        </div>;
        let data = this.state.data;
        let result = data.result;
        if (data) {
            widget = <div className={"widget"}>
                <div className={"content"}>
                    <div className={"row"}>

                        <div>
                            <span className={"temperature"}>{result.temperature}℃</span>
                            <span className={"skycon"}>&nbsp;&nbsp;{STATE.skycon[result.skycon]}</span>
                        </div>
                        <div className={"humidity"}>湿度：{result.humidity * 100 }%</div>
                        <div className={"windDirection"}>风向：{result.wind.direction}°</div>
                        <div className={"windSpeed"}>风速：{result.wind.speed}（km/h）</div>
                        <div className={"pres"}>地面气压：{result.pres}Pa</div>
                        <div className={"ultraviolet"}>紫外线指数：{result.ultraviolet.index}，{STATE.ultraviolet[result.ultraviolet.index % 2]}</div>
                        <div className={"pm25"}>PM25浓度：{result.pm25}(μg/m3)</div>
                    </div>
                    <div className={"row"}>
                        <div className={"location"}>经度：{data.location[0]}，纬度：{data.location[1]}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"nearestDistance"}>最近降水距离：{result.precipitation.nearest.distance}km</div>
                        <div
                            className={"nearestIntensity"}>最近降水强度：{STATE.rainOrSnowFall(result.precipitation.nearest.intensity)}</div>
                        <div
                            className={"localIntensity"}>本地降水强度：{STATE.rainOrSnowFall(result.precipitation.local.intensity, STATE.skycon[result.skycon])}</div>
                    </div>
                    <div className={"row"}>
                        <div className={"cloudrate"}>云量：{result.cloudrate}</div>
                        <div className={"dswrf"}>短波辐射：{result.dswrf}(W/M2)</div>
                        <div className={"visibility"}>能见度：{result.visibility}m</div>

                        <div className={"comfort"}>舒适度指数：{STATE.skycon[result.comfort.index]}</div>

                    </div>
                    <div className={"row"}>
                        <div className={"pm10"}>PM10浓度：{result.pm10}(μg/m3)</div>
                        <div className={"o3"}>臭氧浓度：{result.o3}(μg/m3)</div>
                        <div className={"no2"}>二氧化氮浓度：{result.no2}(μg/m3)</div>
                        <div className={"so2"}>二氧化硫浓度：{result.so2}(μg/m3)</div>
                        <div className={"co"}>一氧化碳浓度：{result.co}(μg/m3)</div>
                    </div>
                </div>
            </div>
        }
        return (<>
                <Header occupied={false}>天气</Header>
                <Main className={"padding0 heightFull"}>
                    <div id="container" className="map"/>
                    <div className={"ya-weather"}>{widget}</div>
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
            let location = data.position.toString().split(',')

            //获取天气信息
            let url = "/service/weather/getRealTime?location=" + location.toString();
            axios.get(url, {withCredentials: true})
                .then((res) => {
                    result(res, (data) => {
                        console.log(data);
                        this.setState({location, data});
                    });
                })
                .catch(function (res) {
                    console.log(res);
                });
        };

        map.plugin('AMap.Geolocation', () => {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：无穷大
                zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RT',
                buttonOffset: new AMap.Pixel(10, 70),
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
