import React, {Component} from 'react'
import Header from "../common/Header";
import Main from "../common/Main";
import "./weather.css";
import axios from "../../modules/utils/Axios";
import result from "../../modules/utils/result";
import Icon from "../../modules/utils/Icon";
import Message from "../../modules/message/Message";

const AMap = window.AMap;

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
        }
    }

    componentDidMount = () => {
        this.getLocation();
    };


    render() {

        let widget = <div className={"ya-loading"}>
            <div className="loader3"><span/><span/></div>
        </div>;
        if (this.state.status === 1) {
            console.log(this.state.location);
            widget = <>
                <div className={"widget"}>
                    <div className={"main"}>
                        <div className={"row"}>代码在线维护中，页面可能会出现排版异常</div>
                        {this.pages.location()}
                        {this.pages.tips()}
                        {this.pages.realTime()}
                        {this.pages.today()}
                        {this.pages.recentDays()}
                        {this.pages.airDetail()}
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
        setData: (locationData, weatherData) => {
            let r = weatherData.result.realtime;
            let d = weatherData.result.daily;
            let data = {
                status: 1,
                locationData,
                weatherData,
                longitudeAndLatitude: locationData.position.toString().split(','),
                address: locationData.formattedAddress,
                keyPoint: weatherData.result.forecast_keypoint,//分钟级分析关键句
                trend: d.description,//小时级分析
                weather: [r.skycon, this.data.skyCon[r.skycon]],
                apparentTemperature: r.apparent_temperature,//体感温度
                temperature: r.temperature,//温度
                windSpeed: [r.wind.speed, this.data.windSpeed(r.wind.speed)],//风速
                windDirection: r.wind.direction,//风向
                uv: [r.life_index.ultraviolet.index, r.life_index.ultraviolet.desc],//紫外线
                aqi: [r.air_quality.aqi.chn, r.air_quality.description.chn],//空气质量
                visibility: r.visibility,//能见度
                humidity: Math.floor(r.humidity * 100),//湿度
                airPressure: r.pressure,//气压
                cloudCover: r.cloudrate,//云量
                shortwaveRadiation: r.dswrf,//短波辐射
                precipitationIntensity: r.precipitation.local.intensity,//降水强度
                closestPrecipitationDistance: r.precipitation.nearest.distance,//最近降水距离
                closestPrecipitationIntensity: r.precipitation.nearest.intensity,//最近降水强度
                co: r.air_quality.co,
                no2: r.air_quality.no2,
                o3: r.air_quality.o3,
                pm10: r.air_quality.pm10,
                pm25: r.air_quality.pm25,
                so2: r.air_quality.so2,
                sun: [d.astro[0].sunrise.time, d.astro[0].sunset.time],
                warning: weatherData.result.alert.content,
                carWashing: d.life_index.carWashing[0].desc,
                coldRisk: d.life_index.coldRisk[0].desc,
                daily: [],
            };

            //15天预报
            for (let i = 0; i < 16; i++) {
                data.daily.push({
                    weather: [d.skycon[i].value, this.data.skyCon[d.skycon[i].value]],
                    temperatureRange: [d.temperature[i].min, d.temperature[i].max],
                    aqi: Math.floor(d.air_quality.aqi[i].avg.chn),
                });
            }
            this.setState(data);
        },
        //获取今天是第几周
        getWeek: (index) => {
            let weekName = ["日", "一", "二", "三", "四", "五", "六"];
            let nowDate = new Date();
            let tDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + index);
            return weekName[tDate.getDay()];
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
            if (speed < 20) return "风小";
            return "风大";
        },
        warning: (code) => {
            let type = ["台风", "暴雨", "暴雪", "寒潮", "大风", "沙尘暴", "高温", "干旱", "雷电", "冰雹", "霜冻", "大雾", "霾", "道路结冰", "森林火灾", "雷雨大风"];
            let grade = ["蓝色", "黄色", "橙色", "红色"];
            return [type[code.substring(0, 1)], grade[code.substring(2, 3)]];
        },
    };
    pages = {
        location: () => {
            return <div className={"row location"}>
                <div className={"address"}>
                    <Icon name={"i-zu-copy"}/>
                    <span className={"content"}>{this.state.address}</span>
                </div>
                <div className={"longLat"}>
                    <Icon name={"i-zhengsheyingxiangzhuanhuanweijingweidugeshi"}/>
                    <span
                        className={"content"}>{this.state.longitudeAndLatitude[0]}° {this.state.longitudeAndLatitude[1]}°</span>
                </div>
            </div>
        },
        tips: () => {
            return <div className={"row tips"}>
                <div className={"forecastKeyPoint"}>
                    <Icon name={"i-tongzhi1"}/>
                    <span className={"content"}> {this.state.keyPoint}</span>
                </div>
            </div>
        },
        realTime: () => {
            return <div className={"row realTime"}>
                <div className={"column"}>

                    <div className={"temperature"}>
                        <Icon name={"i-wendu"}/>
                        <span>{Math.floor(this.state.temperature)}°</span>
                    </div>
                </div>

                <div className={"column min"}>
                    <div className={"skyCon"}>
                        <span className={"text"}>{this.state.weather[1]}</span>
                        <span className={"ya-greenBorder"}>
                            <span>{this.state.aqi[0]}</span>
                            <span>{this.state.aqi[1]}</span>
                        </span>
                    </div>
                    <span className={"col wind"}>
                        <Icon name={"i-icon-fengsu-"}/>
                        <span className={"content"}> {this.state.windSpeed[0]}km/h {this.state.windSpeed[1]}</span>
                    </span>
                    <span className={"uv"}>
                        <Icon name={"i-ziwaixian"}/>
                        <span className={"content"}>{this.state.uv[1]}</span>
                    </span>
                    <span className={"carWash"}>
                        <Icon name={"i-shuangse-xichefuwu"}/>
                        <span className={"content"}>{this.state.carWashing}</span>
                    </span>
                    <span className={"cold"}>
                        <Icon name={"i-ganmao"}/>
                        <span className={"content"}>{this.state.coldRisk}</span>
                    </span>
                    <span className={"sunrise"}>
                        <Icon name={"i-richu4"}/>
                        <span className={"content"}>{this.state.sun[0]}</span>
                    </span>
                    <span className={"sunset"}>
                        <Icon name={"i-rila4"}/>
                        <span className={"content"}>{this.state.sun[1]}</span>
                    </span>
                </div>
                <div className={"col column weatherIcon"}>

                    <div><Icon name={"i-"+this.state.weather[0]}/></div>
                </div>


            </div>
        },
        recentDays: () => {
            let dayText = ["今天", "明天", "后天"];
            let day3Tag = this.state.daily.map((item, index) => {
                return <div className={"day"} key={index}>
                    <div className={""}>
                        {dayText[index] || "周"+this.data.getWeek(index)}
                        <span className={"air ya-greenBorder"}>
                            <span>{item.aqi}</span>
                        </span>
                    </div>
                    <div className={""}>
                        <span>{item.temperatureRange[0] + "° ~ " + item.temperatureRange[1] + "°"}</span>
                    </div>
                    <div>
                        <Icon name={"i-"+item.weather[0]}/>
                        <span className={"sky"}>{item.weather[1]}</span>
                    </div>
                </div>
            });
            return <div className={"row future3Day"}>{day3Tag}</div>
        },
        today: () => {
            return <div className={"row today"}>
                <span className={"bodyFeelingTemp"}>
                    <Icon name={"i---rentitu"}/>
                    <span
                        className={"content"}>{this.state.apparentTemperature}°</span>
                </span>
                <span className={"bodyFeelingTemp"}>
                    <Icon name={"i-fengxiang"}/>
                    <span className={"content"}>{this.state.windDirection}</span>
                </span>
                <span className={"humidity"}>
                            <Icon name={"i-shidu"}/>
                            <span className={"content"}>{this.state.humidity}%</span>
                        </span>
                <span className={"col pres"}>
                            <Icon name={"i-daqiyali"}/>
                            <span className={"content"}>{this.state.airPressure}kpa</span>
                        </span>
                <span className={"visibility"}>
                            <Icon name={"i-nengjiandu"}/>
                            <span className={"content"}>{this.state.visibility}km</span>
                        </span>
            </div>
        },
        airDetail: () => {
            return <div className={"row airDetail"}>
                <div>
                    <div>
                        <Icon name={"i-pmcopy"}/>
                        <span className={"content"}>PM25浓度：{this.state.pm25}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-PM"}/>
                        <span className={"content"}>PM10浓度：{this.state.pm10}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-chouyang"}/>
                        <span className={"content"}>臭氧浓度：{this.state.o3}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-eryanghuadan"}/>
                        <span className={"content"}>二氧化氮浓度：{this.state.no2}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-eryanghualiu2"}/>
                        <span className={"content"}>二氧化硫浓度：{this.state.so2}（μg/m³）</span>
                    </div>
                    <div>
                        <Icon name={"i-yiyanghuatan"}/>
                        <span className={"content"}>一氧化碳浓度：{this.state.co}（μg/m³）</span>
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
            let url = "/service/weather/getData?location=" + location.toString() + "&version=v2.5&type=weather";
            axios.get(url, {withCredentials: true})
                .then((res) => {
                    result(res, (weatherData) => {
                        console.log(weatherData);
                        this.data.setData(locationData, weatherData);
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
