"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pagination = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _2 = require("..");

require("./pagination.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 分页
 */
var Pagination = function (_React$Component) {
    _inherits(Pagination, _React$Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.getSelectData = function (page) {
            _this.props.getPage(page);
            _this.setState({ page: page });
        };

        _this.prev = function () {
            var page = _this.state.page;
            if (page > 1) _this.setState({ page: page - 1 });
        };

        _this.next = function () {
            var page = _this.state.page;
            if (page < _this.state.total) _this.setState({ page: page + 1 });
        };

        _this.state = {
            page: _this.props.page,
            eachPage: _this.props.eachPage,
            total: _this.props.total
        };
        return _this;
    }

    _createClass(Pagination, [{
        key: "render",
        value: function render() {
            var page = this.state.page;
            var totalPage = Math.ceil(this.state.total / this.state.eachPage);
            var dropData = totalPage ? Array(totalPage).fill(null).map(function (_, h) {
                return h + 1;
            }) : [];
            return _react2.default.createElement(
                "div",
                { className: "ya-pagination" },
                _react2.default.createElement(
                    "span",
                    { onClick: this.prev.bind(this) },
                    _react2.default.createElement(_2.Button, { className: "item white" + (page === 1 ? " disabled" : ""),
                        content: _react2.default.createElement(_2.Icon, { name: "i-BAI-zuojiantou" }) })
                ),
                _react2.default.createElement(
                    "span",
                    { className: "item pageItem" },
                    _react2.default.createElement(_2.Input, { className: "page", type: "select", dropDownBoxData: dropData,
                        value: this.state.page, autoContent: 0,
                        onChange: this.getSelectData.bind(this), selectIcon: false })
                ),
                _react2.default.createElement(
                    "span",
                    { className: "item" },
                    "/"
                ),
                _react2.default.createElement(
                    "span",
                    { className: "item" },
                    totalPage
                ),
                _react2.default.createElement(
                    "span",
                    { onClick: this.next.bind(this) },
                    _react2.default.createElement(_2.Button, { className: "item white" + (page === totalPage ? " disabled" : ""),
                        content: _react2.default.createElement(_2.Icon, { name: "i-BAI-youjiantou" }) })
                )
            );
        }
    }]);

    return Pagination;
}(_react2.default.Component);

Pagination.defaultProps = {
    page: 1, //当前页
    eachPage: 1, //每页多少条
    total: 1, //一共多少条数据
    getPage: function getPage() {} //获取选择的页码
};
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map