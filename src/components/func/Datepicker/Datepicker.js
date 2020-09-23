import React, {useState} from "react";
import "./datepicker.css";
import {Button} from "../../index";
import {Input} from "../../index";
import {toLunar} from "../../index";

/**
 * 日期
 */
const Datepicker = (props) => {

    let monthIsFill = props.monthIsFill === undefined ? true : props.monthIsFill;//每月的首位是否填充上月的
    let showLunar = props.showLunar || false;//是否显示农历
    let showWeekNum = props.showWeekNum || false;//是否显示周数
    let showWeekBtn = props.showWeekBtn || false;//是否显示周数
    let showTime = props.showTime || false;//是否显示时间
    let addWeekOfMonthView = props.addWeekOfMonthView || [0, 0];//每月前后多显示几周
    let text = props.text || {
        year: "年",
        month: "月",
        day: "日",
        hour: "时",
        m: "分",
        s: "秒",
        w: "周",
        monthView: "月",
        weeksName: ["日", "一", "二", "三", "四", "五", "六"],
    }

    const MONTH = 0;
    const WEEKS = 1;
    const YEAR = 2;
    const SELECT_YEAR = 3;
    const TIME = 4;
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
        //计算当前月份date对象的集合，按照月份视图的星期几入位数组
        getMonthDates: (month, year, leaveSpaceOfWeek) => {
            //当前月份的第一天和最后一天
            let fistDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);
            let monthData = [];
            //当前月份每天的date对象集合,根据第一天星期几放第几位
            for (let day = 1; day <= lastDay.getDate(); day++) {
                let index = fistDay.getDay() + day - 1 + (leaveSpaceOfWeek || 0) * 7;//加leaveSpaceOfWeek是为了向前预留几周的空位
                monthData[index] = {};
                monthData[index].date = new Date(year, month, day);
                monthData[index].week = data.getWeekOfYear(year, month, day);
                monthData[index].lunar = toLunar(year, month + 1, day);
            }
            return monthData;
        },
        //补全月份Date对象集合中，非当前月的天数据
        fillData: (dayDate, whatDay, weekIndex, month, year) => {
            let beforeWeekNum = showType === MONTH ? addWeekOfMonthView[0] : 0;
            let fistDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);
            if (weekIndex < beforeWeekNum + 2) {
                //前
                let fillDay = -fistDay.getDay() + whatDay + 1 - (beforeWeekNum - weekIndex) * 7;
                dayDate.date = new Date(year, month, fillDay);
                dayDate.week = data.getWeekOfYear(year, month, fillDay);
                dayDate.lunar = toLunar(year, month + 1, fillDay);
            } else if (weekIndex > beforeWeekNum + 2) {
                //后
                let lastWeekLeftDay = whatDay - lastDay.getDay();
                let fillDay = lastWeekLeftDay + (weekIndex - 4 - beforeWeekNum) * 7;

                //fillDay小于等于零时，只会在闰年2月刚好排满四周的情况，此时多补一周
                if (fillDay <= 0) fillDay += 7;
                dayDate.date = new Date(year, month + 1, fillDay);
                dayDate.week = data.getWeekOfYear(year, month + 1, fillDay);
                dayDate.lunar = toLunar(year, month + 1 + 1, fillDay);
            }
        },
        //更新选中的Date
        setState: (day, month, year, h, m, s) => {
            let newDate = new Date(year || selectDate.getFullYear(), month || selectDate.getMonth(), day || selectDate.getDate());
            if (h) {
                newDate.setHours(Number(h));
            } else {
                newDate.setHours(selectDate.getHours());
            }
            if (m) {
                newDate.setMinutes(Number(m));
            } else {
                newDate.setMinutes(selectDate.getMinutes());
            }
            if (s) {
                newDate.setSeconds(Number(s));
            } else {
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
                        <Button>{(month + 1) + text.monthView}</Button>
                    </div>
                    {view.renderMonth(month, year)}
                </div>);
            }
            return yearTag;
        },
        //月
        renderMonth: (month, year) => {
            let monthTag = [];
            let beforeWeekNum = showType === MONTH ? addWeekOfMonthView[0] : 0;
            let afterWeekNum = showType === MONTH ? addWeekOfMonthView[1] : 0;
            let monthDates = data.getMonthDates(month, year, beforeWeekNum);//获取这个月的所有Date对象(数组前后会存在空值，按星期几入位置)

            //周数名称(月视图、周视图使用)
            if (showType === MONTH || showType === WEEKS) monthTag.push(view.getWeeksHead());

            //循环当前月视图要展示的所有周（包含上个月、下个月的周部分)，默认每个月展示5周
            let weeksLength = 5 + beforeWeekNum + afterWeekNum;
            for (let i = 0; i < weeksLength; i++) {
                monthTag.push(view.renderWeek(monthDates, i, month, year));
            }

            //周视图按钮
            if (showWeekBtn && (showType === WEEKS || showType === MONTH)) monthTag.push(view.showWeekBtn(false));
            return monthTag;
        },
        //周
        renderWeek: (monthDates, weekIndex, month, year) => {
            let weekTag = [], hideWeek = " hide";
            //循环一周的每天
            for (let day = 0; day < 7; day++) {
                let dayIndex = weekIndex * 7 + day;
                let dayDate = monthDates[dayIndex];
                weekTag.push(view.renderDay(dayDate, weekIndex, dayIndex, month, year, day));

                //判断当前选中的天是否是当前循环中的周
                if (showType === WEEKS) {
                    if (dayDate && dayDate.date && dayDate.date.getDate() === selectDate.getDate()) {
                        hideWeek = "";
                    }
                } else {
                    hideWeek = "";
                }
            }
            return <div className={"ya-datepicker-weeks" + hideWeek} key={"ya-datepicker-weeks" + weekIndex}>
                {weekTag}
            </div>;
        },
        //日
        renderDay: (dayDate, weekIndex, dayIndex, month, year, whatDay) => {
            let dayClass = "ya-datepicker-day";
            if (dayDate === undefined || dayDate === null) {
                //补全当月前后缺失的部分
                dayDate = {};
                if (monthIsFill && (showType === MONTH || showType === WEEKS)) {
                    //补全天数据
                    data.fillData(dayDate, whatDay, weekIndex, month, year)
                    dayClass += " otherMonth";
                } else {
                    dayClass += " noDay";
                }
            } else {
                let date = dayDate.date;
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
            if (whatDay === 0 && (showType === MONTH || showType === WEEKS) && showWeekNum) {
                weekNumTag = <span className={"weekNum"} key={"weekNum" + dayIndex}>{dayDate.week}</span>
            }

            //公历、农历文字
            let dayText = "", lunarTag = "";
            if (JSON.stringify(dayDate) !== "{}" && dayDate && dayDate.date) {
                //仅当月
                dayText = dayDate.date.getDate();

                //仅打开农历开关、月、周视图时
                if (showLunar && (showType === MONTH || showType === WEEKS)) {
                    let lunarText = dayDate.lunar.lunarDay;
                    if (lunarText === "初一") lunarText = dayDate.lunar.lunarMonth + "月";
                    lunarTag = <div className={"lunarDay"}>{lunarText}</div>;
                }
            }

            return <React.Fragment key={dayIndex}>
                {weekNumTag}
                <div className={dayClass} onClick={dayClick.bind(this, dayDate)}>
                    <div className={"dayText"}>{dayText}</div>
                    {lunarTag}
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
                {showWeekNum ? <div className={"weekTitle"}>{text.w}</div> : ""}
                {weeksNameTag}
            </div>;
        },
        //周视图切换按钮
        showWeekBtn: () => {
            return <Button icon={"i-Group-" + (showType === WEEKS ? "1" : "")} className={"ya-showWeekView"} adaptive
                           key={"ya-showWeekView"}
                           onClick={() => set_showType(showType === WEEKS ? MONTH : WEEKS)}/>;
        },
        //时间选择框
        time: () => {
            if (!showTime && showType !== TIME) return;
            return <>
                <Input type="select" className="selectHours" dropDownBoxData={ARRAY24}
                       onChange={hours => data.setState(false, false, false, hours)}
                       value={selectHours}
                       selectIcon={false}/>
                :
                <Input type="select" className="selectMinutes" dropDownBoxData={ARRAY60}
                       onChange={m => data.setState(false, false, false, false, m)}
                       value={selectMinutes}
                       selectIcon={false}/>
            </>;
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
        if (item && item.date) data.setState(item.date.getDate(), item.date.getMonth(), item.date.getFullYear());
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
    }

    let selectHours = selectDate.getHours() < 10 ? ("0" + selectDate.getHours()) : selectDate.getHours();
    let selectMinutes = selectDate.getMinutes() < 10 ? ("0" + selectDate.getMinutes()) : selectDate.getMinutes();

    let returnTags = <div/>;
    if (showType === TIME) {
        //时间选择器
        returnTags = <div className={'ya-timePicker ' + contentClass}>{view.time()}</div>;
    } else {
        //日期选择器
        returnTags = <div className={'ya-datepicker ' + contentClass}>
            <div className={"ya-datepicker-header"}>
                <Button icon={"i-BAI-zuojiantou"} className={"prev"} onClick={changePage.bind(this, false)}/>
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
                    {view.time()}
                </span>
                <Button icon={"i-BAI-youjiantou"} className={"next"} onClick={changePage.bind(this, true)}/>
            </div>
            <div className={"ya-datepicker-content"}>{content}</div>
        </div>
    }
    return returnTags;

}
const TimePicker = (props) => {
    return <Datepicker showType={4} getSelectData={props.getSelectData} className={props.className}/>
}
export {Datepicker, TimePicker};