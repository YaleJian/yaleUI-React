"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Datepicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./datepicker.css");

var _2 = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 日期
 */
var Datepicker = function (_React$Component) {
    _inherits(Datepicker, _React$Component);

    function Datepicker(props) {
        _classCallCheck(this, Datepicker);

        var _this = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, props));

        _initialiseProps.call(_this);

        var date = _this.props.date;
        _this.state = {
            showType: Datepicker.MONTH,
            selectMilliseconds: date.getMilliseconds(),
            selectSeconds: date.getSeconds(),
            selectMinutes: date.getMinutes(),
            selectHours: date.getHours(),
            selectDay: date.getDate(),
            selectMonth: date.getMonth(),
            selectYear: date.getFullYear()
        };
        return _this;
    }

    _createClass(Datepicker, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var content = {};
            var contentClass = this.props.className;
            switch (this.state.showType) {
                case Datepicker.SELECT_YEAR:
                    content = this.view.selectYearsPage(this.state.selectYear);
                    contentClass += " selectYear";
                    break;
                case Datepicker.YEAR:
                    content = this.view.renderYear(this.state.selectYear);
                    contentClass += " year";
                    break;
                case Datepicker.MONTH:
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
            return _react2.default.createElement(
                "div",
                { className: 'ya-datepicker ' + contentClass },
                _react2.default.createElement(
                    "div",
                    { className: "ya-datepicker-header" },
                    _react2.default.createElement(
                        "span",
                        { className: "prev", onClick: this.switch.bind(this, false) },
                        _react2.default.createElement(_2.Button, { className: "white", content: _react2.default.createElement(_2.Icon, { name: "i-BAI-zuojiantou" }) })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "selectArea" },
                        _react2.default.createElement(_2.Button, { className: "white", content: _react2.default.createElement(_2.Icon, { name: "i-BAI-wuzi" }),
                            onClick: this.data.backToday.bind(this) }),
                        _react2.default.createElement(_2.Button, { className: "white", content: this.state.selectYear + this.props.text.year,
                            onClick: function onClick() {
                                return _this2.data.setState({ showType: Datepicker.SELECT_YEAR });
                            } }),
                        _react2.default.createElement(_2.Button, { className: "white", content: this.state.selectMonth + 1 + this.props.text.month,
                            onClick: function onClick() {
                                return _this2.data.setState({ showType: Datepicker.YEAR });
                            } }),
                        _react2.default.createElement(_2.Button, { className: "white", content: this.state.selectDay + this.props.text.day,
                            onClick: function onClick() {
                                return _this2.data.setState({ showType: Datepicker.MONTH });
                            } }),
                        _react2.default.createElement(_2.Input, { className: "selectHours", type: "select", dropDownBoxData: Datepicker.ARRAY24,
                            onChange: this.data.setHours.bind(this),
                            value: this.state.selectHours < 10 ? "0" + this.state.selectHours : this.state.selectHours, selectIcon: false }),
                        ":",
                        _react2.default.createElement(_2.Input, { className: "selectMinutes", type: "select", dropDownBoxData: Datepicker.ARRAY60,
                            onChange: this.data.setMinutes.bind(this),
                            value: this.state.selectMinutes < 10 ? "0" + this.state.selectMinutes : this.state.selectMinutes, selectIcon: false })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "next", onClick: this.switch.bind(this, true) },
                        _react2.default.createElement(_2.Button, { className: "white", content: _react2.default.createElement(_2.Icon, { name: "i-BAI-youjiantou" }) })
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-datepicker-content" },
                    content
                )
            );
        }

        //视图

    }, {
        key: "switch",


        //上下翻页,true下一页，false上一页
        value: function _switch(type) {
            var selectDay = this.state.selectDay;
            var selectMonth = this.state.selectMonth;
            var selectYear = this.state.selectYear;
            var lastDay = new Date(selectYear, selectMonth + 1, 0);
            var prevLastDay = new Date(selectYear, selectMonth, 0);
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
            this.data.setState({ selectDay: selectDay, selectMonth: selectMonth, selectYear: selectYear });
        }

        //天数字点击

    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps, prevState) {
            var day = nextProps.day;
            // 当传入的type发生变化的时候，更新state

            if (day !== nextProps.day) {
                return {
                    day: day
                };
            }
            // 否则，对于state不进行任何操作
            return null;
        }
    }]);

    return Datepicker;
}(_react2.default.Component);

Datepicker.defaultProps = {
    className: "",
    monthIsFill: true, //每月的首位是否填充上月的
    showLunar: false, //是否显示农历
    addWeekOfMonthView: [0, 0], //每月前后多显示几周
    date: new Date(),
    text: {
        year: "年",
        month: "月",
        day: "日",
        hour: "时",
        m: "分",
        s: "秒",
        w: "周",
        weeksName: ["日", "一", "二", "三", "四", "五", "六"]
    },
    getSelectData: function getSelectData() {} //获取选中的日期


};
Datepicker.SELECT_YEAR = 0;
Datepicker.YEAR = 1;
Datepicker.MONTH = 2;
Datepicker.WEEKS = 3;
Datepicker.DAY = 4;
Datepicker.TIME = 5;
Datepicker.ARRAY60 = Array(59).fill(null).map(function (_, h) {
    return h < 9 ? "0" + (h + 1) : h + 1;
});
Datepicker.ARRAY24 = Array(24).fill(null).map(function (_, h) {
    return h < 9 ? "0" + (h + 1) : h + 1;
});

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.data = {
        //获取今天是第几周
        getWeekOfYear: function getWeekOfYear(year, month, day) {
            var thisDate = new Date(year, month, day),
                january = new Date(year, 0, 1),
                d = Math.round((thisDate.valueOf() - january.valueOf()) / 86400000);
            return Math.ceil((d + (january.getDay() + 1 - 1)) / 7);
        },
        //计算当前月份date对象的集合
        getMonthList: function getMonthList(month, year) {
            //当前月份的第一天和最后一天
            var fistDay = new Date(year, month, 1);
            var lastDay = new Date(year, month + 1, 0);
            var monthData = [];
            //当前月份每天的date对象集合,根据第一天星期几放第几位
            var moreWeekViewNum = _this3.state.showType === Datepicker.MONTH ? _this3.props.addWeekOfMonthView[0] * 7 : 0;
            for (var day = 1; day <= lastDay.getDate(); day++) {
                var index = fistDay.getDay() + day - 1 + moreWeekViewNum;
                monthData[index] = {};
                monthData[index].date = new Date(year, month, day);
                monthData[index].week = _this3.data.getWeekOfYear(year, month, day);
                monthData[index].lunar = (0, _2.toLunar)(year, month + 1, day);
            }
            return monthData;
        },
        setHours: function setHours(selectHours) {
            _this3.data.setState({ selectHours: selectHours });
        },
        setMinutes: function setMinutes(selectMinutes) {
            _this3.data.setState({ selectMinutes: selectMinutes });
        },
        backToday: function backToday() {
            var nowDate = new Date();
            _this3.data.setState({
                selectMilliseconds: nowDate.getMilliseconds(),
                selectSeconds: nowDate.getSeconds(),
                selectMinutes: nowDate.getMinutes(),
                selectHours: nowDate.getHours(),
                selectDay: nowDate.getDate(),
                selectMonth: nowDate.getMonth(),
                selectYear: nowDate.getFullYear()
            });
        },
        setState: function setState(state) {

            var date = _extends({}, _this3.state);
            if (state["selectYear"]) date["selectYear"] = state["selectYear"];
            if (state["selectMonth"]) date["selectMonth"] = state["selectMonth"];
            if (state["selectDay"]) date["selectDay"] = state["selectDay"];
            if (state["selectHours"]) {
                date["selectHours"] = state["selectHours"];
                state["selectHours"] = Number(state["selectHours"]);
            }
            if (state["selectMinutes"]) {
                date["selectMinutes"] = state["selectMinutes"];
                state["selectMinutes"] = Number(state["selectMinutes"]);
            }
            if (state["selectSeconds"]) date["selectSeconds"] = state["selectSeconds"];
            if (state["selectMilliseconds"]) date["selectMilliseconds"] = state["selectMilliseconds"];
            _this3.props.getSelectData({
                milliseconds: date.selectMilliseconds,
                seconds: date.selectSeconds,
                minutes: date.selectMinutes,
                hours: date.selectHours,
                day: date.selectDay,
                month: date.selectMonth + 1,
                year: date.selectYear
            });

            _this3.setState(state);
        }
    };
    this.view = {
        //选择年的视图
        selectYearsPage: function selectYearsPage(year) {
            var years = [];

            var _loop = function _loop(i) {
                years.push(_react2.default.createElement(
                    "div",
                    { className: "ya-datepicker-year" + (_this3.state.selectYear === i ? " selected" : ""),
                        onClick: function onClick() {
                            return _this3.data.setState({ selectYear: i, showType: Datepicker.MONTH });
                        },
                        key: "selectYear" + i },
                    _react2.default.createElement(_2.Button, { className: "white", content: i })
                ));
            };

            for (var i = year - 12; i < year + 13; i++) {
                _loop(i);
            }
            return years;
        },
        //年视图
        renderYear: function renderYear(year) {
            var yearTag = [];

            var _loop2 = function _loop2(month) {
                yearTag.push(_react2.default.createElement(
                    "div",
                    { className: "ya-datepicker-month", key: month },
                    _react2.default.createElement(
                        "div",
                        { className: "ya-datepicker-month-title",
                            onClick: function onClick() {
                                return _this3.data.setState({ selectMonth: month, showType: Datepicker.MONTH });
                            } },
                        _react2.default.createElement(_2.Button, { className: "white", content: month + 1 + _this3.props.text.month })
                    ),
                    _this3.view.renderMonth(month, year)
                ));
            };

            for (var month = 0; month < 12; month++) {
                _loop2(month);
            }
            return yearTag;
        },
        //月视图
        renderMonth: function renderMonth(month, year) {
            var daysTag = [];
            var beforeWeekNum = _this3.state.showType === Datepicker.MONTH ? _this3.props.addWeekOfMonthView[0] : 0;
            var afterWeekNum = _this3.state.showType === Datepicker.MONTH ? _this3.props.addWeekOfMonthView[1] : 0;
            var monthData = _this3.data.getMonthList(month, year);
            var weeksPerMonth = 5 + beforeWeekNum + afterWeekNum;

            //周名称头部
            if (_this3.state.showType === Datepicker.MONTH || _this3.state.showType === Datepicker.WEEKS) daysTag.push(_this3.view.getWeeksHead());

            //循环每周
            for (var week = 0; week < weeksPerMonth; week++) {
                var daysTags = [],
                    hideWeek = " hide";
                //循环一周的每天
                for (var day = 0; day < 7; day++) {
                    var index = week * 7 + day;
                    var item = monthData[index];
                    daysTags.push(_this3.view.renderDay(month, year, item, week, day, index));

                    //判断当前选中的天是否是当前循环中的周
                    if (_this3.state.showType === Datepicker.WEEKS) {
                        if (item && item.date && item.date.getDate() === _this3.state.selectDay) {
                            hideWeek = "";
                        }
                    } else {
                        hideWeek = "";
                    }
                }

                daysTag.push(_react2.default.createElement(
                    "div",
                    { className: "ya-datepicker-weeks" + hideWeek, key: "ya-datepicker-weeks" + week },
                    daysTags
                ));
            }

            //周视图按钮
            if (_this3.state.showType === Datepicker.WEEKS || _this3.state.showType === Datepicker.MONTH) daysTag.push(_this3.view.showWeekBtn(false));
            return daysTag;
        },
        //日视图
        renderDay: function renderDay(month, year, item, week, whatDay, index) {
            var beforeWeekNum = _this3.state.showType === Datepicker.MONTH ? _this3.props.addWeekOfMonthView[0] : 0;
            var fistDay = new Date(year, month, 1);
            var lastDay = new Date(year, month + 1, 0);
            var dayClass = "ya-datepicker-day";
            if (item === undefined || item === null) {
                //补全当月前后缺失的部分
                item = {};
                if (_this3.props.monthIsFill && _this3.state.showType !== Datepicker.YEAR) {
                    //补全天
                    if (week < beforeWeekNum + 2) {
                        //前
                        var fillDay = -fistDay.getDay() + whatDay + 1 - (beforeWeekNum - week) * 7;
                        item.date = new Date(year, month, fillDay);
                        item.week = _this3.data.getWeekOfYear(year, month, fillDay);
                        item.lunar = (0, _2.toLunar)(year, month + 1, fillDay);
                    } else if (week > beforeWeekNum + 2) {
                        //后
                        var lastWeekLeftDay = whatDay - lastDay.getDay();
                        var _fillDay = lastWeekLeftDay + (week - 4 - beforeWeekNum) * 7;

                        //fillDay小于等于零时，只会在闰年2月刚好排满四周的情况，此时多补一周
                        if (_fillDay <= 0) _fillDay += 7;
                        item.date = new Date(year, month + 1, _fillDay);
                        item.week = _this3.data.getWeekOfYear(year, month + 1, _fillDay);
                        item.lunar = (0, _2.toLunar)(year, month + 1 + 1, _fillDay);
                    }
                    dayClass += " otherMonth";
                } else {
                    dayClass += " noDay";
                }
            } else {
                var date = item.date;
                var isSat = date.getDay() === 6;
                var isSun = date.getDay() === 0;
                dayClass += isSat ? " saturday" : "";
                dayClass += isSun ? " sunday" : "";

                //选中
                if (_this3.state.selectDay === date.getDate() && _this3.state.selectMonth === date.getMonth() && _this3.state.selectYear === date.getFullYear()) {
                    dayClass += " selected";
                }

                //今日
                var nowDate = new Date();
                if (nowDate.getDate() === date.getDate() && nowDate.getMonth() === date.getMonth() && nowDate.getFullYear() === date.getFullYear()) {
                    dayClass += " nowDate";
                }
            }
            //周数
            var weekNumTag = "";
            if (whatDay === 0 && (_this3.state.showType === Datepicker.MONTH || _this3.state.showType === Datepicker.WEEKS)) {
                weekNumTag = _react2.default.createElement(
                    "span",
                    { className: "weekNum", key: "weekNum" + index },
                    item.week
                );
            }

            //农历
            var dayText = "",
                lunarDay = "";
            if (JSON.stringify(item) !== "{}" && item && item.date) {
                var lunar = item.lunar;
                dayText = item.date.getDate();
                lunarDay = lunar.lunarDay;
                if (lunar.lunarDay === "初一") lunarDay = lunar.lunarMonth + "月";
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                { key: index },
                weekNumTag,
                _react2.default.createElement(
                    "div",
                    { className: dayClass, onClick: _this3.dayClick.bind(_this3, item) },
                    _react2.default.createElement(
                        "div",
                        { className: "dayText" },
                        dayText
                    ),
                    _this3.props.showLunar && _this3.state.showType === Datepicker.MONTH ? _react2.default.createElement(
                        "div",
                        { className: "lunarDay" },
                        lunarDay
                    ) : ""
                )
            );
        },
        //获取周名称头部
        getWeeksHead: function getWeeksHead() {
            var weeksName = _this3.props.text.weeksName;
            var weeksNameTag = [];
            for (var i in weeksName) {
                if (weeksName.hasOwnProperty(i)) {
                    weeksNameTag.push(_react2.default.createElement(
                        "span",
                        { className: "name", key: "weekName" + i },
                        weeksName[i]
                    ));
                }
            }
            return _react2.default.createElement(
                "div",
                { className: "ya-datepicker-weekNames", key: "weekNames" },
                _react2.default.createElement(
                    "div",
                    { className: "weekTitle" },
                    _this3.props.text.w
                ),
                weeksNameTag
            );
        },
        //周视图切换按钮
        showWeekBtn: function showWeekBtn() {
            var isShow = _this3.state.showType === Datepicker.WEEKS;
            var showType = isShow ? Datepicker.MONTH : Datepicker.WEEKS;
            return _react2.default.createElement(
                "div",
                { className: "ya-showWeekView", key: "ya-showWeekView", onClick: function onClick() {
                        return _this3.data.setState({ showType: showType });
                    } },
                _react2.default.createElement(_2.Button, { className: "white adaptive", content: _react2.default.createElement(_2.Icon, { name: "i-Group-" + (isShow ? "1" : "") }) })
            );
        }
    };

    this.dayClick = function (item) {
        if (item && item.date) {
            _this3.data.setState({ selectMonth: item.date.getMonth(), selectDay: item.date.getDate() });
        }
    };
};

exports.Datepicker = Datepicker;
//# sourceMappingURL=Datepicker.js.map