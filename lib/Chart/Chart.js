'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _echarts = require('echarts/lib/echarts');

var _echarts2 = _interopRequireDefault(_echarts);

require('echarts/lib/chart/bar');

require('echarts/lib/chart/pie');

require('echarts/lib/component/tooltip');

require('echarts/lib/component/title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// 引入柱状图


// 引入提示框和标题组件


/**
 * 图表
 */
var Chart = function (_React$Component) {
    _inherits(Chart, _React$Component);

    function Chart(props) {
        _classCallCheck(this, Chart);

        var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

        _this.defaultOption = {
            bar: {
                title: { text: 'ECharts 入门示例' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            },
            pie: {
                title: {
                    text: "编程语言",
                    left: "center"
                },
                series: [{
                    name: '比例',
                    type: 'pie',
                    data: {},
                    label: {
                        normal: {
                            formatter: "{d}% \n{b}"
                        }
                    }
                }]
            },
            line: {
                title: {
                    text: '堆叠区域图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                }, {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                }, {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                }, {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [320, 332, 301, 334, 390, 330, 320]
                }, {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }]
            }
        };

        _this.state = {};
        return _this;
    }

    _createClass(Chart, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('div', { ref: function ref(tag) {
                    return _this2.tag = tag;
                }, style: { width: 400, height: 400 } });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initChart();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.initChart();
        }
    }, {
        key: 'initChart',
        value: function initChart() {
            var myChart = _echarts2.default.init(this.tag);
            myChart.setOption(this.defaultOption.bar);
        }
    }]);

    return Chart;
}(_react2.default.Component);

Chart.defaultProps = {};
exports.Chart = Chart;
//# sourceMappingURL=Chart.js.map