import React from "react";
import "./datepicker.css";
import Icon from "../utils/Icon";
import Button from "../Button/Button";
import Input from "../Input/Input";
import toLunar from "../utils/sloarToLunar";

/**
 * 日期
 */
class Datepicker extends React.Component {
    static defaultProps = {
        className : "",
        monthIsFill: true,//每月的首位是否填充上月的
        showLunar: false,//是否显示农历
        addWeekOfMonthView: [0, 0],//每月前后多显示几周
        date: new Date(),
        text: {
            year: "年",
            month: "月",
            day: "日",
            hour: "时",
            m: "分",
            s: "秒",
            w: "周",
            weeksName: ["日", "一", "二", "三", "四", "五", "六"],
        },
        getSelectData : ()=>{},//获取选中的日期


    };

    static SELECT_YEAR = 0;
    static YEAR = 1;
    static MONTH = 2;
    static WEEKS = 3;
    static DAY = 4;
    static TIME = 5;
    static ARRAY60 = Array(59).fill(null).map((_, h) => h < 9 ? "0" + (h + 1) : h + 1);
    static ARRAY24 = Array(24).fill(null).map((_, h) => h < 9 ? "0" + (h + 1) : h + 1);

    constructor(props) {
        super(props);
        let date = this.props.date;
        this.state = {
            showType: Datepicker.MONTH,
            selectMilliseconds: date.getMilliseconds(),
            selectSeconds: date.getSeconds(),
            selectMinutes: date.getMinutes(),
            selectHours: date.getHours(),
            selectDay: date.getDate(),
            selectMonth: date.getMonth(),
            selectYear: date.getFullYear(),
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {day} = nextProps;
        // 当传入的type发生变化的时候，更新state
        if (day !== nextProps.day) {
            return {
                day,
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }

    render() {
        let content = {};
        let contentClass = this.props.className;
        switch (this.state.showType) {
            case Datepicker.SELECT_YEAR:
                content = this.view.selectYearsPage(this.state.selectYear);
                contentClass += " selectYear";
                break;
            case Datepicker.YEAR:
                content = this.view.renderYear(this.state.selectYear);
                contentClass += " year";
                break;
            case Datepicker.MONTH :
                content = this.view.renderMonth(this.state.selectMonth, this.state.selectYear);
                contentClass += " month";
                break;
            case Datepicker.WEEKS:
                content = this.view.renderMonth(this.state.selectMonth, this.state.selectYear);
                contentClass += " weeks";
                break;
            case Datepicker.DAY:
                content = "";
                contentClass += " day";
                break;
            case Datepicker.TIME:
                content = "";
                contentClass += " time";
                break;
            default:
                content = "";
                contentClass += " time";
                break;
        }
        return (
            <div className={'ya-datepicker ' + contentClass}>
                <div className={"ya-datepicker-header"}>
                        <span className={"prev"} onClick={this.switch.bind(this, false)}>
                            <Button className="white" content={<Icon name={"i-BAI-zuojiantou"}/>}/>
                        </span>
                    <span className={"selectArea"}>
                            <Button className={"white"} content={<Icon name="i-BAI-wuzi"/>}
                                    onClick={this.data.backToday.bind(this)}/>
                            <Button className={"white"} content={this.state.selectYear + this.props.text.year}
                                    onClick={() => this.data.setState({showType: Datepicker.SELECT_YEAR})}/>
                            <Button className={"white"} content={this.state.selectMonth + 1 + this.props.text.month}
                                    onClick={() => this.data.setState({showType: Datepicker.YEAR})}/>
                            <Button className={"white"} content={this.state.selectDay + this.props.text.day}
                                    onClick={() => this.data.setState({showType: Datepicker.MONTH})}/>
                            <Input className="selectHours" type="select" dropDownBoxData={Datepicker.ARRAY24}
                                   onChange={this.data.setHours.bind(this)}
                                   value={this.state.selectHours < 10 ? "0" + this.state.selectHours : this.state.selectHours} selectIcon={false}/>
                                   :
                            <Input className="selectMinutes" type="select" dropDownBoxData={Datepicker.ARRAY60}
                                   onChange={this.data.setMinutes.bind(this)}
                                   value={this.state.selectMinutes < 10 ? "0" + this.state.selectMinutes : this.state.selectMinutes} selectIcon={false}/>
                        </span>
                    <span className={"next"} onClick={this.switch.bind(this, true)}>
                            <Button className="white" content={<Icon name={"i-BAI-youjiantou"}/>}/>
                        </span>
                </div>
                <div className={"ya-datepicker-content"}>{content}</div>
            </div>
        );
    }

    data = {
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
            let moreWeekViewNum = this.state.showType === Datepicker.MONTH ? this.props.addWeekOfMonthView[0] * 7 : 0;
            for (let day = 1; day <= lastDay.getDate(); day++) {
                let index = fistDay.getDay() + day - 1 + moreWeekViewNum;
                monthData[index] = {};
                monthData[index].date = new Date(year, month, day);
                monthData[index].week = this.data.getWeekOfYear(year, month, day);
                monthData[index].lunar = toLunar(year, month+1, day);
            }
            return monthData;
        },
        setHours: (selectHours) => {
            this.data.setState({selectHours})
        },
        setMinutes: (selectMinutes) => {
            this.data.setState({selectMinutes})
        },
        backToday: () => {
            let nowDate = new Date();
            this.data.setState({
                selectMilliseconds: nowDate.getMilliseconds(),
                selectSeconds: nowDate.getSeconds(),
                selectMinutes: nowDate.getMinutes(),
                selectHours: nowDate.getHours(),
                selectDay: nowDate.getDate(),
                selectMonth: nowDate.getMonth(),
                selectYear: nowDate.getFullYear(),
            })
        },
        setState : (state) => {


            let date = {...this.state};
            if(state["selectYear"]) date["selectYear"] = state["selectYear"];
            if(state["selectMonth"]) date["selectMonth"] = state["selectMonth"];
            if(state["selectDay"]) date["selectDay"] = state["selectDay"];
            if(state["selectHours"]) {
                date["selectHours"] = state["selectHours"];
                state["selectHours"] = Number(state["selectHours"]);
            }
            if(state["selectMinutes"]){
                date["selectMinutes"] = state["selectMinutes"];
                state["selectMinutes"] = Number(state["selectMinutes"]);
            }
            if(state["selectSeconds"]) date["selectSeconds"] = state["selectSeconds"];
            if(state["selectMilliseconds"]) date["selectMilliseconds"] = state["selectMilliseconds"];
            this.props.getSelectData({
                milliseconds: date.selectMilliseconds,
                seconds: date.selectSeconds,
                minutes: date.selectMinutes,
                hours: date.selectHours,
                day: date.selectDay,
                month: date.selectMonth + 1,
                year: date.selectYear,
            });

            this.setState(state);
        }
    };


    //视图
    view = {
        //选择年的视图
        selectYearsPage: (year) => {
            let years = [];
            for (let i = year - 12; i < year + 13; i++) {
                years.push(<div className={"ya-datepicker-year" + (this.state.selectYear === i ? " selected" : "")}
                                onClick={() => this.data.setState({selectYear: i, showType: Datepicker.MONTH})}
                                key={"selectYear" + i}><Button className="white" content={i}/></div>)
            }
            return years
        },
        //年视图
        renderYear: (year) => {
            let yearTag = [];
            for (let month = 0; month < 12; month++) {
                yearTag.push(<div className={"ya-datepicker-month"} key={month}>
                    <div className={"ya-datepicker-month-title"}
                         onClick={() => this.data.setState({selectMonth: month, showType: Datepicker.MONTH})}>
                        <Button className={"white"} content={(month + 1) + this.props.text.month}/>
                    </div>
                    {this.view.renderMonth(month, year)}
                </div>);
            }
            return yearTag;
        },
        //月视图
        renderMonth: (month, year) => {
            let daysTag = [];
            let beforeWeekNum = this.state.showType === Datepicker.MONTH ? this.props.addWeekOfMonthView[0] : 0;
            let afterWeekNum = this.state.showType === Datepicker.MONTH ? this.props.addWeekOfMonthView[1] : 0;
            let monthData = this.data.getMonthList(month, year);
            let weeksPerMonth = 5 + beforeWeekNum + afterWeekNum;

            //周名称头部
            if (this.state.showType === Datepicker.MONTH || this.state.showType === Datepicker.WEEKS) daysTag.push(this.view.getWeeksHead());

            //循环每周
            for (let week = 0; week < weeksPerMonth; week++) {
                let daysTags = [], hideWeek = " hide";
                //循环一周的每天
                for (let day = 0; day < 7; day++) {
                    let index = week * 7 + day;
                    let item = monthData[index];
                    daysTags.push(this.view.renderDay(month, year, item, week, day, index));

                    //判断当前选中的天是否是当前循环中的周
                    if (this.state.showType === Datepicker.WEEKS) {
                        if (item && item.date && item.date.getDate() === this.state.selectDay) {
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
            if (this.state.showType === Datepicker.WEEKS || this.state.showType === Datepicker.MONTH) daysTag.push(this.view.showWeekBtn(false));
            return daysTag;
        },
        //日视图
        renderDay: (month, year, item, week, whatDay, index) => {
            let beforeWeekNum = this.state.showType === Datepicker.MONTH ? this.props.addWeekOfMonthView[0] : 0;
            let fistDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);
            let dayClass = "ya-datepicker-day";
            if (item === undefined || item === null) {
                //补全当月前后缺失的部分
                item = {};
                if (this.props.monthIsFill && this.state.showType !== Datepicker.YEAR) {
                    //补全天
                    if (week < beforeWeekNum + 2) {
                        //前
                        let fillDay = -fistDay.getDay() + whatDay + 1 - (beforeWeekNum - week) * 7;
                        item.date = new Date(year, month, fillDay);
                        item.week = this.data.getWeekOfYear(year, month, fillDay);
                        item.lunar = toLunar(year, month + 1, fillDay);
                    } else if (week > beforeWeekNum + 2) {
                        //后
                        let lastWeekLeftDay = whatDay - lastDay.getDay();
                        let fillDay = lastWeekLeftDay + (week - 4 - beforeWeekNum) * 7;

                        //fillDay小于等于零时，只会在闰年2月刚好排满四周的情况，此时多补一周
                        if(fillDay <=0) fillDay += 7;
                        item.date = new Date(year, month + 1, fillDay);
                        item.week = this.data.getWeekOfYear(year, month + 1, fillDay);
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
                if (this.state.selectDay === date.getDate() && this.state.selectMonth === date.getMonth() && this.state.selectYear === date.getFullYear()) {
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
            if (whatDay === 0 && (this.state.showType === Datepicker.MONTH || this.state.showType === Datepicker.WEEKS)) {
                weekNumTag = <span className={"weekNum"} key={"weekNum" + index}>{item.week}</span>
            }

            //农历
            let dayText = "", lunarDay = "";
            if (JSON.stringify(item) !== "{}" && item && item.date) {
                let lunar = item.lunar;
                dayText = item.date.getDate();
                lunarDay = lunar.lunarDay;
                if(lunar.lunarDay === "初一") lunarDay = lunar.lunarMonth + "月";
            }

            return <React.Fragment key={index}>
                {weekNumTag}
                <div className={dayClass} onClick={this.dayClick.bind(this, item)}>
                    <div className={"dayText"}>{dayText}</div>
                    {this.props.showLunar && this.state.showType === Datepicker.MONTH ?
                        <div className={"lunarDay"}>{lunarDay}</div> : ""}
                </div>
            </React.Fragment>;
        },
        //获取周名称头部
        getWeeksHead: () => {
            let weeksName = this.props.text.weeksName;
            let weeksNameTag = [];
            for (let i in weeksName) {
                if (weeksName.hasOwnProperty(i)) {
                    weeksNameTag.push(<span className="name" key={"weekName" + i}>{weeksName[i]}</span>)
                }
            }
            return <div className={"ya-datepicker-weekNames"} key={"weekNames"}>
                <div className={"weekTitle"}>{this.props.text.w}</div>
                {weeksNameTag}</div>;
        },
        //周视图切换按钮
        showWeekBtn: () => {
            let isShow = this.state.showType === Datepicker.WEEKS;
            let showType = isShow ? Datepicker.MONTH : Datepicker.WEEKS;
            return <div className={"ya-showWeekView"} key={"ya-showWeekView"} onClick={() => this.data.setState({showType})}>
                <Button className="white adaptive" content={<Icon name={"i-Group-" + (isShow ? "1" : "")}/>}/>
            </div>;
        }
    };

    //上下翻页,true下一页，false上一页
    switch(type) {
        let selectDay = this.state.selectDay;
        let selectMonth = this.state.selectMonth;
        let selectYear = this.state.selectYear;
        let lastDay = new Date(selectYear, selectMonth + 1, 0);
        let prevLastDay = new Date(selectYear, selectMonth, 0);
        if (this.state.showType === Datepicker.WEEKS) {
            if (type) {
                if (selectDay > lastDay.getDate() - 7) {
                    selectMonth += 1;
                    selectDay = 7 - lastDay.getDay();
                } else {
                    selectDay += 7;
                }
            } else {
                if (selectDay < 7) {
                    selectMonth -= 1;
                    selectDay = selectDay - 7 + prevLastDay.getDate();
                } else {
                    selectDay -= 7;
                }
            }
        } else if (this.state.showType === Datepicker.MONTH) {
            if (type) {
                selectMonth += 1;
                if (selectMonth > 11) {
                    selectYear += 1;
                    selectMonth = selectMonth - 12;
                }
            } else {
                selectMonth -= 1;
                //1月是0
                if (selectMonth < 0) {
                    selectYear -= 1;
                    selectMonth = 12 + selectMonth;
                }
            }
        } else if (this.state.showType === Datepicker.YEAR) {
            if (type) {
                selectYear += 1;
            } else {
                selectYear -= 1;
            }
        } else if (this.state.showType === Datepicker.SELECT_YEAR) {
            if (type) {
                selectYear += 25;
            } else {
                selectYear -= 25;
            }
        }
        this.data.setState({selectDay, selectMonth, selectYear});
    }

    //天数字点击
    dayClick = (item) => {
        if (item && item.date) {
            this.data.setState({selectMonth: item.date.getMonth(), selectDay: item.date.getDate()});
        }
    };

}

export default Datepicker;