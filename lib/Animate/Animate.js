"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Animate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 动画
 */
var Animate = function (_Component) {
    _inherits(Animate, _Component);

    function Animate() {
        _classCallCheck(this, Animate);

        return _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).apply(this, arguments));
    }

    _createClass(Animate, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    "h1",
                    { className: "ya-title" },
                    "\u52A0\u8F7D\u52A8\u753B"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "ya-animation-1" },
                        "LOADING..."
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "ya-animation-2" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "loader1" },
                        _react2.default.createElement("span", null),
                        _react2.default.createElement("span", null),
                        _react2.default.createElement("span", null),
                        _react2.default.createElement("span", null),
                        _react2.default.createElement("span", null)
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader2" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "div",
                        { className: "loader3" },
                        _react2.default.createElement("span", null),
                        _react2.default.createElement("span", null)
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader4" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader5" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader6" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader7" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader8" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement("div", { className: "loader9" })
                )
            );
        }
    }]);

    return Animate;
}(_react.Component);

exports.Animate = Animate;
//# sourceMappingURL=Animate.js.map