"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ButtonDemo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require("../utils/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 首页
 */
var ButtonDemo = function (_Component) {
    _inherits(ButtonDemo, _Component);

    function ButtonDemo() {
        _classCallCheck(this, ButtonDemo);

        return _possibleConstructorReturn(this, (ButtonDemo.__proto__ || Object.getPrototypeOf(ButtonDemo)).apply(this, arguments));
    }

    _createClass(ButtonDemo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u6309\u94AE\u989C\u8272"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "blue" }),
                        _react2.default.createElement(_Button2.default, { className: "green" }),
                        _react2.default.createElement(_Button2.default, { className: "orange" }),
                        _react2.default.createElement(_Button2.default, null),
                        _react2.default.createElement(_Button2.default, { className: "red" }),
                        _react2.default.createElement(_Button2.default, { className: "white" }),
                        _react2.default.createElement(_Button2.default, { className: "grey" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u6309\u94AE\u5927\u5C0F"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "smallest radius" }),
                        _react2.default.createElement(_Button2.default, { className: "smaller radius" }),
                        _react2.default.createElement(_Button2.default, { className: "small radius" }),
                        _react2.default.createElement(_Button2.default, { className: "radius" }),
                        _react2.default.createElement(_Button2.default, { className: "big radius" }),
                        _react2.default.createElement(_Button2.default, { className: "bigger radius" }),
                        _react2.default.createElement(_Button2.default, { className: "biggest radius" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u7A7A\u5FC3\u6309\u94AE"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "blue outline" }),
                        _react2.default.createElement(_Button2.default, { className: "green outline" }),
                        _react2.default.createElement(_Button2.default, { className: "orange outline" }),
                        _react2.default.createElement(_Button2.default, { className: "outline" }),
                        _react2.default.createElement(_Button2.default, { className: "red outline" }),
                        _react2.default.createElement(_Button2.default, { className: "white outline" }),
                        _react2.default.createElement(_Button2.default, { className: "grey outline" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "radius blue outline" }),
                        _react2.default.createElement(_Button2.default, { className: "radius green outline" }),
                        _react2.default.createElement(_Button2.default, { className: "radius orange outline" }),
                        _react2.default.createElement(_Button2.default, { className: "radius outline" }),
                        _react2.default.createElement(_Button2.default, { className: "radius red outline" }),
                        _react2.default.createElement(_Button2.default, { className: "radius white outline" }),
                        _react2.default.createElement(_Button2.default, { className: "radius grey outline" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u5706\u5F62\u6309\u94AE"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "smallest radius circular", content: "b" }),
                        _react2.default.createElement(_Button2.default, { className: "smaller radius circular", content: "b" }),
                        _react2.default.createElement(_Button2.default, { className: "small radius circular", content: "b" }),
                        _react2.default.createElement(_Button2.default, { className: "radius circular", content: "b" }),
                        _react2.default.createElement(_Button2.default, { className: "big radius circular", content: "b" }),
                        _react2.default.createElement(_Button2.default, { className: "bigger radius circular", content: "b" }),
                        _react2.default.createElement(_Button2.default, { className: "biggest radius circular", content: "b" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u6309\u94AE\u9634\u5F71"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "blue shadow" }),
                        _react2.default.createElement(_Button2.default, { className: "green shadow" }),
                        _react2.default.createElement(_Button2.default, { className: "orange shadow" }),
                        _react2.default.createElement(_Button2.default, { className: "shadow" }),
                        _react2.default.createElement(_Button2.default, { className: "red shadow" }),
                        _react2.default.createElement(_Button2.default, { className: "white shadow" }),
                        _react2.default.createElement(_Button2.default, { className: "grey shadow" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "blue shadow radius" }),
                        _react2.default.createElement(_Button2.default, { className: "green shadow radius" }),
                        _react2.default.createElement(_Button2.default, { className: "orange shadow radius" }),
                        _react2.default.createElement(_Button2.default, { className: "shadow radius" }),
                        _react2.default.createElement(_Button2.default, { className: "red shadow radius" }),
                        _react2.default.createElement(_Button2.default, { className: "white shadow radius" }),
                        _react2.default.createElement(_Button2.default, { className: "grey shadow radius" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "blue shadow radius circular big" }),
                        _react2.default.createElement(_Button2.default, { className: "green shadow radius circular big" }),
                        _react2.default.createElement(_Button2.default, { className: "orange shadow radius circular big" }),
                        _react2.default.createElement(_Button2.default, { className: "shadow radius circular big" }),
                        _react2.default.createElement(_Button2.default, { className: "red shadow radius circular big" }),
                        _react2.default.createElement(_Button2.default, { className: "white shadow radius circular big" }),
                        _react2.default.createElement(_Button2.default, { className: "grey shadow radius circular big" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u7981\u7528"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "disabled", content: "Disabled" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u81EA\u9002\u5E94\u6309\u94AE"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "content" },
                        _react2.default.createElement(_Button2.default, { className: "blue adaptive" }),
                        _react2.default.createElement(_Button2.default, { className: "green adaptive" }),
                        _react2.default.createElement(_Button2.default, { className: "orange adaptive" }),
                        _react2.default.createElement(_Button2.default, { className: "adaptive outline" }),
                        _react2.default.createElement(_Button2.default, { className: "red adaptive outline" }),
                        _react2.default.createElement(_Button2.default, { className: "white adaptive radius" }),
                        _react2.default.createElement(_Button2.default, { className: "grey adaptive radius" })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u7EC4\u5408\u6309\u94AE"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "ya-groupBtn" },
                            _react2.default.createElement(_Button2.default, { className: "radius blue", content: "left" }),
                            _react2.default.createElement(_Button2.default, { className: "radius blue", content: "middle" }),
                            _react2.default.createElement(_Button2.default, { className: "radius blue", content: "right" })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "ya-groupBtn" },
                            _react2.default.createElement(_Button2.default, { className: "blue", content: "left" }),
                            _react2.default.createElement(_Button2.default, { className: "blue", content: "middle" }),
                            _react2.default.createElement(_Button2.default, { className: "blue", content: "right" })
                        )
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u6309\u94AE\u5185\u5BB9\u81EA\u5B9A\u4E49"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_Button2.default, { className: "smallest outline blue radius", content: _react2.default.createElement(_Icon2.default, { name: "i-loading-min" }) }),
                        _react2.default.createElement(_Button2.default, { className: "outline white", content: _react2.default.createElement(_Icon2.default, { name: "i-shijian1" }) }),
                        _react2.default.createElement(_Button2.default, { className: "outline white radius", content: _react2.default.createElement(_Icon2.default, { name: "i-qrCode" }) }),
                        _react2.default.createElement(_Button2.default, { className: "biggest radius grey", content: _react2.default.createElement(_Icon2.default, { name: "i--expressionless" }) }),
                        _react2.default.createElement(_Button2.default, { className: "adaptive radius orange", content: _react2.default.createElement(_Icon2.default, { name: "i-shezhi1" }) })
                    )
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "\u6309\u94AE\u53CD\u9988\u6548\u679C"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_Button2.default, { className: "press smallest", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press smaller", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press small", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press big", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press bigger", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press biggest", content: "可按下按钮" })
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_Button2.default, { className: "press blue", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press green", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press orange", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press red", content: "可按下按钮" }),
                        _react2.default.createElement(_Button2.default, { className: "press grey", content: "可按下按钮" })
                    )
                )
            );
        }
    }]);

    return ButtonDemo;
}(_react.Component);

exports.ButtonDemo = ButtonDemo;
//# sourceMappingURL=ButtonDemo.js.map