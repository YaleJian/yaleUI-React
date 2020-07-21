"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./input.css");

var _ = require("..");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.input = function (className) {
            var type = _this.props.type;
            className = "ya-input " + _this.props.type + " " + className;
            //计算长度
            var inputWidth = _.DomUtils.getTextLength(_this.props.value) * _this.props.autoContent;
            //判断input值类型
            var value = _this.props.value;
            value = type === "number" || type === "integer" ? Number(value) : value.toString();
            return _react2.default.createElement("input", { className: className, style: _this.autoContent ? { width: inputWidth ? inputWidth : 14 } : null,
                type: _this.state.passwordHide ? "password" : _this.props.type,
                value: value,
                placeholder: _this.props.placeholder,
                autoComplete: _this.props.autoComplete,
                onChange: _this.onChange.bind(_this),
                onClick: _this.onClick.bind(_this),
                onKeyDown: _this.onKeyDown.bind(_this),
                ref: function ref(inputRef) {
                    return _this.inputRef = inputRef;
                }
            });
        };

        _this.inputWithIcon = function (className, icon) {
            if (icon && icon[0]) className += " left";
            if (icon && icon[1]) className += " right";
            var inputIcon = function inputIcon(icon) {
                return _react2.default.createElement(
                    "span",
                    { className: "inputIcon", onClick: _this.iconClick.bind(_this) },
                    icon
                );
            };
            return _react2.default.createElement(
                "span",
                { className: "inputGroup", onClick: _this.onClick.bind(_this) },
                icon[0] ? inputIcon(icon[0]) : null,
                _this.input(className),
                icon[1] ? inputIcon(icon[1]) : null
            );
        };

        _this.numberInput = function (className) {
            var minus = _react2.default.createElement(_.Button, { className: "white", content: _react2.default.createElement(_.Icon, { name: "i-minus" }), onClick: _this.numberMinus.bind(_this) });
            var plus = _react2.default.createElement(_.Button, { className: "white", content: _react2.default.createElement(_.Icon, { name: "i-plus" }), onClick: _this.numberPlus.bind(_this) });
            return _this.inputWithIcon(className, [minus, plus]);
        };

        _this.numberMinus = function (e) {
            var number = Number(_this.inputRef.value);
            _this.inputRef.value = number + 1;
            _this.props.onChange(e);
        };

        _this.numberPlus = function (e) {
            var number = Number(_this.inputRef.value);
            _this.inputRef.value = number - 1;
            _this.props.onChange(e);
        };

        _this.onChange = function (e) {
            _this.props.onChange(e.target.value, e);
        };

        _this.iconClick = function (e) {
            if (_this.props.type === "password") _this.setState({ passwordHide: !_this.state.passwordHide });
            if (_this.props.type === "search") {
                _this.props.onSearch(e);
            }
        };

        _this.onClick = function (e) {
            if (_this.props.type === "popUp" || _this.props.type === "select") {
                _this.setState({ showContent: !_this.state.showContent });
            }
        };

        _this.onKeyDown = function (e) {
            if (e.keyCode === 13 && _this.props.type === "search") {
                _this.props.onSearch(e);
            }
        };

        _this.cancel = function (maskTag, e) {
            _this.setState({ showContent: false });
            maskTag.remove();
            e.preventDefault();
            e.stopPropagation();
        };

        _this.popUp = function (className) {
            var maskContent = void 0,
                maskTag = void 0;
            if (_this.state.showContent) {
                //渲染模态层
                maskTag = document.getElementsByClassName("ya-mask");
                if (maskTag.length === 0) {
                    //定义模态层渲染区
                    maskTag = document.createElement("div");
                    maskTag.className = "ya-mask";
                    document.body.appendChild(maskTag);
                } else {
                    maskTag = maskTag[0];
                }
                maskContent = _react2.default.createElement("div", { className: "ya-mask-content", onClick: _this.cancel.bind(_this, maskTag) });
            }

            var content = _this.props.content;

            //判断是否是选择框
            if (_this.props.type === "select") content = _this.select(maskTag);

            var popUpContentClass = "ya-popUp-content animated fastest fadeInDownSmall";

            //右侧下拉标志
            var icon = _this.state.showContent ? _react2.default.createElement(_.Icon, { name: "i-BAI-shangjiantou" }) : _react2.default.createElement(_.Icon, { name: "i-BAI-xiajiantou" });

            return _react2.default.createElement(
                "span",
                { className: "ya-popUp" },
                !_this.props.selectIcon ? _this.input(className) : _this.inputWithIcon(className, ["", icon]),
                _this.state.showContent ? _react2.default.createElement(
                    "div",
                    { className: popUpContentClass },
                    content
                ) : null,
                _this.state.showContent ? _reactDom2.default.createPortal(maskContent, maskTag) : null
            );
        };

        _this.select = function (maskTag) {
            var isArray = Array.isArray(_this.props.dropDownBoxData);
            if (isArray) {
                var selectContent = _this.props.dropDownBoxData.map(function (item, key) {
                    var isObject = (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object";
                    return _react2.default.createElement(
                        "div",
                        { className: "ya-select-content-item", key: key,
                            onClick: _this.selectItemClick.bind(_this, isObject ? item.id : item, maskTag) },
                        isObject ? item.text : item
                    );
                });
                return _react2.default.createElement(
                    "div",
                    { className: "ya-select-content" },
                    selectContent
                );
            } else {
                return "参数应为数组";
            }
        };

        _this.selectItemClick = function (item, maskTag, e) {
            _this.props.onChange(item, e);
            _this.cancel(maskTag, e);
        };

        _this.state = {
            passwordHide: _this.props.type === "password",
            showContent: false,
            selectData: ""
        };
        _this.autoContent = _this.props.autoContent || typeof _this.props.autoContent === "number";
        return _this;
    }

    _createClass(Input, [{
        key: "render",
        value: function render() {
            var type = this.props.type;
            var className = this.props.className;
            switch (type) {
                case "password":
                    var passwordIcon = ["", _react2.default.createElement(_.Icon, { name: this.state.passwordHide ? "i-showPsw" : "i-hidePsw" })];
                    return this.inputWithIcon(className + " right", passwordIcon);
                case "search":
                    var searchIcon = className.includes("right") ? ["", _react2.default.createElement(_.Icon, { name: "i-magnifier" })] : [_react2.default.createElement(_.Icon, {
                        name: "i-magnifier" })];
                    return this.inputWithIcon(className, searchIcon);
                case "number":
                    className += " number";
                    return this.numberInput(className);
                case "integer":
                    className += " integer";
                    return this.numberInput(className);
                case "select":
                    return this.popUp(className);
                case "popUp":
                    return this.popUp(className);
                case "withIcon":
                    return this.inputWithIcon(className, this.props.icon);
                case "textarea":
                    return _react2.default.createElement("textarea", { className: className, defaultValue: this.props.value });
                default:
                    return this.input(className);
            }
        }

        //普通输入框


        //带图标的输入框


        //数字输入框

        //数字增加

        //数字减少


        //自定义弹出输入框


        //下拉选择框

    }]);

    return Input;
}(_react2.default.Component);

Input.defaultProps = {
    type: "text",
    value: "",
    placeholder: "",
    className: "",
    icon: [],
    autoComplete: "off",
    autoContent: false,
    dropDownBoxData: [],
    selectIcon: true,
    onChange: function onChange() {},
    onSearch: function onSearch() {}
};
exports.Input = Input;
//# sourceMappingURL=Input.js.map