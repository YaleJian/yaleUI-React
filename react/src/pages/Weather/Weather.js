import React, {Component} from 'react'
import Header from "../common/Header";
import Main from "../common/Main";
import "./weather.css";
import axios from "../../modules/utils/Axios";
import result from "../../modules/utils/result";
import Icon from "../../modules/utils/Icon";
import Message from "../../modules/message/Message";

const AMap = window.AMap;
const weekName = ["日", "一", "二", "三", "四", "五", "六"];

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            location: [],
            weatherData: false,
            realtime: {
                apparentTemperature: 0,//体感温度
                temperature: 0,//温度
                windSpeed: 0,//风速
                windDirection: 0,//风向
                uv: 0,//紫外线
                aqi: 0,//空气质量
                visibility: 0,//能见度
                humidity: 0,//湿度
                airPressure: 0,//气压
                cloudCover: 0,//云量
                shortwaveRadiation: 0,//短波辐射
                precipitationIntensity: 0,//降水强度
                closestPrecipitationDistance: 0,//最近降水距离
                closestPrecipitationIntensity: 0,//最近降水强度
            }
        }
    }

    componentDidMount = () => {
        this.getLocation();
    };


    render() {

        let widget = <div className={"ya-loading"}>
            <div className="loader3"><span/><span/></div>
        </div>;
        let weatherData = this.state.weatherData;
        if (weatherData) {
            console.log(weatherData);
            console.log(this.state.location);
            let realtime = weatherData.result.realtime;
            let minutely = weatherData.result.minutely;
            let hourly = weatherData.result.hourly;
            let daily = weatherData.result.daily;
            widget = <>
                <div className={"widget"}>
                    <div className={"main"}>
                        {this.pages.location()}
                        {this.pages.tips(realtime)}
                        {this.pages.realTime(realtime)}
                        {this.pages.today(realtime)}
                        {this.pages.recentDays(daily)}
                        {this.pages.airDetail(realtime)}
                    </div>
                </div>
            </>
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

    data = {
        //处理数据
        setData: (weatherData) => {
            let r = weatherData.realTime;
            let realtime = {
                apparentTemperature: r.apparent_temperature,//体感温度
                temperature: r.temperature,//温度
                windSpeed: r.wind.speed,//风速
                windDirection: r.wind.direction,//风向
                uv: [r.life_index.ultraviolet.index,r.life_index.ultraviolet.desc],//紫外线
                AQI: [r.air_quality.aqi.chn,r.air_quality.aqi.description.chn],//空气质量
                visibility: r.visibility,//能见度
                humidity: r.humidity,//湿度
                airPressure: r.pressure,//气压
                cloudCover: r.cloudrate,//云量
                shortwaveRadiation: r.dswrf,//短波辐射
                precipitationIntensity: r.precipitation.local.intensity,//降水强度
                closestPrecipitationDistance: r.precipitation.nearest.distance,//最近降水距离
                closestPrecipitationIntensity: r.precipitation.nearest.intensity,//最近降水强度
                co:r.air_quality.co,
                no2:r.air_quality.no2,
                o3:r.air_quality.o3,
                pm10:r.air_quality.pm10,
                pm25:r.air_quality.pm25,
                so2:r.air_quality.so2
            }
        },
        //获取今天是第几周
        getWeek: () => {
            let thisDate = new Date(),
                january = new Date(thisDate.getFullYear(), 0, 1),
                d = Math.round((thisDate.valueOf() - january.valueOf()) / 86400000);
            return Math.ceil((d + ((january.getDay() + 1) - 1)) / 7);
        },
        //天气状况
        skyCon: {
            "CLEAR_DAY": "晴",
            "CLEAR_NIGHT": "晴",
            "PARTLY_CLOUDY_DAY": "多云",
            "PARTLY_CLOUDY_NIGHT": "多云",
            "CLOUDY": "阴",
            "LIGHT_HAZE": "轻度雾霾",
            "MODERATE_HAZE": "中度雾霾",
            "HEAVY_HAZE": "重度雾霾",
            "LIGHT_RAIN": "小雨",
            "MODERATE_RAIN": "中雨",
            "HEAVY_RAIN": "大雨",
            "STORM_RAIN": "暴雨",
            "FOG": "雾",
            "LIGHT_SNOW": "小雪",
            "MODERATE_SNOW": "中雪",
            "HEAVY_SNOW": "大雪",
            "STORM_SNOW": "暴雪",
            "DUST": "浮尘",
            "SAND": "沙尘",
            "WIND": "大风",
            "THUNDER_SHOWER": "雷阵雨",
            "HAIL": "冰雹",
            "SLEET": "雨夹雪",
        },
        //紫外线
        ultraviolet: ["无", "很弱", "弱", "中等", "强", "很强", "极强"],
        //舒适度
        comfort: ["闷热", "酷热", "很热", "热", "温暖", "舒适", "凉爽", "冷", "很冷", "寒冷", "极冷", "刺骨的冷", "湿冷", "干冷"],
        //洗车指数
        carWashing: ["适宜", "较适宜", "较不适宜", "不适应"],

        coldRisk: ["少发", "较易发", "易发", "极易发"],
        rainOrSnowFall: (level, sky) => {
            if ((sky !== undefined && !sky.includes("雨") && !sky.includes("雪")) || level < 0.03) return 0;
            let desc = Number.parseInt(level);
            if (level > 0) desc = "小";
            if (level > 0.03) desc = "小";
            if (level > 0.25) desc = "中";
            if (level > 0.35) desc = "大";
            if (level > 0.48) desc = "暴";
            desc += sky || "";
            return desc;
        },
        direction: (direction) => {
            let i = Math.floor(direction / 22.5);
            let dName = ["北", "东北偏北", "东北", "东北偏东", "东", "东南偏东", "东南", "东南偏南", "南", "西南偏南", "西南", "西南偏西", "西", "西北偏西", "西北", "西北偏北"];
            return dName[i];
        },
        windSpeed: (speed) => {
            if (speed < 1) return "无风";
            if (speed < 6) return "轻风";
            if (speed < 28) return "微风";
            if (speed < 38) return "摆风";
            if (speed < 61) return "强风";
            if (speed > 61) return "风暴";
        },
    };
    pages = {
        location: () => {
            return <div className={"row location"}>
                <div className={"address"}>
                    <Icon name={"i-zu-copy"}/>
                    <span className={"content"}>{this.state.locationData.formattedAddress}</span>
                </div>
                <div className={"longLat"}>
                    <Icon name={"i-zhengsheyingxiangzhuanhuanweijingweidugeshi"}/>
                    <span
                        className={"content"}>{this.state.weatherData.location[0]}° {this.state.weatherData.location[1]}°</span>
                </div>
            </div>
        },
        tips: () => {
            return <div className={"row tips"}>
                <div className={"forecastKeyPoint"}>
                    <Icon name={"i-tongzhi1"}/>
                    <span className={"content"}> {this.state.weatherData.result.forecast_keypoint}</span>
                </div>
            </div>
        },
        realTime: (realtime) => {
            return <div className={"row realTime"}>
                <div className={"column"}>

                    <div className={"temperature"}>
                        <Icon name={"i-wendu"}/>
                        <span>{Math.floor(this.state.realtime.temperature)}°</span>
                    </div>
                </div>

                <div className={"column min"}>
                    <div className={"skyCon"}>
                        <span className={"text"}>{this.data.skyCon[this.state.realtime.skycon]}</span>
                        <span className={"ya-greenBorder"}>
                            <span>{this.state.realtime.aqi[0]}</span>
                            <span>{this.state.realtime.aqi[1]}</span>
                        </span>
                    </div>
                    <span className={"col wind"}>
                        <Icon name={"i-icon-fengsu-"}/>
                        <span className={"content"}> {this.data.windSpeed(this.state.realtime.windSpeed)}</span>
                    </span>
                    <span className={"uv"}>
                        <Icon name={"i-ziwaixian"}/>
                        <span
                            className={"content"}>{this.data.ultraviolet[this.state.realtime.uv[0] % 2]}</span>
                    </span>
                </div>
                <div className={"col column weatherIcon"}>

                    <div><Icon name={"i-yun"}/></div>
                </div>


            </div>
        },
        recentDays: (daily) => {
            let days = ["今天", "明天", "后天", "周" + weekName[this.data.getWeek()], "周" + weekName[this.data.getWeek() + 1]];
            let day3Tag = days.map((item, index) => {
                return <div className={"column"} key={index}>
                    <div className={"top"}>
                        {item}
                        <span className={"air ya-greenBorder"}>
                            <span>{Math.floor(daily.air_quality.aqi[index].avg.chn)}</span>
                        </span>
                    </div>
                    <div className={"bottom"}>
                        <span>{Math.floor(daily.temperature[index].min) + "° ~ " + Math.floor(daily.temperature[index].max) + "°"}</span>
                        <span className={"sky"}>{this.data.skyCon[daily.skycon[index].value]}</span>
                    </div>
                </div>
            });
            return <div className={"row future3Day"}>{day3Tag}</div>
        },
        today: (realtime) => {
            return <div className={"row today"}>
                <span className={"bodyFeelingTemp"}>
                    <Icon name={"i---rentitu"}/>
                    <span
                        className={"content"}>{realtime.apparent_temperature}° {realtime.life_index.comfort.desc}</span>
                </span>
                <span className={"bodyFeelingTemp"}>
                    <Icon name={"i-fengxiang"}/>
                    <span className={"content"}>{this.data.direction(realtime.wind.direction)}</span>
                </span>
                <span className={"humidity"}>
                            <Icon name={"i-shidu"}/>
                            <span className={"content"}>{Math.floor(realtime.humidity * 100)}%</span>
                        </span>
                <span className={"col pres"}>
                            <Icon name={"i-daqiyali"}/>
                            <span className={"content"}>{Math.floor(realtime.pressure / 1000)}kpa</span>
                        </span>
                <span className={"visibility"}>
                            <Icon name={"i-nengjiandu"}/>
                            <span className={"content"}>{realtime.visibility}km</span>
                        </span>
            </div>
        },
        airDetail: (realtime) => {
            return <div className={"row airDetail"}>
                <div>
                    <div>
                        <Icon name={"i-pmcopy"}/>
                        <span className={"content"}>PM25浓度：{realtime.air_quality.pm25}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-PM"}/>
                        <span className={"content"}>PM10浓度：{realtime.air_quality.pm10}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-chouyang"}/>
                        <span className={"content"}>臭氧浓度：{realtime.air_quality.o3}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-eryanghuadan"}/>
                        <span className={"content"}>二氧化氮浓度：{realtime.air_quality.no2}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-eryanghualiu2"}/>
                        <span className={"content"}>二氧化硫浓度：{realtime.air_quality.so2}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-yiyanghuatan"}/>
                        <span className={"content"}>一氧化碳浓度：{realtime.air_quality.co}（μg/m³）</span>
                    </div>
                </div>
            </div>
        }
    };
    //获取当前定位
    getLocation = () => {
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });

        // 绑定事件
        let clickHandler = (e) => {
            Message('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！拖动点选位置获取天气信息功能即将上线！', false, true);
        };
        map.on('click', clickHandler);

        //解析定位结果
        let onComplete = (locationData) => {
            console.log(locationData);
            let location = locationData.position.toString().split(',');

            //获取天气信息
            let url = "/service/weather/getData?location=" + location.toString() + "&version=v2.5&type=weather&dailysteps=360";
            axios.get(url, {withCredentials: true})
                .then((res) => {
                    result(res, (weatherData) => {
                        console.log(weatherData);
                        this.data.setData(weatherData);
                        this.setState({location, weatherData, locationData});
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
