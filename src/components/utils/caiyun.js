import {dataUtils} from "./dataUtils";
let dataConvert = {
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

let caiYunData = (weatherData) => {
    let r = weatherData.result.realtime;
    let h = weatherData.result.hourly;
    let d = weatherData.result.daily;
    let nowDate = new Date();
    let time = nowDate.getHours() + ":" + nowDate.getMinutes();
    let hourly=[],daily=[];
    let realtime = {
        updateTime: time,
        weatherData,
        keyPoint: weatherData.result.forecast_keypoint,//分钟级分析关键句
        trend: h.description,//小时级分析
        weather: [r.skycon, dataConvert.skyCon[r.skycon]],
        apparentTemperature: Math.round(r.apparent_temperature),//体感温度
        temperature: Math.round(r.temperature),//温度
        windSpeed: [Math.round(r.wind.speed), dataConvert.windSpeed(r.wind.speed)],//风速
        windDirection: [r.wind.direction, dataConvert.direction(r.wind.direction)],//风向
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
        warning: weatherData.result.alert.content.length > 0 ? [dataConvert.warning(weatherData.result.alert.content), weatherData.result.alert.content] : false,
        carWashing: d.life_index.carWashing[0].desc,
        coldRisk: d.life_index.coldRisk[0].desc,
    };

    //360小时天气
    for (let i = 0; i < 360; i++) {
        hourly.push({
            weather: [h.skycon[i].value, dataConvert.skyCon[h.skycon[i].value]],
            temperature: Math.round(h.temperature[i].value),
            aqi: Math.round(h.air_quality.aqi[i].value.chn),
        });
    }

    //16天预报 + 昨天
    for (let i = 0; i < 16; i++) {
        daily.push({
            weather: [d.skycon[i].value, dataConvert.skyCon[d.skycon[i].value]],
            temperatureRange: [Math.round(d.temperature[i].min), Math.round(d.temperature[i].max)],
            aqi: Math.round(d.air_quality.aqi[i].avg.chn),
        });
    }
    return {realtime,hourly, daily}
}
export {caiYunData}