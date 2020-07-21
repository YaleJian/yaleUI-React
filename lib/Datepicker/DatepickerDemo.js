"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatepickerDemo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Datepicker = require("./Datepicker");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatepickerDemo = function (_React$Component) {
    _inherits(DatepickerDemo, _React$Component);

    function DatepickerDemo(props) {
        _classCallCheck(this, DatepickerDemo);

        var _this = _possibleConstructorReturn(this, (DatepickerDemo.__proto__ || Object.getPrototypeOf(DatepickerDemo)).call(this, props));

        _this.state = {
            date: {
                year: "",
                month: "",
                day: "",
                hours: "",
                minutes: ""
            }
        };
        return _this;
    }

    _createClass(DatepickerDemo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "datepickerDemo" },
                _react2.default.createElement(_.Input, { type: "popUp",
                    content: _react2.default.createElement(_Datepicker.Datepicker, { getSelectData: this.getSelectData.bind(this), showLunar: false }),
                    value: this.state.date.year + "年" + this.state.date.month + "月" + this.state.date.day + "日 " + this.state.date.hours + ":" + this.state.date.minutes,
                    placeholder: "请选择" }),
                _react2.default.createElement(_.Input, { type: "popUp",
                    content: _react2.default.createElement(_Datepicker.Datepicker, { getSelectData: this.getSelectData.bind(this), showLunar: true }),
                    value: this.state.date.year + "年" + this.state.date.month + "月" + this.state.date.day + "日 " + this.state.date.hours + ":" + this.state.date.minutes,
                    placeholder: "请选择" })
            );
        }
    }, {
        key: "getSelectData",
        value: function getSelectData(date) {
            this.setState({ date: date });
        }
    }]);

    return DatepickerDemo;
}(_react2.default.Component);

DatepickerDemo.defaultProps = {};
exports.DatepickerDemo = DatepickerDemo;
//# sourceMappingURL=DatepickerDemo.js.map