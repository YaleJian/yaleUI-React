import React, {useEffect, useState} from "react";
import {Datepicker, getNavData, Tree} from "../../../index";
import {Input} from "../../../index";
import {TimePicker} from "../../../func/Datepicker/Datepicker";

const enText = {
    year: "/",
    month: "/",
    day: " ",
    hour: "H",
    m: "M",
    s: "S",
    w: "wn",
    monthView: " Mon",
    weeksName: ["Sun", "Mon", "Tur", "Wed", "Thu", "Fir", "Sat"],
}
const DatepickerDemo = () => {

    //加载右侧目录
    const [loading, setLoading] = useState(true);
    const [navData, setNavData] = useState([]);
    useEffect(() => {
        if (loading) {
            setNavData(getNavData())
            setLoading(false)
        }
    },[loading])

    const [year, set_year] = useState("")
    const [month, set_month] = useState("")
    const [day, set_day] = useState("")
    const [hours, set_hours] = useState("")
    const [minutes, set_minutes] = useState("")

    return <div className={"datepickerDemo"}>
        <Tree treeData={navData}
              treeType={3}
              openBtn={false}
              openLevel={"all"}
        />
        <h1>日期</h1>
        <h2 className="ya-title">展示方式</h2>
        <div className="ya-p">
            <h3 className="ya-title">月视图（默认的）</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)}/>
            <h3 className="ya-title">周视图</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showType={1}/>
            <h3 className="ya-title">年视图</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showType={2}/>
            <h3 className="ya-title">选择年份视图</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showType={3}/>
            <h3 className="ya-title">选择时间</h3>
            <TimePicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)}/>
        </div>

        <h2 className="ya-title">可选配置</h2>
        <div className="ya-p">
            <h3 className="ya-title">不补全周</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} monthIsFill={false}/>
            <h3 className="ya-title">带周数的</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showWeekNum/>
            <h3 className="ya-title">带阴历的</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showLunar/>
            <h3 className="ya-title">月视图多显示前1周、后两周</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} addWeekOfMonthView={[1, 2]}/>
            <h3 className="ya-title">带周视图按钮</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showWeekBtn/>
            <h3 className="ya-title">带时间选择的</h3>
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} showTime/>
        </div>

        <h2 className="ya-title">和选择框组合使用</h2>
        <div className="ya-p">
            <Input type="popUp"
                   value={year + "年" + month + "月" + day + "日 " + hours + ":" + minutes}
                   placeholder={"请选择"}>
                <Datepicker getSelectData={getSelectData.bind(this)}/>
            </Input>
        </div>

        <h2 className="ya-title">自定义全部文字</h2>
        <div className="ya-p">
            <Datepicker className={"ya-shadow"} getSelectData={getSelectData.bind(this)} text={enText} showWeekNum
                        showWeekBtn showTime addWeekOfMonthView={[1, 1]}/>
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