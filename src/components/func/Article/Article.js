import React from "react"
import {Icon} from "../..";
import "./article.css"
/**
 * 文章
 */
const Article = (props) => {

    let data = props.data;
    return <div className="ya-article">
        <h1 className="title">{data.title}</h1>
        <div className="info">
            <span className="item author"><span className="authorName">@{data.author}</span></span>
            <span className="item issuingTime"><Icon name="i-shijian1"/>发表时间 {data.issuingTime}</span>
            <span className="item readingNum"><Icon name="i-chakan1"/>阅读 {data.readingNum}</span>
            <span className="item commentNum"><Icon name="i-uqur"/>评论 {data.commentNum}</span>
            <span className="item collectNum"><Icon name="i-shoucang"/>收藏 {data.collectNum}</span>
        </div>
        {data.content}
        <div className="action">
            <div className="like"/>
            <div className="enjoy"> </div>
        </div>
    </div>
}
export {Article}