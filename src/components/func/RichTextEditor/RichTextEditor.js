import React, {useState} from 'react';
import "./richTextEditor.css";
import {Button, Icon, Input} from "../../index";

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
    {name: "fontSize", value: 1, icon: "i-fontSize", title: "字体大小"},
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
    {name: "blankLine", icon:"空行",value: "<div/>"},
    // {name: "insertParagraph", value: "", icon: "插入一段", title: "以相同格式插入一个段落"},
    // {name: "justifyFull", value: "", icon: "对齐", title: "对齐"},
    // {name: "insertLineDown", value: "", icon: "换行", title: "换行"},
];

const RichTextEditor = (props) => {

    const [minimize, set_minimize] = useState(false);
    const [html, ser_html] = useState("");

    //插入元素
    let insertHtmlAtCaret = (html) => {
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

    //富文本操作
    let execCommand = (btn) => {
        switch (btn.name) {
            case "insertLineDown" :
                insertHtmlAtCaret("</br>");
                break;
            case "fontSize" :
                document.execCommand("fontSize", true, 1);
                break;
            case "backColor"  :
                document.execCommand(btn.name, true, btn.value);
                break;
            case "blankLine"  :
                window.getSelection().focusNode.insertBefore(btn.value)
                break;
            default :
                document.execCommand(btn.name, false, btn.value);
        }
    }

    //切换html模式
    let htmlView = () => {

    }
    let btnList = [];
    if (minimize) {
        btnList.push(<Button icon={"i-BAI-shangjiantou"} onClick={() => set_minimize(!minimize)}/>)
    } else {
        btnList = RichTextBtnList.map((i, k) => {

            switch (i.name) {
                case "fontSize":
                    let dropData = ["12px","16px","18px","20px","24px"]
                    return <Input className="page radius6" type={"select"} dropDownBoxData={dropData}
                                   autoContent={true}
                                  onChange={execCommand.bind(this)} selectIcon={false}/>
                default:
                    let btnName = i.icon.indexOf("i-") > -1 ? <Icon name={i.icon}/> : i.icon;
                    return <button className={`ya-richTextBtn ${i.name}`} title={i.title} key={k}
                                   onClick={execCommand.bind(this, i)}>{btnName}</button>;
            }

        });
        btnList.push(<Button color={"red"}>保存</Button>)
        btnList.push(<Button icon={"i-BAI-xiajiantou"} onClick={() => set_minimize(!minimize)}/>)
    }
    return <div>
        <div className="ya-content" contentEditable={true} dangerouslySetInnerHTML={{__html: props.content}}/>
        <div className="ya-richText">
            <span className="ya-richTextBtn html true" onClick={htmlView.bind(this)}> html</span>
            {html || btnList}
        </div>
    </div>
}

export {RichTextEditor};