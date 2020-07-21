"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageDemo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./message.css");

var _Message = require("./Message");

var _ = require("..");

var _ButtonDemo = require("../Button/ButtonDemo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 按钮组
 */
var MessageDemo = function (_React$Component) {
    _inherits(MessageDemo, _React$Component);

    function MessageDemo(props) {
        _classCallCheck(this, MessageDemo);

        var _this = _possibleConstructorReturn(this, (MessageDemo.__proto__ || Object.getPrototypeOf(MessageDemo)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(MessageDemo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u57FA\u7840\u63D0\u793A\u6846"
                    ),
                    _react2.default.createElement(_.Button, { content: "基础提示框", onClick: function onClick() {
                            return (0, _Message.Message)("基础提示框");
                        } })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u81EA\u52A8\u79FB\u9664\u7684\u63D0\u793A\u6846"
                    ),
                    _react2.default.createElement(_.Button, { content: "自动消失的提示框", onClick: function onClick() {
                            return (0, _Message.Message)("一秒钟自动移除", false, true);
                        } })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u81EA\u5B9A\u4E49\u6D88\u5931\u65F6\u95F4\u7684\u63D0\u793A\u6846"
                    ),
                    _react2.default.createElement(_.Button, { content: "自定义3000毫秒后消失的提示框", onClick: function onClick() {
                            return (0, _Message.Message)(_react2.default.createElement(_.Icon, null), false, 3000);
                        } })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u5E26\u786E\u8BA4\u7684\u63D0\u793A\u6846"
                    ),
                    _react2.default.createElement(_.Button, { content: "带确认的提示框", onClick: function onClick() {
                            return (0, _Message.Message)("基础提示框", { func: function func() {
                                    return (0, _Message.Message)("点击了Yes", false, true);
                                } });
                        } })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u81EA\u5B9A\u4E49\u5185\u5BB9"
                    ),
                    _react2.default.createElement(_.Button, { content: "自定义内容", onClick: function onClick() {
                            return (0, _Message.Message)(_react2.default.createElement(_ButtonDemo.ButtonDemo, null), {});
                        } })
                )
            );
        }
    }]);

    return MessageDemo;
}(_react2.default.Component);

MessageDemo.defaultProps = {};
exports.MessageDemo = MessageDemo;
//# sourceMappingURL=MessageDemo.js.map