import React, {Component} from 'react'
import Header from "../common/Header";
import Main from "../common/Main";
import "./weather.css";
import axios from "../../modules/utils/Axios";
import result from "../../modules/utils/result";
import Icon from "../../modules/utils/Icon";
import Message from "../../modules/message/Message";
import dataUtils from "../../modules/utils/dataUtils";

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
                <div className={"widget-container"}>
                    <div className={"widget"}>
                        {this.pages.updateTime()}
                        {this.pages.location()}
                        {this.pages.tips()}
                        {this.pages.warning()}
                        {this.pages.realTimeMin()}
                        {this.pages.realTimeDetail()}
                        {this.pages.recentHours()}
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

    pages = {
        updateTime: () => {
            return <div className={"row updateTime"}>
                {"更新时间：" + this.state.updateTime}
            </div>
        },
        location: () => {
            return <div className={"row location"}>
                <div className={"address"}>
                    <Icon name={"i-zu-copy"}/>
                    <span className={"content"}>{this.state.address}</span>
                </div>
                <div className={"longLat"}>
                    <Icon name={"i-zhengsheyingxiangzhuanhuanweijingweidugeshi"}/>
                    <span
                        className={"content"}>{this.state.longitudeAndLatitude[0]} {this.state.longitudeAndLatitude[1]}</span>
                </div>
            </div>
        },
        tips: () => {
            return <>
                <div className={"row tips"}>
                    <div className={"forecastKeyPoint"}>
                        <Icon name={"i-tongzhi1"}/>
                        <span className={"content"}> {this.state.keyPoint}</span>
                    </div>
                </div>
            </>;
        },
        warning: () => {

            if (!this.state.warning || this.state.warning[0].length === 0) return "";
            let warnings = this.state.warning[0].map((item, index) => {
                    return <div className={"text " + item[2]} key={index}>
                        <Icon name={"i-jinggao"}/>
                        <span className={"content"}>{item[0] + item[1] + "预警"}</span>
                    </div>
                }
            );
            return <div className={"row warning"}>{warnings}</div>;
        },
        realTimeMin: () => {
            return <>
                <div className={"row realTime-min"}>
                    <div className={"top"}>
                        <div className={"column temperature-container"}>
                            <div className={"temperature"}>
                                <Icon name={"i-wendu"}/>
                                <span>{Math.round(this.state.temperature)}°</span>
                            </div>
                            <div className={"bodyFeelingTemp"}>
                                <Icon name={"i---rentitu"}/>
                                <span className={"content"}>{this.state.apparentTemperature}°</span>
                            </div>
                        </div>
                        <div className={"column weatherIcon"}>
                            <div className={"iconArea"}><Icon name={"i-" + this.state.weather[0]}/></div>
                        </div>
                    </div>
                    <div className={"bottom"}>{this.state.trend}</div>
                </div>
            </>
        },
        realTimeDetail: () => {
            return <div className={"row realTime-detail"}>
                <div className={"sun"}>
                    <span className={"sunrise"}>
                        <Icon name={"i-richu4"}/>
                        <span className={"content"}>{this.state.sun[0]}</span>
                    </span>
                    <span className={"sunset"}>
                        <Icon name={"i-rila4"}/>
                        <span className={"content"}>{this.state.sun[1]}</span>
                    </span>
                </div>
                <div className={"detailed"}>
                    <div className={"col aqi"}>
                        <Icon name={"i-kongqizhiliang"}/>
                        <span className={"content"}> {this.state.aqi[1]}</span>
                    </div>
                    <div className={"col wind"}>
                        <Icon name={"i-icon-fengsu-"}/>
                        <span className={"content"}> {this.state.windSpeed[1]}</span>
                    </div>
                    <div className={"col windDirection"}>
                        <Icon name={"i-fengxiang"}/>
                        <span className={"content"}>{this.state.windDirection[1]}</span>
                    </div>
                    <div className={"col uv"}>
                        <Icon name={"i-ziwaixian"}/>
                        <span className={"content"}>{this.state.uv[1]}</span>
                    </div>
                    <div className={"col visibility"}>
                        <Icon name={"i-nengjiandu"}/>
                        <span
                            className={"content"}>{this.state.visibility < 1 ? this.state.visibility * 1000 + "m" : this.state.visibility + "km"}</span>
                    </div>
                    <div className={"col humidity"}>
                        <Icon name={"i-shidu"}/>
                        <span className={"content"}>{this.state.humidity}%</span>
                    </div>
                    <div className={"col pres"}>
                        <Icon name={"i-daqiyali"}/>
                        <span className={"content"}>{this.state.airPressure}kpa</span>
                    </div>
                    <div className={"col carWash"}>
                        <Icon name={"i-shuangse-xichefuwu"}/>
                        <span className={"content"}>{this.state.carWashing}</span>
                    </div>
                    <div className={"col cold"}>
                        <Icon name={"i-ganmao"}/>
                        <span className={"content"}>{this.state.coldRisk}</span>
                    </div>
                </div>
            </div>
        },
        recentHours: () => {
            let hour24Tag = this.state.hourly.map((item, index) => {
                return <div className={"day"} key={index}>
                    <div className={""}>{index + ":00"}</div>
                    <div className={"air ya-greenBorder"}>
                        <span>{item.aqi}</span>
                    </div>
                    <div className={"temp"}>
                        <span>{item.temperature + "°"}</span>
                    </div>
                    <div>
                        <Icon name={"i-" + item.weather[0]}/>
                        <span className={"content sky"}>{item.weather[1]}</span>
                    </div>
                </div>
            });
            return <div className={"row recentDay"}>{hour24Tag}</div>
        },
        recentDays: () => {
            let day16Tag = this.state.daily.map((item, index) => {
                return <div className={"day"} key={index}>
                    <div className={""}> {this.data.getRecentDay(index)}</div>
                    <div className={"air ya-greenBorder"}>
                        <span>{item.aqi}</span>
                    </div>
                    <div className={"temp"}>
                        <span>{item.temperatureRange[0] + "° ~ " + item.temperatureRange[1] + "°"}</span>
                    </div>
                    <div>
                        <Icon name={"i-" + item.weather[0]}/>
                        <span className={"content sky"}>{item.weather[1]}</span>
                    </div>
                </div>
            });
            return <div className={"row recentDay"}>{day16Tag}</div>
        },
        airDetail: () => {
            return <div className={"row airDetail"}>
                <div className={"col"}>
                    <Icon name={"i-pmcopy"}/>
                    <span className={"content"}>{this.state.pm25}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-PM"}/>
                    <span className={"content"}>{this.state.pm10}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-chouyang"}/>
                    <span className={"content"}>{this.state.o3}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-eryanghuadan"}/>
                    <span className={"content"}>{this.state.no2}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-eryanghualiu2"}/>
                    <span className={"content"}>{this.state.so2}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-yiyanghuatan"}/>
                    <span className={"content"}>{this.state.co}</span>
                </div>
            </div>
        }
    };
    data = {
        //处理数据
        setData: (locationData, weatherData) => {
            let r = weatherData.result.realtime;
            let h = weatherData.result.hourly;
            let d = weatherData.result.daily;
            let longitudeAndLatitude = locationData.position.toString().split(',');
            longitudeAndLatitude[0] = dataUtils.formatDegree(longitudeAndLatitude[0]);
            longitudeAndLatitude[1] = dataUtils.formatDegree(longitudeAndLatitude[1]);
            let nowDate = new Date();
            let time = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + " " + nowDate.getHours() + ":" + nowDate.getMinutes();
            let data = {
                status: 1,
                updateTime: time,
                locationData,
                weatherData,
                longitudeAndLatitude,
                address: locationData.addressComponent.district + locationData.addressComponent.township,
                keyPoint: weatherData.result.forecast_keypoint,//分钟级分析关键句
                trend: h.description,//小时级分析
                weather: [r.skycon, this.data.skyCon[r.skycon]],
                apparentTemperature: Math.round(r.apparent_temperature),//体感温度
                temperature: Math.round(r.temperature),//温度
                windSpeed: [Math.round(r.wind.speed), this.data.windSpeed(r.wind.speed)],//风速
                windDirection: [r.wind.direction, this.data.direction(r.wind.direction)],//风向
                uv: [r.life_index.ultraviolet.index, r.life_index.ultraviolet.desc],//紫外线
                aqi: [r.air_quality.aqi.chn, r.air_quality.description.chn],//空气质量
                visibility: Math.round(r.visibility),//能见度
                humidity: Math.round(r.humidity * 100),//湿度
                airPressure: Math.round(r.pressure / 1000),//气压
                cloudCover: r.cloudrate,//云量
                shortwaveRadiation: r.dswrf,//短波辐射
                precipitationIntensity: r.precipitation.local.intensity,//降水强度
                closestPrecipitationDistance: Math.round(r.precipitation.nearest.distance),//最近降水距离
                closestPrecipitationIntensity: r.precipitation.nearest.intensity,//最近降水强度
                co: r.air_quality.co,
                no2: r.air_quality.no2,
                o3: r.air_quality.o3,
                pm10: r.air_quality.pm10,
                pm25: r.air_quality.pm25,
                so2: r.air_quality.so2,
                sun: [d.astro[0].sunrise.time, d.astro[0].sunset.time],
                warning: weatherData.result.alert.content.length > 0 ? [this.data.warning(weatherData.result.alert.content), weatherData.result.alert.content] : false,
                carWashing: d.life_index.carWashing[0].desc,
                coldRisk: d.life_index.coldRisk[0].desc,
                daily: [],
                hourly:[],
            };

            //24小时天气
            for (let i = 0; i < 24; i++) {
                data.hourly.push({
                    weather: [h.skycon[i].value, this.data.skyCon[h.skycon[i].value]],
                    temperature: Math.round(h.temperature[i].value),
                    aqi: Math.round(h.air_quality.aqi[i].value.chn),
                });
            }

            //16天预报 + 昨天
            for (let i = 0; i < 16; i++) {
                data.daily.push({
                    weather: [d.skycon[i].value, this.data.skyCon[d.skycon[i].value]],
                    temperatureRange: [Math.round(d.temperature[i].min), Math.round(d.temperature[i].max)],
                    aqi: Math.round(d.air_quality.aqi[i].avg.chn),
                });
            }
            this.setState(data);
        },
        //获取今天是第几周
        getRecentDay: (index) => {
            let dayText = ["昨天", "今天"];
            let nowDate = new Date();
            let weekName = ["日", "一", "二", "三", "四", "五", "六"];
            let tDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + index - 1);
            if (index <= 1) {
                return dayText[index];
            } else if (index > 1 && index < 3) {
                return "周" + weekName[tDate.getDay()];
            } else {
                return tDate.getMonth() + "." + tDate.getDate();
            }
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
            let i = Math.round(direction / 22.5);
            let dName = ["北", "东北偏北", "东北", "东北偏东", "东", "东南偏东", "东南", "东南偏南", "南", "西南偏南", "西南", "西南偏西", "西", "西北偏西", "西北", "西北偏北"];
            return dName[i];
        },
        windSpeed: (speed) => {
            if (speed < 1) return "无风";
            if (speed < 20) return "风小";
            return "风大";
        },
        warning: (content) => {
            if (content.length === 0) return "";
            let type = ["台风", "暴雨", "暴雪", "寒潮", "大风", "沙尘暴", "高温", "干旱", "雷电", "冰雹", "霜冻", "大雾", "霾", "道路结冰", "森林火灾", "雷雨大风"];
            let grade = ["蓝色", "黄色", "橙色", "红色"];
            let color = ["blue", "yellow", "orange", "red"];

            let result = [];
            for (let i in content) {
                let code = content[i].code;
                let typeNum = Number(code.substring(0, 2)) - 1;
                let gradeNum = code[3] - 1;
                result.push([type[typeNum], grade[gradeNum], color[gradeNum]]);
            }
            return result;
        },
    };
    //获取当前定位
    getLocation = () => {
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });

        let onComplete, onError;
        map.plugin('AMap.Geolocation', () => {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：无穷大
                zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RT',
                buttonOffset: new AMap.Pixel(10, 70),
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition((status, result) => {
                if (status === 'complete') {
                    onComplete(result)
                } else {
                    onError(result)
                }
            });
        });

        // 绑定事件
        let clickHandler = (e) => {
            Message('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！拖动点选位置获取天气信息功能即将上线！', false, true);
        };
        map.on('click', clickHandler);

        //解析定位结果
        onComplete = (locationData) => {
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

        //解析定位错误信息
        onError = (data) => {
            alert('定位失败', data)
        }
    };
}

export default Weather
