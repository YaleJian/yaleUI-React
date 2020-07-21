"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Radio.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_React$Component) {
    _inherits(Radio, _React$Component);

    function Radio(props) {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));

        _this.onClick = function (e) {
            _this.setState({ checked: !_this.state.checked });
            _this.props.onClick(_this.state.checked, _this.props.bindData, e);
        };

        _this.state = {
            checked: _this.props.checked || false
        };
        return _this;
    }

    _createClass(Radio, [{
        key: "render",
        value: function render() {
            var textClass = "ya-radio-text" + this.props.textClass;
            return _react2.default.createElement(
                "span",
                { className: "ya-radio", onClick: this.onClick.bind(this) },
                _react2.default.createElement("input", { type: "radio", className: "ya-radio-input", checked: this.state.checked, onChange: function onChange(ignore) {
                        return true;
                    } }),
                _react2.default.createElement(
                    "span",
                    { className: textClass },
                    this.props.text
                )
            );
        }
    }]);

    return Radio;
}(_react2.default.Component);

Radio.defaultProps = {
    textClass: "",
    text: "",
    onClick: function onClick() {}
};
exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map