import React, {useState} from "react";
import "./datepicker.css";
import {Button} from "..";
import {Input} from "..";
import {toLunar} from "..";

/**
 * 日期
 */
const Datepicker = (props) => {

    let monthIsFill = props.monthIsFill || true;//每月的首位是否填充上月的
    let showLunar = props.showLunar || false;//是否显示农历
    let addWeekOfMonthView = props.addWeekOfMonthView || [0, 0];//每月前后多显示几周
    let text = {
        year: "年",
        month: "月",
        day: "日",
        hour: "时",
        m: "分",
        s: "秒",
        w: "周",
        weeksName: ["日", "一", "二", "三", "四", "五", "六"],
    }

    const SELECT_YEAR = 0;
    const YEAR = 1;
    const MONTH = 2;
    const WEEKS = 3;
    const DAY = 4;
    const TIME = 5;
    const ARRAY60 = Array(59).fill(null).map((_, h) => h < 9 ? "0" + (h + 1) : h + 1);
    const ARRAY24 = Array(24).fill(null).map((_, h) => h < 9 ? "0" + (h + 1) : h + 1);

    const [showType, set_showType] = useState(props.showType || MONTH);
    const [selectDate, set_selectDate] = useState(props.date || new Date());

    let data = {
        //获取今天是第几周
        getWeekOfYear: (year, month, day) => {
            let thisDate = new Date(year, month, day),
                january = new Date(year, 0, 1),
                d = Math.round((thisDate.valueOf() - january.valueOf()) / 86400000);
            return Math.ceil((d + ((january.getDay() + 1) - 1)) / 7);
        },
        //计算当前月份date对象的集合
        getMonthList: (month, year) => {
            //当前月份的第一天和最后一天
            let fistDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);
            let monthData = [];
            //当前月份每天的date对象集合,根据第一天星期几放第几位
            let moreWeekViewNum = showType === MONTH ? addWeekOfMonthView[0] * 7 : 0;
            for (let day = 1; day <= lastDay.getDate(); day++) {
                let index = fistDay.getDay() + day - 1 + moreWeekViewNum;
                monthData[index] = {};
                monthData[index].date = new Date(year, month, day);
                monthData[index].week = data.getWeekOfYear(year, month, day);
                monthData[index].lunar = toLunar(year, month + 1, day);
            }
            return monthData;
        },
        setState: (day, month, year, h, m, s) => {
            let newDate = new Date(year || selectDate.getFullYear(), month || selectDate.getMonth(), day || selectDate.getDate());
            if(h) {
                newDate.setHours(Number(h));
            }else {
                newDate.setHours(selectDate.getHours());
            }
            if(m){
                newDate.setMinutes(Number(m));
            }else {
                newDate.setMinutes(selectDate.getMinutes());
            }
            if(s){
                newDate.setSeconds(Number(s));
            }else {
                newDate.setSeconds(selectDate.getHours());
            }
            set_selectDate(newDate);
            props.getSelectData(newDate);
        }
    };


    //视图
    let view = {
        //选择年的视图
        yearsPage: () => {
            let years = [], year = selectDate.getFullYear();
            for (let i = year - 12; i < year + 13; i++) {
                years.push(<div className={"ya-datepicker-year" + (year === i ? " selected" : "")}
                                onClick={() => {
                                    data.setState(false, false, i);
                                    set_showType(MONTH)
                                }}
                                key={"year" + i}><Button className="white">{i}</Button></div>)
            }
            return years;
        },
        //年视图
        renderYear: () => {
            let yearTag = [], year = selectDate.getFullYear();
            for (let month = 0; month < 12; month++) {
                yearTag.push(<div className={"ya-datepicker-month"} key={month}>
                    <div className={"ya-datepicker-month-title"}
                         onClick={() => {
                             data.setState(false, month);
                             set_showType(MONTH)
                         }}>
                        <Button>{(month + 1) + text.month}</Button>
                    </div>
                    {view.renderMonth(month, year)}
                </div>);
            }
            return yearTag;
        },
        //月、周视图
        renderMonth: (month, year) => {
            let daysTag = [];
            let beforeWeekNum = showType === MONTH ? addWeekOfMonthView[0] : 0;
            let afterWeekNum = showType === MONTH ? addWeekOfMonthView[1] : 0;
            let monthData = data.getMonthList(month, year);
            let weeksPerMonth = 5 + beforeWeekNum + afterWeekNum;

            //周名称头部
            if (showType === MONTH || showType === WEEKS) daysTag.push(view.getWeeksHead());

            //循环每周
            for (let week = 0; week < weeksPerMonth; week++) {
                let daysTags = [], hideWeek = " hide";
                //循环一周的每天
                for (let day = 0; day < 7; day++) {
                    let index = week * 7 + day;
                    let item = monthData[index];
                    daysTags.push(view.renderDay(month, year, item, week, day, index));

                    //判断当前选中的天是否是当前循环中的周
                    if (showType === WEEKS) {
                        if (item && item.date && item.date.getDate() === selectDate.getDate()) {
                            hideWeek = "";
                        }
                    } else {
                        hideWeek = "";
                    }
                }

                daysTag.push(<div className={"ya-datepicker-weeks" + hideWeek} key={"ya-datepicker-weeks" + week}>
                    {daysTags}
                </div>);
            }

            //周视图按钮
            if (showType === WEEKS || showType === MONTH) daysTag.push(view.showWeekBtn(false));
            return daysTag;
        },
        //每天
        renderDay: (month, year, item, week, whatDay, index) => {
            let beforeWeekNum = showType === MONTH ? addWeekOfMonthView[0] : 0;
            let fistDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);
            let dayClass = "ya-datepicker-day";
            if (item === undefined || item === null) {
                //补全当月前后缺失的部分
                item = {};
                if (monthIsFill && showType !== YEAR) {
                    //补全天
                    if (week < beforeWeekNum + 2) {
                        //前
                        let fillDay = -fistDay.getDay() + whatDay + 1 - (beforeWeekNum - week) * 7;
                        item.date = new Date(year, month, fillDay);
                        item.week = data.getWeekOfYear(year, month, fillDay);
                        item.lunar = toLunar(year, month + 1, fillDay);
                    } else if (week > beforeWeekNum + 2) {
                        //后
                        let lastWeekLeftDay = whatDay - lastDay.getDay();
                        let fillDay = lastWeekLeftDay + (week - 4 - beforeWeekNum) * 7;

                        //fillDay小于等于零时，只会在闰年2月刚好排满四周的情况，此时多补一周
                        if (fillDay <= 0) fillDay += 7;
                        item.date = new Date(year, month + 1, fillDay);
                        item.week = data.getWeekOfYear(year, month + 1, fillDay);
                        item.lunar = toLunar(year, month + 1 + 1, fillDay);
                    }
                    dayClass += " otherMonth";
                } else {
                    dayClass += " noDay";
                }
            } else {
                let date = item.date;
                let isSat = date.getDay() === 6;
                let isSun = date.getDay() === 0;
                dayClass += (isSat ? " saturday" : "");
                dayClass += (isSun ? " sunday" : "");

                //选中
                if (selectDate.getDate() === date.getDate() && selectDate.getMonth() === date.getMonth() && selectDate.getFullYear() === date.getFullYear()) {
                    dayClass += " selected";
                }

                //今日
                let nowDate = new Date();
                if (nowDate.getDate() === date.getDate() && nowDate.getMonth() === date.getMonth() && nowDate.getFullYear() === date.getFullYear()) {
                    dayClass += " nowDate";
                }

            }
            //周数
            let weekNumTag = "";
            if (whatDay === 0 && (showType === MONTH || showType === WEEKS)) {
                weekNumTag = <span className={"weekNum"} key={"weekNum" + index}>{item.week}</span>
            }

            //农历
            let dayText = "", lunarDay = "";
            if (JSON.stringify(item) !== "{}" && item && item.date) {
                let lunar = item.lunar;
                dayText = item.date.getDate();
                lunarDay = lunar.lunarDay;
                if (lunar.lunarDay === "初一") lunarDay = lunar.lunarMonth + "月";
            }

            return <React.Fragment key={index}>
                {weekNumTag}
                <div className={dayClass} onClick={dayClick.bind(this, item)}>
                    <div className={"dayText"}>{dayText}</div>
                    {showLunar && showType === MONTH ?
                        <div className={"lunarDay"}>{lunarDay}</div> : ""}
                </div>
            </React.Fragment>;
        },
        //获取周名称头部
        getWeeksHead: () => {
            let weeksName = text.weeksName;
            let weeksNameTag = [];
            for (let i in weeksName) {
                if (weeksName.hasOwnProperty(i)) {
                    weeksNameTag.push(<span className="name" key={"weekName" + i}>{weeksName[i]}</span>)
                }
            }
            return <div className={"ya-datepicker-weekNames"} key={"weekNames"}>
                <div className={"weekTitle"}>{text.w}</div>
                {weeksNameTag}</div>;
        },
        //周视图切换按钮
        showWeekBtn: () => {
            return <div className={"ya-showWeekView"} key={"ya-showWeekView"}
                        onClick={() => set_showType(showType === WEEKS ? MONTH : WEEKS)}>
                <Button icon={"i-Group-" + (showType === WEEKS ? "1" : "")} adaptive/>
            </div>;
        }
    };

    //上下翻页,true下一页，false上一页
    let changePage = (type) => {
        let day = selectDate.getDate();
        let month = selectDate.getMonth();
        let year = selectDate.getFullYear();
        let lastDay = new Date(year, month + 1, 0);
        let prevLastDay = new Date(year, month, 0);
        if (showType === WEEKS) {
            if (type) {
                if (day > lastDay.getDate() - 7) {
                    month += 1;
                    day = 7 - lastDay.getDay();
                } else {
                    day += 7;
                }
            } else {
                if (day < 7) {
                    month -= 1;
                    day = day - 7 + prevLastDay.getDate();
                } else {
                    day -= 7;
                }
            }
        } else if (showType === MONTH) {
            if (type) {
                month += 1;
                if (month > 11) {
                    year += 1;
                    month = month - 12;
                }
            } else {
                month -= 1;
                //1月是0
                if (month < 0) {
                    year -= 1;
                    month = 12 + month;
                }
            }
        } else if (showType === YEAR) {
            if (type) {
                year += 1;
            } else {
                year -= 1;
            }
        } else if (showType === SELECT_YEAR) {
            if (type) {
                year += 25;
            } else {
                year -= 25;
            }
        }
        data.setState(day, month, year);
    }

    //天数字点击
    let dayClick = (item) => {
        if (item && item.date) data.setState(item.date.getDate(), item.date.getMonth());
    };

    let content;
    let contentClass = props.className || "";
    switch (showType) {
        case SELECT_YEAR:
            content = view.yearsPage();
            contentClass += " selectYear";
            break;
        case YEAR:
            content = view.renderYear();
            contentClass += " year";
            break;
        case MONTH :
            content = view.renderMonth(selectDate.getMonth(), selectDate.getFullYear());
            contentClass += " month";
            break;
        case WEEKS:
            content = view.renderMonth(selectDate.getMonth(), selectDate.getFullYear());
            contentClass += " weeks";
            break;
        case DAY:
            content = "";
            contentClass += " day";
            break;
        case TIME:
            content = "";
            contentClass += " time";
            break;
        default:
            content = "";
            contentClass += " time";
            break;
    }
    let selectHours = selectDate.getHours() < 10 ? ("0" + selectDate.getHours() ): selectDate.getHours();
    let selectMinutes = selectDate.getMinutes() < 10 ? ("0" + selectDate.getMinutes()) : selectDate.getMinutes();
    return (
        <div className={'ya-datepicker ' + contentClass}>
            <div className={"ya-datepicker-header"}>
                        <span className={"prev"} onClick={changePage.bind(this, false)}>
                            <Button icon={"i-BAI-zuojiantou"}/>
                        </span>
                <span className={"selectArea"}>
                        <Button icon={"i-BAI-wuzi"} onClick={() => {
                            set_selectDate(new Date())
                        }}/>
                        <Button onClick={() => set_showType(SELECT_YEAR)}>
                            {selectDate.getFullYear() + text.year}
                        </Button>
                        <Button onClick={() => set_showType(YEAR)}>
                            {selectDate.getMonth() + 1 + text.month}
                        </Button>
                        <Button onClick={() => set_showType(MONTH)}>
                            {selectDate.getDate() + text.day}
                        </Button>
                            <Input type="select" className="selectHours" dropDownBoxData={ARRAY24}
                                   onChange={hours => data.setState(false, false, false, hours)}
                                   value={selectHours}
                                   selectIcon={false}/>
                                   :
                            <Input type="select" className="selectMinutes" dropDownBoxData={ARRAY60}
                                   onChange={m => data.setState(false, false, false, false, m)}
                                   value={selectMinutes}
                                   selectIcon={false}/>
                        </span>
                <span className={"next"} onClick={changePage.bind(this, true)}>
                        <Button icon={"i-BAI-youjiantou"}/>
                    </span>
            </div>
            <div className={"ya-datepicker-content"}>{content}</div>
        </div>
    );

}

export {Datepicker};