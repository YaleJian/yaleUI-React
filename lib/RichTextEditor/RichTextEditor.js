"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RichTextEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./richTextEditor.css");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextBtnList = [{ name: "undo", value: "", icon: "i-undo", title: "前进" }, { name: "redo", value: "", icon: "i-redo", title: "后退" }, { name: "removeFormat", value: "", icon: "i-removeFormat" }, { name: "formatBlock", value: "<h1>", icon: "h1" }, { name: "formatBlock", value: "<h2>", icon: "h2" }, { name: "formatBlock", value: "<h3>", icon: "h3" }, { name: "formatBlock", value: "<h4>", icon: "h4" }, { name: "formatBlock", value: "<h4>", icon: "h4" },
// {name: "fontName", value: "宋体", icon: "i-font", title: "调整字体"},
{ name: "bold", value: "bold", icon: "i-bold", title: "加粗" }, { name: "italic", value: "", icon: "i-italic", title: "斜体" }, { name: "addFontSize", value: "", icon: "i-addFontSize", title: "字体增大" }, { name: "cutFontSize", value: "", icon: "i-cutFontSize", title: "字体减少" }, { name: "foreColor", value: "#009688", icon: "i-fColor", title: "字体颜色" }, { name: "backColor", value: "#daf5f1", icon: "i-background", title: "背景" }, { name: "justifyCenter", value: "", icon: "i-justifyCenter", title: "居中" }, { name: "justifyLeft", value: "", icon: "i-justifyLeft", title: "居左" }, { name: "justifyRight", value: "", icon: "i-justifyRight", title: "居右" }, { name: "formatBlock", value: "<blockquote>", icon: "i-quote", title: "引用" },
// {name: "indent", value: "indent", icon: "i-leftIndent", title: "增加缩进"},
// {name: "outdent", value: "", icon: "i-rightIndent", title: "减少缩进"},
{ name: "insertHorizontalRule", value: "", icon: "i-line", title: "分割线" }, { name: "strikeThrough", value: "", icon: "i-strikeThrough", title: "删除线" }, { name: "underline", value: "", icon: "i-underline", title: "下划线" }, { name: "superscript", value: "", icon: "i-superscript", title: "上标" }, { name: "subscript", value: "", icon: "i-subscript", title: "下标" }, { name: "insertOrderedList", value: "", icon: "i-ul", title: "有序列表" }, { name: "insertUnorderedList", value: "", icon: "i-ol", title: "无序列表" }, { name: "insertImage", value: "http://dummyimage.com/160x90", icon: "i-image", title: "插入图片" }, { name: "createLink", value: "createLink", icon: "i-link", title: "插入链接" }, { name: "unlink", value: "", icon: "i-unlink", title: "取消链接" }, { name: "insertHTML", value: "<button >html元素 </button>", icon: "i-html", title: "插入html标签" },
// {name: "insertParagraph", value: "", icon: "插入一段", title: "以相同格式插入一个段落"},
// {name: "justifyFull", value: "", icon: "对齐", title: "对齐"},
// {name: "insertLineDown", value: "", icon: "换行", title: "换行"},
{ name: "save", value: "", icon: "保存" }, { name: "minimize", value: "", icon: "" }];

var RichTextEditor = function (_React$Component) {
    _inherits(RichTextEditor, _React$Component);

    function RichTextEditor(props) {
        _classCallCheck(this, RichTextEditor);

        var _this = _possibleConstructorReturn(this, (RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).call(this, props));

        _this.insertHtmlAtCaret = function (html) {
            var sel = void 0,
                range = void 0;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    // Range.createContextualFragment() would be useful here but is
                    // non-standard and not supported in all browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node = void 0,
                        lastNode = void 0;
                    while (node = el.firstChild) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type !== "Control") {
                // IE < 9
                // document.selection.createRange().pasteHTML(html);
            }
        };

        _this.addFontSize = function (add) {
            var fontSize = 0;
            try {
                var obj = window.getSelection().focusNode.parentElement;
                if (obj.size) {
                    fontSize = Number(obj.size) + add;
                } else {
                    fontSize = (Number(window.getSelection().focusNode.parentElement.style.fontSize.replace("px", "")) - 10) / 2 + add;
                }
            } catch (e) {}
            return fontSize + "";
        };

        _this.state = {
            minimize: _this.props.minimize,
            html: false
        };
        return _this;
    }

    _createClass(RichTextEditor, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var data = this.props.data || this.data;

            var btnList = RichTextBtnList.map(function (i, k) {

                var isShowBtn = i.name === "minimize";
                if (isShowBtn) i.icon = _this2.state.minimize ? _react2.default.createElement(_.Icon, { name: "i-BAI-shangjiantou" }) : _react2.default.createElement(_.Icon, { name: "i-BAI-xiajiantou" });

                var btnName = typeof i.icon === "string" && i.icon.indexOf("i-") > -1 ? _react2.default.createElement(_.Icon, { name: i.icon }) : i.icon;
                return _react2.default.createElement(
                    "button",
                    { className: "ya-richTextBtn " + i.name + " " + _this2.state.minimize, title: i.title, key: k,
                        onClick: !isShowBtn ? _this2.execCommand.bind(_this2, i) : _this2.minimize.bind(_this2)
                    },
                    btnName
                );
            });

            return _react2.default.createElement(
                "div",
                { className: "ya-article" },
                _react2.default.createElement(
                    "h1",
                    { className: "title" },
                    data.title
                ),
                _react2.default.createElement(
                    "div",
                    { className: "info" },
                    _react2.default.createElement(
                        "span",
                        { className: "item tag" },
                        data.tag
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "item author" },
                        _react2.default.createElement(_.Icon, { name: "i-huabanfuben" }),
                        _react2.default.createElement(
                            "span",
                            { className: "authorName" },
                            data.author
                        )
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "item issuingTime" },
                        _react2.default.createElement(_.Icon, { name: "i-shijian1" }),
                        data.issuingTime
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "item readingNum" },
                        _react2.default.createElement(_.Icon, { name: "i-chakan1" }),
                        data.readingNum
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "item commentNum" },
                        _react2.default.createElement(_.Icon, { name: "i-uqur" }),
                        data.commentNum
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "item collectNum" },
                        _react2.default.createElement(_.Icon, { name: "i-shoucang" }),
                        data.collectNum
                    )
                ),
                _react2.default.createElement("div", { className: "ya-content", contentEditable: true, dangerouslySetInnerHTML: { __html: data.content } }),
                _react2.default.createElement(
                    "div",
                    { className: "action" },
                    _react2.default.createElement("div", { className: "like" }),
                    _react2.default.createElement(
                        "div",
                        { className: "enjoy" },
                        " "
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "ya-richText" },
                    _react2.default.createElement(
                        "span",
                        { className: "ya-richTextBtn html true", onClick: this.html.bind(this) },
                        " html"
                    ),
                    this.state.html || btnList
                )
            );
        }

        //最小化富文本工具栏

    }, {
        key: "minimize",
        value: function minimize() {
            this.setState({ minimize: !this.state.minimize });
        }

        //富文本操作

    }, {
        key: "execCommand",
        value: function execCommand(btn) {
            switch (btn.name) {
                case "insertLineDown":
                    this.insertHtmlAtCaret("</br>");
                    break;
                case "addFontSize":
                    document.execCommand("fontSize", true, this.addFontSize(1));
                    break;
                case "cutFontSize":
                    document.execCommand("fontSize", true, this.addFontSize(-1));
                    break;
                case "backColor":
                    document.execCommand(btn.name, true, btn.value);
                    break;
                default:
                    document.execCommand(btn.name, false, btn.value);
            }
        }

        //插入元素


        //选中对象字体大小+1或-1

    }, {
        key: "html",


        //切换html模式
        value: function html(e) {}
    }]);

    return RichTextEditor;
}(_react2.default.Component);

RichTextEditor.defaultProps = {
    data: {
        title: "标题",
        author: "匿名",
        content: "内容",
        tag: "标签",
        issuingTime: "2019年6月12日 17点55分",
        readingNum: 1,
        commentNum: 1,
        collectNum: 1
    },
    minimize: false //最小化工具栏
};
exports.RichTextEditor = RichTextEditor;
//# sourceMappingURL=RichTextEditor.js.map