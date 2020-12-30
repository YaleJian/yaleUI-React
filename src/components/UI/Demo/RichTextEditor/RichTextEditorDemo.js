import React from 'react';
import {RichTextEditor} from '../../../index'
import {Article} from '../../../index'

/**
 * 富文本
 */
const RichTextEditorDemo =()=>{
    let article = {
        title: "标题",
        author: "匿名",
        content: <RichTextEditor content={'请选中编辑文字'}/>,
        tag: "文学",
        issuingTime: "2019年6月12日 17点55分",
        readingNum: 2007,
        commentNum: 188,
        collectNum: 8,
    };
    return <>
        <Article data={article}/>
    </>;
}

export default RichTextEditorDemo;
