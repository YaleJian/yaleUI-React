"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./checkbox.css");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 复选框
 */
var Checkbox = function (_React$Component) {
    _inherits(Checkbox, _React$Component);

    //半选状态
    //非选中状态
    function Checkbox(props) {
        _classCallCheck(this, Checkbox);

        var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

        _this.onClick = function (e) {
            if (_this.state.select === Checkbox.SELECTED) {
                _this.setState({ select: Checkbox.UNSELECTED });
            } else {
                _this.setState({ select: Checkbox.SELECTED });
            }
            _this.props.onClick(_this.state.select, _this.props.bindData, e);
        };

        _this.state = {
            select: _this.props.select || Checkbox.UNSELECTED
        };
        return _this;
    } //选中状态


    _createClass(Checkbox, [{
        key: "render",
        value: function render() {
            var selectIconSvg = _react2.default.createElement(_.Icon, { name: "i-buxuan" });
            var zoom = '';
            if (this.state.select === Checkbox.SELECTED) {
                selectIconSvg = _react2.default.createElement(_.Icon, { name: "i-xuanzhong" });
                zoom = 'ya-zoom10-15';
            } else if (this.state.select === Checkbox.SEMI_SELECTED) {
                selectIconSvg = _react2.default.createElement(_.Icon, { name: "i-banxuan" });
            }
            var selectIcon = 'ya-checkbox ' + zoom;
            return _react2.default.createElement(
                "span",
                { className: selectIcon, onClick: this.onClick.bind(this) },
                selectIconSvg
            );
        }
    }]);

    return Checkbox;
}(_react2.default.Component);

Checkbox.defaultProps = {
    bindData: "",
    onClick: function onClick() {}
};
Checkbox.UNSELECTED = 1;
Checkbox.SELECTED = 2;
Checkbox.SEMI_SELECTED = 3;
exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map