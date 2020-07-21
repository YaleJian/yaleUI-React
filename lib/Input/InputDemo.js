"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputDemo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Input = require("./Input");

var _Input2 = _interopRequireDefault(_Input);

var _Icon = require("../utils/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _TreeDemo = require("../Tree/TreeDemo");

var _TreeDemo2 = _interopRequireDefault(_TreeDemo);

var _Tree = require("../Tree/Tree");

var _Tree2 = _interopRequireDefault(_Tree);

var _TreeUtil = require("../Tree/TreeUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputDemo = function (_React$Component) {
    _inherits(InputDemo, _React$Component);

    function InputDemo(props) {
        _classCallCheck(this, InputDemo);

        var _this = _possibleConstructorReturn(this, (InputDemo.__proto__ || Object.getPrototypeOf(InputDemo)).call(this, props));

        var treeData = (0, _TreeUtil.testTreeData)(5, 20);
        _this.state = {
            treeData: treeData,
            selectData: "",
            selectData2: "",
            checkboxData: "",
            returnData: "",
            inputValue: ""
        };
        return _this;
    }

    _createClass(InputDemo, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u57FA\u7840\u8F93\u5165\u6846"
                    ),
                    _react2.default.createElement(_Input2.default, { placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue }),
                    _react2.default.createElement(
                        "span",
                        { className: "padding0-10" },
                        "\u8F93\u5165\u7684\u503C\uFF1A",
                        this.state.inputValue
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u6839\u636E\u5185\u5BB9\u957F\u77ED\u81EA\u52A8\u5BBD\u5EA6\u7684\u8F93\u5165\u6846"
                    ),
                    _react2.default.createElement(_Input2.default, { placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue, autoContent: true }),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(_Input2.default, { placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue, autoContent: 1.4 }),
                    _react2.default.createElement(
                        "span",
                        { className: "padding0-10" },
                        "\u8F93\u5165\u7684\u503C\uFF1A",
                        this.state.inputValue
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u5BC6\u7801\u6846"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "password", placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u641C\u7D22\u6846"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "search", placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue }),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(_Input2.default, { type: "search", className: "right", placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u5E26\u56FE\u6807\u7684\u8F93\u5165\u6846"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "withIcon", placeholder: "请输入内容", icon: [_react2.default.createElement(_Icon2.default, null)], onChange: this.onChange.bind(this), value: this.state.inputValue }),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(_Input2.default, { type: "withIcon", placeholder: "请输入内容", icon: [_react2.default.createElement(_Icon2.default, null), _react2.default.createElement(_Icon2.default, null)], onChange: this.onChange.bind(this), value: this.state.inputValue })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u6587\u672C\u57DF"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "textarea", placeholder: "请输入内容", onChange: this.onChange.bind(this), value: this.state.inputValue })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u6570\u5B57\u6846"
                    ),
                    "\u4EFB\u610F\u6570\u5B57\uFF1A",
                    _react2.default.createElement(_Input2.default, { type: "number", onChange: this.onChange.bind(this), value: this.state.inputValue }),
                    _react2.default.createElement("br", null),
                    "\u6574\u6570\uFF1A",
                    _react2.default.createElement(_Input2.default, { type: "integer", onChange: this.onChange.bind(this), value: this.state.inputValue })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u9009\u62E9\u6846"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "margin0-10" },
                        "\u5165\u53C2\u4E3A\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1A"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "select",
                        dropDownBoxData: ["item1", "item2", "item3", "item4", "item5", "item6"],
                        onChange: this.getSelectData.bind(this),
                        value: this.state.selectData,
                        placeholder: "请选择" }),
                    _react2.default.createElement(
                        "span",
                        null,
                        "\u9009\u4E2D\u7684\u503C\uFF1A",
                        this.state.selectData.toString()
                    ),
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "span",
                        null,
                        "\u5165\u53C2\u4E3A\u5BF9\u8C61\u6570\u7EC4\uFF1A"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "select",
                        dropDownBoxData: [{ id: 1, text: "item1" }, { id: 1, text: "item2" }, { id: 2, text: "item3" }, {
                            id: 3,
                            text: "item4"
                        }, { id: 4, text: "item5" }],
                        onChange: this.getSelectData2.bind(this),
                        value: this.state.selectData2,
                        placeholder: "请选择" }),
                    _react2.default.createElement(
                        "span",
                        { className: "margin0-10" },
                        "\u9009\u4E2D\u7684\u503C\uFF1A",
                        this.state.selectData2.toString()
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u591A\u9009\u9009\u62E9\u6846"
                    ),
                    _react2.default.createElement(_Input2.default, { type: "popUp",
                        content: _react2.default.createElement(_Tree2.default, { treeData: this.state.treeData,
                            openBtn: false,
                            checkbox: true,
                            checkboxClick: this.getCheckboxData.bind(this)
                        }),
                        value: this.state.checkboxData,
                        placeholder: "请选择" }),
                    _react2.default.createElement(
                        "span",
                        null,
                        "\u9009\u4E2D\u7684\u503C\uFF1A",
                        this.state.checkboxData.toString()
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-p" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        "\u81EA\u5B9A\u4E49\u5F39\u51FA\u5185\u5BB9\u8F93\u5165\u6846\uFF1A\u5728\u5F39\u51FA\u5185\u5BB9\u4E2D\u786E\u8BA4\u8FD4\u56DE\u503C"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        "\u8F93\u51FA\u7684\u503C\uFF1A",
                        this.state.returnData.toString()
                    ),
                    _react2.default.createElement(_Input2.default, { type: "popUp",
                        content: _react2.default.createElement(_TreeDemo2.default, { getReturnData: this.getReturnData.bind(this) }),
                        value: this.state.returnData,
                        placeholder: "请选择" })
                )
            );
        }
    }, {
        key: "onChange",
        value: function onChange(inputValue, e) {
            this.setState({ inputValue: inputValue });
        }
    }, {
        key: "getReturnData",
        value: function getReturnData(returnData) {
            this.setState({ returnData: returnData });
        }
    }, {
        key: "getSelectData",
        value: function getSelectData(selectData, e) {
            this.setState({ selectData: selectData });
        }
    }, {
        key: "getSelectData2",
        value: function getSelectData2(selectData2) {
            this.setState({ selectData2: selectData2 });
        }
    }, {
        key: "getCheckboxData",
        value: function getCheckboxData(checkboxData) {
            this.setState({ checkboxData: checkboxData });
        }
    }]);

    return InputDemo;
}(_react2.default.Component);

InputDemo.defaultProps = {};
exports.InputDemo = InputDemo;
//# sourceMappingURL=InputDemo.js.map