"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Icon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * iconfont封装
 */
var Icon = function (_React$Component) {
    _inherits(Icon, _React$Component);

    function Icon() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Icon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (e) {
            _this.props.onClick(e);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Icon, [{
        key: "render",
        value: function render() {
            var className = "icon " + this.props.className;
            return _react2.default.createElement(
                "svg",
                { className: className, "aria-hidden": "true", onClick: this.onClick.bind(this) },
                _react2.default.createElement(
                    "use",
                    { xlinkHref: "#" + this.props.name },
                    " "
                )
            );
        }
    }]);

    return Icon;
}(_react2.default.Component);

Icon.defaultProps = {
    name: "i-yalejian-logo",
    className: "",
    onClick: function onClick() {}
};
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map