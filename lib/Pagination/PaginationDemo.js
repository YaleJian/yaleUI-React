"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PaginationDemo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Pagination = require("./Pagination");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationDemo = function (_React$Component) {
    _inherits(PaginationDemo, _React$Component);

    function PaginationDemo(props) {
        _classCallCheck(this, PaginationDemo);

        var _this = _possibleConstructorReturn(this, (PaginationDemo.__proto__ || Object.getPrototypeOf(PaginationDemo)).call(this, props));

        _this.getPage = function (page) {
            _this.setState({ page: page });
        };

        _this.state = {
            page: 1
        };
        return _this;
    }

    _createClass(PaginationDemo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_Pagination.Pagination, { getPage: this.getPage.bind(this), total: 10, page: 1 })
            );
        }
    }]);

    return PaginationDemo;
}(_react2.default.Component);

PaginationDemo.defaultProps = {};
exports.PaginationDemo = PaginationDemo;
//# sourceMappingURL=PaginationDemo.js.map