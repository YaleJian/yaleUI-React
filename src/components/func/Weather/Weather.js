import React, {useEffect, useRef, useState} from 'react'
import "./weather.css";
import {axios} from "../../utils/Axios";
import {result} from "../..";
import {Icon} from "../..";
import {Message} from "../..";
import {dataUtils} from "../..";
import AMapLoader from '@amap/amap-jsapi-loader';
import {initAMap} from "../../utils/amap";
import {caiYunData} from "../../utils/caiyun";

const Weather = (props)=> {
    const [status, set_status] = useState(0);
    const [latLon, set_latLon] = useState(false);//经纬度
    const [address, set_address] = useState("");//定位地址
    const [realtime, set_realtime] = useState(false);//实时
    const [hourly, set_hourly] = useState(false);//小时
    const [daily, set_daily] = useState(false);//天
    const containerRef = useRef();

    useEffect(()=>{
        if(status === 0) initWeather()
    },[])

    //获取天气数据
    let initWeather = ()=>{
        //获取定位信息
        initAMap(containerRef,(ampData)=>{
            set_latLon([dataUtils.formatDegree(ampData.ya_location[0]),dataUtils.formatDegree(ampData.ya_location[1])])
            set_address(ampData.ya_address)

            //获取天气信息
            axios.get(props.url + "?location=" + ampData.ya_location.toString() + "&version=v2.5&type=weather", {withCredentials: true})
                .then(res => {
                    result(res, weatherData => {
                        console.log("天气结果",weatherData);
                        let cData = caiYunData(weatherData);
                        set_realtime(cData.realtime)
                        set_hourly(cData.hourly)
                        set_daily(cData.daily)
                        set_status(1)
                    });
                })
                .catch(function (res) {
                    console.log(res);
                });
        },props.jsKey)
    }

    //获取今天的日期/星期
    let getDayName = (index) => {
        let dayText = ["昨天", "今天"];
        let nowDate = new Date();
        let weekName = ["日", "一", "二", "三", "四", "五", "六"];
        let tDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + index - 1);
        if (index <= 1) {
            return dayText[index];
        } else if (index === 2 || (index > 6 && (tDate.getDay() === 0 || tDate.getDay() === 6) )) {
            return "周" + weekName[tDate.getDay()];
        } else {
            return (tDate.getMonth() + 1) + "." + tDate.getDate();
        }
    }

    let pages = {
        tips: () => {
            return <>
                <div className={"row tips"}>
                    <div className={"forecastKeyPoint"}>
                        <Icon name={"i-tongzhi1"}/>
                        <span className={"content"}> {realtime.keyPoint}</span>
                    </div>
                </div>
            </>;
        },
        warning: () => {
            if(!realtime) return "";
            if (!realtime.warning || realtime.warning[0].length === 0) return "";
            let warnings = realtime.warning[0].map((item, index) => {
                    return <div className={"text " + item[2]} key={index}>
                        <Icon name={"i-jinggao"}/>
                        <span className={"content"}>{item[0] + item[1] + "预警"}</span>
                    </div>
                }
            );
            return <div className={"row warning"}>{warnings}</div>;
        },
        realTimeMin: () => {
            if(!realtime) return "";
            return <>
                <div className={"row realTime-min"}>
                    <div className={"updateTime"} hidden>
                        {"更新时间：" + realtime.updateTime}
                    </div>
                    <div className={"address"}>
                        <Icon name={"i-zu-copy"}/>
                        <span className={"content"}>{address}</span>
                        <span className={"longLat"}>{latLon[0]}  {latLon[1]}</span>
                    </div>
                    <div className={"top"}>
                        <div className={"column temperature-container"}>
                            <div className={"temperature"}>
                                <Icon name={"i-wendu"}/>
                                <span>{Math.round(realtime.temperature)}°</span>
                            </div>
                            <div className={"bodyFeelingTemp"}>
                                <Icon name={"i---rentitu"}/>
                                <span className={"content"}>{realtime.apparentTemperature}°</span>
                            </div>
                        </div>
                        <div className={"column weatherIcon"}>
                            <Icon className={"iconArea"} name={"i-" + realtime.weather[0]}/>
                        </div>
                    </div>
                    <div className={"bottom"}>{realtime.keyPoint}</div>
                </div>
            </>
        },
        realTimeDetail: () => {
            if(!realtime) return "";
            return <div className={"row realTime-detail"}>
                <div className={"sun"}>
                    <span className={"sunrise"}>
                        <Icon name={"i-richu4"}/>
                        <span className={"content"}>{realtime.sun[0]}</span>
                    </span>
                    <span className={"sunset"}>
                        <Icon name={"i-rila4"}/>
                        <span className={"content"}>{realtime.sun[1]}</span>
                    </span>
                </div>
                <div className={"detailed"}>
                    <div className={"col aqi"}>
                        <Icon name={"i-kongqizhiliang"}/>
                        <span className={"content"}> {realtime.aqi[1]}</span>
                    </div>
                    <div className={"col wind"}>
                        <Icon name={"i-icon-fengsu-"}/>
                        <span className={"content"}> {realtime.windSpeed[1]}</span>
                    </div>
                    <div className={"col windDirection"}>
                        <Icon name={"i-fengxiang"}/>
                        <span className={"content"}>{realtime.windDirection[1]}</span>
                    </div>
                    <div className={"col uv"}>
                        <Icon name={"i-ziwaixian"}/>
                        <span className={"content"}>{realtime.uv[1]}</span>
                    </div>
                    <div className={"col visibility"}>
                        <Icon name={"i-nengjiandu"}/>
                        <span
                            className={"content"}>{realtime.visibility < 1 ? realtime.visibility * 1000 + "m" : realtime.visibility + "km"}</span>
                    </div>
                    <div className={"col humidity"}>
                        <Icon name={"i-shidu"}/>
                        <span className={"content"}>{realtime.humidity}%</span>
                    </div>
                    <div className={"col pres"}>
                        <Icon name={"i-daqiyali"}/>
                        <span className={"content"}>{realtime.airPressure}kpa</span>
                    </div>
                    <div className={"col carWash"}>
                        <Icon name={"i-shuangse-xichefuwu"}/>
                        <span className={"content"}>{realtime.carWashing}</span>
                    </div>
                    <div className={"col cold"}>
                        <Icon name={"i-ganmao"}/>
                        <span className={"content"}>{realtime.coldRisk}</span>
                    </div>
                </div>
            </div>
        },
        recentHours: () => {
            if(!hourly) return "";
            let hours = new Date().getHours();
            let hour48Tag = hourly.map((item, index) => {
                if(index < hours || (index - hours) > 48) return "";//当前时间开始渲染
                let h = index % 24 + ":00";
                if(index === 24){
                    h = "明天"
                }else if(index === 48){
                    h = "后天"
                }else if(index % 24 ===0 && index > 48){
                    let tDate = new Date();
                    tDate.setDate(tDate.getDate() + Math.ceil(index / 24));
                    h = <strong>{(tDate.getMonth() + 1) + "." + tDate.getDate()}</strong>
                }
                return <div className={"day"} key={index}>
                    <div className={""}>{h}</div>
                    <div className={"air ya-greenBorder"}>
                        <span>{item.aqi}</span>
                    </div>
                    <div className={"temp"}>
                        <span>{item.temperature + "°"}</span>
                    </div>
                    <div>
                        <Icon name={"i-" + item.weather[0]}/>
                    </div>
                    <div className={"content sky"}>{item.weather[1]}</div>
                </div>
            });
            return <div className={"row recentDay"}>{hour48Tag}</div>
        },
        recentDays: () => {
            if(!daily) return "";
            let day16Tag = daily.map((item, index) => {
                return <div className={"day"} key={index}>
                    <div className={""}> {getDayName(index)}</div>
                    <div className={"air ya-greenBorder"}>
                        <span>{item.aqi}</span>
                    </div>
                    <div className={"temp"}>
                        <span>{item.temperatureRange[0] + "°~" + item.temperatureRange[1] + "°"}</span>
                    </div>
                    <div>
                        <Icon name={"i-" + item.weather[0]}/>
                    </div>
                    <div className={"content sky"}>{item.weather[1]}</div>
                </div>
            });
            return <div className={"row recentDay"}>{day16Tag}</div>
        },
        airDetail: () => {
            if(!realtime) return "";
            return <div className={"row airDetail"}>
                <div className={"col"}>
                    <Icon name={"i-pmcopy"}/>
                    <span className={"content"}>{realtime.pm25}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-PM"}/>
                    <span className={"content"}>{realtime.pm10}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-chouyang"}/>
                    <span className={"content"}>{realtime.o3}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-eryanghuadan"}/>
                    <span className={"content"}>{realtime.no2}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-eryanghualiu2"}/>
                    <span className={"content"}>{realtime.so2}</span>
                </div>
                <div className={"col"}>
                    <Icon name={"i-yiyanghuatan"}/>
                    <span className={"content"}>{realtime.co}</span>
                </div>
            </div>
        },
        text:() =>{
            if(!realtime) return "";
            return <>
                <span className={"item"}>{realtime.address}</span>
                <span className={"item"}><Icon name={"i-" + realtime.weather[0]}/>{realtime.weather[1]}</span>
                <span className={"item"}>{Math.round(realtime.temperature)}°  {realtime.windDirection[1]}{realtime.windSpeed[1]}</span>
                <span className={"item"}>{realtime.aqi[0]}{realtime.aqi[1]}</span>
            </>
        }
    };

    let loading = <div className={"ya-loading"} hidden={status === 1}>
        <div className="loader3"><span/><span/></div>
    </div>;
    let wContent = ""
    if(props.widget){
        wContent = <div className={"ya-weather-widget"}>
            {loading}
            {pages.warning()}
            {pages.realTimeMin()}
            <div id="container" className="map" ref={containerRef} hidden/>
        </div>
    }else if(props.text){
        wContent = <div className={"ya-weather-text"}>
            {loading}
            {pages.text()}
            <div id="container" className="map" ref={containerRef} hidden/>
        </div>
    }else {
        wContent = <>
            <div className={"ya-weather-app padding0"}>
                {loading}
                <div className={"ya-weather"}>
                    <div className={"widget-container"}>
                        <div className={"ya-weather-widget"}>
                            {pages.warning()}
                            {pages.realTimeMin()}
                            {pages.realTimeDetail()}
                            {pages.recentHours()}
                            {pages.recentDays()}
                            {pages.airDetail()}
                        </div>
                    </div>
                </div>
                <div id="container" className="map" ref={containerRef}/>
            </div>
        </>
    }
    return wContent;
}

export default Weather
