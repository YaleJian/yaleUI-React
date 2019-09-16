import React from 'react';
import "./richTextEditor.css";
import Icon from "../utils/Icon";

const RichTextBtnList = [
    {name: "undo", value: "", icon: "i-undo", title: "前进"},
    {name: "redo", value: "", icon: "i-redo", title: "后退"},
    {name: "removeFormat", value: "", icon: "i-removeFormat"},
    {name: "formatBlock", value: "<h1>", icon: "h1"},
    {name: "formatBlock", value: "<h2>", icon: "h2"},
    {name: "formatBlock", value: "<h3>", icon: "h3"},
    {name: "formatBlock", value: "<h4>", icon: "h4"},
    {name: "formatBlock", value: "<h4>", icon: "h4"},
    // {name: "fontName", value: "宋体", icon: "i-font", title: "调整字体"},
    {name: "bold", value: "bold", icon: "i-bold", title: "加粗"},
    {name: "italic", value: "", icon: "i-italic", title: "斜体"},
    {name: "addFontSize", value: "", icon: "i-addFontSize", title: "字体增大"},
    {name: "cutFontSize", value: "", icon: "i-cutFontSize", title: "字体减少"},
    {name: "foreColor", value: "#009688", icon: "i-fColor", title: "字体颜色"},
    {name: "backColor", value: "#daf5f1", icon: "i-background", title: "背景"},
    {name: "justifyCenter", value: "", icon: "i-justifyCenter", title: "居中"},
    {name: "justifyLeft", value: "", icon: "i-justifyLeft", title: "居左"},
    {name: "justifyRight", value: "", icon: "i-justifyRight", title: "居右"},
    {name: "formatBlock", value: "<blockquote>", icon: "i-quote", title: "引用"},
    // {name: "indent", value: "indent", icon: "i-leftIndent", title: "增加缩进"},
    // {name: "outdent", value: "", icon: "i-rightIndent", title: "减少缩进"},
    {name: "insertHorizontalRule", value: "", icon: "i-line", title: "分割线"},
    {name: "strikeThrough", value: "", icon: "i-strikeThrough", title: "删除线"},
    {name: "underline", value: "", icon: "i-underline", title: "下划线"},
    {name: "superscript", value: "", icon: "i-superscript", title: "上标"},
    {name: "subscript", value: "", icon: "i-subscript", title: "下标"},
    {name: "insertOrderedList", value: "", icon: "i-ul", title: "有序列表"},
    {name: "insertUnorderedList", value: "", icon: "i-ol", title: "无序列表"},
    {name: "insertImage", value: "http://dummyimage.com/160x90", icon: "i-image", title: "插入图片"},
    {name: "createLink", value: "createLink", icon: "i-link", title: "插入链接"},
    {name: "unlink", value: "", icon: "i-unlink", title: "取消链接"},
    {name: "insertHTML", value: "<button >html元素 </button>", icon: "i-html", title: "插入html标签"},
    // {name: "insertParagraph", value: "", icon: "插入一段", title: "以相同格式插入一个段落"},
    // {name: "justifyFull", value: "", icon: "对齐", title: "对齐"},
    // {name: "insertLineDown", value: "", icon: "换行", title: "换行"},
    {name: "save", value: "", icon: "保存"},
    {name: "minimize", value: "", icon: ""},
];

class RichTextEditor extends React.Component {
    static defaultProps = {
        data: {
            title: "标题",
            author: "匿名",
            content: "内容",
            tag: "标签",
            issuingTime: "2019年6月12日 17点55分",
            readingNum: 1,
            commentNum: 1,
            collectNum: 1,
        },
        minimize: false,//最小化工具栏
    };
    selection;

    constructor(props) {

        super(props);

        this.state = {
            minimize: this.props.minimize,
            html: false,
        }
    }

    render() {
        let data = this.props.data || this.data;

        let btnList = RichTextBtnList.map((i, k) => {

            let isShowBtn = i.name === "minimize";
            if (isShowBtn) i.icon = this.state.minimize ? <Icon name="i-BAI-shangjiantou"/> : <Icon name="i-BAI-xiajiantou"/>;

            let btnName = typeof i.icon === "string" && i.icon.indexOf("i-") > -1 ? <Icon name={i.icon}/> : i.icon;
            return <button className={"ya-richTextBtn " + i.name + " " + this.state.minimize} title={i.title} key={k}
                           onClick={!isShowBtn ? this.execCommand.bind(this, i) : this.minimize.bind(this)}
            >{btnName}</button>;
        });

        return <div className="ya-article">
            <h1 className="title">{data.title}</h1>
            <div className="info">
                <span className="item tag">{data.tag}</span>
                <span className="item author"><Icon name="i-huabanfuben"/><span className="authorName">{data.author}</span></span>
                <span className="item issuingTime"><Icon name="i-shijian1"/>{data.issuingTime}</span>
                <span className="item readingNum"><Icon name="i-chakan1"/>{data.readingNum}</span>
                <span className="item commentNum"><Icon name="i-uqur"/>{data.commentNum}</span>
                <span className="item collectNum"><Icon name="i-shoucang"/>{data.collectNum}</span>
            </div>
            <div className="ya-content" contentEditable={true} dangerouslySetInnerHTML={{__html: data.content}}/>
            <div className="action">
                <div className="like"/>
                <div className="enjoy"> </div>
            </div>
            <div className="ya-richText">
                <span className="ya-richTextBtn html true" onClick={this.html.bind(this)}> html</span>
                {this.state.html || btnList}
            </div>
        </div>
    }

    //最小化富文本工具栏
    minimize() {
        this.setState({minimize: !this.state.minimize});
    }

    //富文本操作
    execCommand(btn) {
        switch (btn.name) {
            case "insertLineDown" :
                this.insertHtmlAtCaret("</br>");
                break;
            case "addFontSize" :
                document.execCommand("fontSize", true, this.addFontSize(1));
                break;
                case "cutFontSize" :
                document.execCommand("fontSize", true, this.addFontSize(-1));
                break;
            case "backColor"  :
                document.execCommand(btn.name, true, btn.value);
                break;
            default :
                document.execCommand(btn.name, false, btn.value);
        }
    }

    //插入元素
    insertHtmlAtCaret = (html) => {
        let sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                let el = document.createElement("div");
                el.innerHTML = html;
                let frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
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

    //选中对象字体大小+1或-1
    addFontSize = (add) =>{
        let fontSize = 0;
        try {
            let obj = window.getSelection().focusNode.parentElement;
            if (obj.size) {
                fontSize = Number(obj.size) + add;
            } else {
                fontSize = (Number(window.getSelection().focusNode.parentElement.style.fontSize.replace("px", ""))  - 10 ) / 2 + add;
            }
        } catch (e) {
        }
        return fontSize + "";
    };

    //切换html模式
    html(e) {

    }


}

export default RichTextEditor;