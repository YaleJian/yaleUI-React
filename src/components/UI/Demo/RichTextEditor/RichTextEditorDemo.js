import React, {Component} from 'react';
import {RichTextEditor} from '../../../index'

const article = {
    title: "标题",
    author: "匿名",
    content: '请选中编辑文字',
    tag: "文学",
    issuingTime: "2019年6月12日 17点55分",
    readingNum: 2007,
    commentNum: 188,
    collectNum: 8,
};

/**
 * 富文本
 */
class RichTextEditorDemo extends Component {
    render() {
        return <RichTextEditor data={article}/>;
    }
}

export default RichTextEditorDemo;
