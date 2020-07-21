'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Box = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./progress.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultState = { show: false };

var Progress = function (_Component) {
    _inherits(Progress, _Component);

    function Progress(props) {
        _classCallCheck(this, Progress);

        var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, props));

        _this.state = _extends({}, defaultState);
        return _this;
    }

    // 开始显示


    _createClass(Progress, [{
        key: 'start',
        value: function start() {
            this.setState({
                show: true
            });
        }

        // 结束隐藏

    }, {
        key: 'done',
        value: function done() {
            this.setState({
                show: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'progress', style: this.state.show ? { display: 'block' } : { display: 'none' } },
                _react2.default.createElement(
                    'div',
                    { className: 'bar', style: this.state.show ? { width: '99%' } : { width: '0' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'peg' },
                        ' '
                    )
                )
            );
        }
    }]);

    return Progress;
}(_react.Component);

// 创建元素追加到body


var progress = document.createElement('ya-progress');
document.body.appendChild(progress);

var Box = _reactDom2.default.render(_react2.default.createElement(Progress, null), progress);
exports.Box = Box;
//# sourceMappingURL=Progress.js.map