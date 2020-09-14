import React, {useState} from "react";
import {Datepicker} from "../../../index";
import {Input} from "../../../index";

const enText = {
    year: "/",
    month: "/",
    day: " ",
    hour: "H",
    m: "M",
    s: "S",
    w: "W",
    monthView: " Mon",
    weeksName: ["Sun", "Mon", "Tur", "Wed", "Thu", "Fir", "Sat"],
}
const DatepickerDemo = () => {

    const [year, set_year] = useState("")
    const [month, set_month] = useState("")
    const [day, set_day] = useState("")
    const [hours, set_hours] = useState("")
    const [minutes, set_minutes] = useState("")

    return <div className={"datepickerDemo"}>
        <h1>日期</h1>
        <h2>默认日期</h2>
        <div className="ya-p">
            <Input type="popUp"
                   value={year + "年" + month + "月" + day + "日 " + hours + ":" + minutes}
                   placeholder={"请选择"}>
                <Datepicker getSelectData={getSelectData.bind(this)}/>
            </Input>
        </div>
        <h2>带周数的日期</h2>
        <div className="ya-p">
            <Input type="popUp"
                   value={year + "年" + month + "月" + day + "日 " + hours + ":" + minutes}
                   placeholder={"请选择"}>
                <Datepicker getSelectData={getSelectData.bind(this)} showWeekNum/>
            </Input>
        </div>
        <h2>带阴历的日期</h2>
        <div className="ya-p">
            <Input type="popUp"
                   value={year + "年" + month + "月" + day + "日 " + hours + ":" + minutes}
                   placeholder={"请选择"}>
                <Datepicker getSelectData={getSelectData.bind(this)} showLunar/>
            </Input>
        </div>
        <h2>月视图多显示前1周、后两周</h2>
        <div className="ya-p">
            <Input type="popUp"
                   value={year + "年" + month + "月" + day + "日 " + hours + ":" + minutes}
                   placeholder={"请选择"}>
                <Datepicker getSelectData={getSelectData.bind(this)} addWeekOfMonthView={[1, 2]}/>
            </Input>
        </div>
        <h2>自定义全部文字</h2>
        <div className="ya-p">
            <Input type="popUp"
                   value={year + "年" + month + "月" + day + "日 " + hours + ":" + minutes}
                   placeholder={"请选择"}>
                <Datepicker getSelectData={getSelectData.bind(this)} text={enText}/>
            </Input>
        </div>
    </div>

    function getSelectData(date) {
        set_year(date.getFullYear());
        set_month(date.getMonth() + 1);
        set_day(date.getDate());
        set_hours(date.getHours());
        set_minutes(date.getMinutes());
    }
}

export default DatepickerDemo;