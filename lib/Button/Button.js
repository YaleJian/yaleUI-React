"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./button.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 按钮组
 */
var Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.onClick = function (e) {
            if (_this.state.status) {
                _this.props.onClick(e);
            }
        };

        _this.state = {
            status: !_this.props.className.includes("disabled")
        };
        return _this;
    }

    _createClass(Button, [{
        key: "render",
        value: function render() {
            var className = "ya-btn " + this.props.className;
            if (this.props.className.indexOf("adaptive") > -1) {
                return _react2.default.createElement(
                    "div",
                    { className: className, onClick: this.onClick.bind(this) },
                    this.props.content
                );
            } else if (this.props.className.indexOf("press") > -1) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        "div",
                        { className: className, onClick: this.onClick.bind(this) },
                        _react2.default.createElement(
                            "span",
                            null,
                            this.props.content
                        )
                    )
                );
            }
            return _react2.default.createElement(
                "button",
                { type: "button", className: className,
                    onClick: this.onClick.bind(this) },
                this.props.content
            );
        }
    }]);

    return Button;
}(_react2.default.Component);

Button.defaultProps = {
    content: "Button",
    className: "",
    radius: true,
    size: "",
    onClick: function onClick() {}
};
exports.Button = Button;
//# sourceMappingURL=Button.js.map