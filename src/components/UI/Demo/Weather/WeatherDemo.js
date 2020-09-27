import React from "react";
import {Weather} from "../../..";

const WeatherDemo = () => {
    const url = "https://yalejian.com/service/weather/getData", jsKey = "3e1573216986096de00822a455a0a852"
    return <>
        <h1>天气</h1>

        <h3>天气文字小部件</h3>
        <div className={"ya-p"}>
            <Weather url={url} jsKey={jsKey} text/>
        </div>

        <h3>天气小部件</h3>
        <div className={"ya-p"}>
            <div className={"ya-shadow width400"}>
                <Weather url={url} jsKey={jsKey} widget/>
            </div>
        </div>

        <h2>天气应用</h2>
        <div className={"ya-p"}>
            <div className={"ya-shadow width360 height800"}>
                <Weather url={url} jsKey={jsKey}/>
            </div>
        </div>
    </>
}
export default WeatherDemo;