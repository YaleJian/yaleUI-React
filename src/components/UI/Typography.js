import React, {Component, useEffect, useState} from 'react';
import {Button, Icon} from "../index";
import {Tree} from "../index";
import {getNavData} from "..";
import {Checkbox} from "../index";
import {Radio} from "../index";

/**
 * 排版
 */
const Typography = ()=> {

    //加载右侧目录
    const [loading, setLoading] = useState(true);
    const [navData, setNavData] = useState([]);
    useEffect(() => {
        if (loading) {
            setNavData(getNavData())
            setLoading(false)
        }
    })
    return <div>
        <Tree treeData={navData}
              treeType={3}
              openBtn={false}
              openLevel={"all"}
              ref={tree => {
                  window.tree = tree
              }}
        />
        <h1 className="ya-title">排版</h1>

        <h2 className="ya-title">颜色</h2>
        <div className="ya-p">
            <h3 className="ya-title">较深的颜色</h3>
            <div className={"ya-flex"}>
                <div className="ya-black margin0-6">黑色</div>
                <div className="ya-grey margin0-6">深灰色</div>
                <div className="ya-red margin0-6">红色</div>
                <div className="ya-green margin0-6">绿色</div>
                <div className="ya-blue margin0-6">蓝色</div>
                <div className="ya-orange margin0-6">橙色</div>
                <div className="ya-purple margin0-6">紫色</div>
                <div className="ya-yellow margin0-6">黄色</div>
            </div>
            <h3 className="ya-title">浅色</h3>
            <div className={"ya-flex"}>
                <div className="ya-white margin0-6">白色</div>
                <div className="ya-light-grey margin0-6">浅灰色</div>
                <div className="ya-light-red margin0-6">红色</div>
                <div className="ya-light-green margin0-6">绿色</div>
                <div className="ya-light-blue margin0-6">蓝色</div>
                <div className="ya-light-orange margin0-6">橙色</div>
                <div className="ya-light-purple margin0-6">紫色</div>
                <div className="ya-light-yellow margin0-6">黄色</div>
            </div>
        </div>
        <h2 className="ya-title">背景</h2>
        <div className="ya-p textDemo">
            <h3 className="ya-title">黑白背景</h3>
            <div className={"ya-flex"}>
                <div className="ya-bg-black ya-white width300 height50 center"/>
                <div className="ya-bg-grey ya-white width300 height50 center"/>
                <div className="ya-bg-light-grey width300 height50 center"/>
                <div className="ya-bg-white width300 height50 center"/>
            </div>

            <h3 className="ya-title">深色的背景</h3>
            <div className={"ya-flex"}>
                <div className="ya-bg-red ya-white width300 height50 center"/>
                <div className="ya-bg-green ya-white width300 height50 center"/>
                <div className="ya-bg-blue ya-white width300 height50 center"/>
                <div className="ya-bg-orange ya-white width300 height50 center"/>
                <div className="ya-bg-purple ya-white width300 height50 center"/>
                <div className="ya-bg-yellow ya-white width300 height50 center"/>
            </div>

            <h3 className="ya-title">浅色的背景</h3>
            <div className={"ya-flex"}>
                <div className="ya-bg-light-red width300 height50 center"/>
                <div className="ya-bg-light-green width300 height50 center"/>
                <div className="ya-bg-light-blue width300 height50 center"/>
                <div className="ya-bg-light-orange width300 height50 center"/>
                <div className="ya-bg-light-purple ya-white width300 height50 center"/>
                <div className="ya-bg-light-yellow ya-white width300 height50 center"/>
            </div>

            <h3 className="ya-title">高斯模糊的背景</h3>
            <div className={"ya-flex"}>
                <div
                     style={{"background": "url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3562402085,653512730&fm=26&gp=0.jpg) center no-repeat"}}>
                    <div className="ya-bg-blur ya-white padding0-10 height50 center">模糊五彩的图片</div>
                </div>
            </div>
        </div>
        <h2 className="ya-title">边框</h2>
        <div className="ya-p textDemo">
            <h3 className="ya-title">内置边框颜色</h3>
            <div className={"ya-flex"}>
                <div className="ya-border-black padding16 margin6"/>
                <div className="ya-border-grey padding16 margin6"/>
                <div className="ya-border-red padding16 margin6"/>
                <div className="ya-border-blue padding16 margin6"/>
                <div className="ya-border-orange padding16 margin6"/>
                <div className="ya-border-purple padding16 margin6"/>
                <div className="ya-border-yellow padding16 margin6"/>
            </div>
        </div>
        <h2 className="ya-title">圆角</h2>
        <div className="ya-p ya-flex">
            <div className="ya-border radius4 padding6 margin10">圆角4px</div>
            <div className="ya-border radius10 padding6 margin10">圆角10px</div>
            <div className="ya-border radius16 padding6 margin10">圆角16px</div>
            <div className="ya-border radius50 height36 width36 center margin10">圆</div>
        </div>
        <h2 className="ya-title">组合</h2>
        <div className="ya-p textDemo">
            <h3 className="ya-title">白色文字+背景颜色</h3>
            <div className={"ya-flex"}>
                <div className="ya-bg-black ya-white width300 height50 center">黑色</div>
                <div className="ya-bg-grey ya-white width300 height50 center">灰色</div>
                <div className="ya-bg-red ya-white width300 height50 center">红色</div>
                <div className="ya-bg-green ya-white width300 height50 center">绿色</div>
                <div className="ya-bg-blue ya-white width300 height50 center">蓝色</div>
                <div className="ya-bg-orange ya-white width300 height50 center">橙色</div>
                <div className="ya-bg-purple ya-white width300 height50 center">紫色</div>
                <div className="ya-bg-yellow ya-white width300 height50 center">黄色</div>
            </div>
            <div className={"ya-flex"}>
                <div className="ya-bg-white ya-white width300 height50 center">白色</div>
                <div className="ya-bg-light-grey ya-white width300 height50 center">浅灰色</div>
                <div className="ya-bg-light-red ya-white width300 height50 center">红色</div>
                <div className="ya-bg-light-green ya-white width300 height50 center">绿色</div>
                <div className="ya-bg-light-blue ya-white width300 height50 center">蓝色</div>
                <div className="ya-bg-light-orange ya-white width300 height50 center">橙色</div>
                <div className="ya-bg-light-purple ya-white width300 height50 center">紫色</div>
                <div className="ya-bg-light-yellow ya-white width300 height50 center">黄色</div>
            </div>
            <h3 className="ya-title">黑色文字+背景颜色</h3>
            <div className={"ya-flex"}>
                <div className="ya-bg-black ya-black width300 height50 center">黑色</div>
                <div className="ya-bg-grey ya-black width300 height50 center">灰色</div>
                <div className="ya-bg-red ya-black width300 height50 center">红色</div>
                <div className="ya-bg-green ya-black width300 height50 center">绿色</div>
                <div className="ya-bg-blue ya-black width300 height50 center">蓝色</div>
                <div className="ya-bg-orange ya-black width300 height50 center">橙色</div>
                <div className="ya-bg-purple ya-black width300 height50 center">紫色</div>
                <div className="ya-bg-yellow ya-black width300 height50 center">黄色</div>
            </div>
            <div className={"ya-flex"}>
                <div className="ya-bg-white ya-black width300 height50 center">白色</div>
                <div className="ya-bg-light-grey ya-black width300 height50 center">浅灰色</div>
                <div className="ya-bg-light-red ya-black width300 height50 center">红色</div>
                <div className="ya-bg-light-green ya-black width300 height50 center">绿色</div>
                <div className="ya-bg-light-blue ya-black width300 height50 center">蓝色</div>
                <div className="ya-bg-light-orange ya-black width300 height50 center">橙色</div>
                <div className="ya-bg-light-yellow ya-black width300 height50 center">黄色</div>
                <div className="ya-bg-light-purple ya-black width300 height50 center">紫色</div>
            </div>
            <h3 className="ya-title">彩色文字+浅色背景颜色</h3>
            <div className={"ya-flex"}>
                <div className="ya-bg-light-grey ya-grey width300 height50 center">灰色</div>
                <div className="ya-bg-light-red ya-red width300 height50 center">红色</div>
                <div className="ya-bg-light-green ya-green width300 height50 center">绿色</div>
                <div className="ya-bg-light-blue ya-blue width300 height50 center">蓝色</div>
                <div className="ya-bg-light-orange ya-orange width300 height50 center">橙色</div>
                <div className="ya-bg-light-purple ya-purple width300 height50 center">紫色</div>
                <div className="ya-bg-light-yellow ya-yellow width300 height50 center">黄色</div>
            </div>

            <h3 className="ya-title">文字+边框（边框使用currentColor属性）</h3>
            <div className={"ya-flex"}>
                <div className="ya-border ya-black padding6 margin4">文字</div>
                <div className="ya-border ya-grey padding6 margin4">文字</div>
                <div className="ya-border ya-red padding6 margin4">文字</div>
                <div className="ya-border ya-blue padding6 margin4">文字</div>
                <div className="ya-border ya-orange padding6 margin4">文字</div>
                <div className="ya-border ya-purple padding6 margin4">文字</div>
                <div className="ya-border ya-yellow padding6 margin4">文字</div>
            </div>
            <h2 className="ya-title">文字+圆角边框</h2>
            <div className="ya-flex">
                <div className="ya-border ya-blue radius4 padding6 margin4">圆角4px</div>
                <div className="ya-border ya-green radius10 padding6 margin4">圆角10px</div>
                <div className="ya-border ya-orange radius16 padding6 margin4">圆角16px</div>
                <div className="ya-border ya-red radius50 height36 width36 center margin4">圆</div>
            </div>
            <h2 className="ya-title">文字+浅色背景+边框</h2>
            <div className="ya-flex">
                <div className="ya-border ya-black ya-bg-light-black padding6 margin4">文字</div>
                <div className="ya-border ya-black ya-bg-light-grey padding6 margin4">文字</div>
                <div className="ya-border ya-grey ya-bg-light-grey padding6 margin4">文字</div>
                <div className="ya-border ya-red ya-bg-light-red padding6 margin4">文字</div>
                <div className="ya-border ya-green ya-bg-light-green padding6 margin4">文字</div>
                <div className="ya-border ya-blue ya-bg-light-blue padding6 margin4">文字</div>
                <div className="ya-border ya-orange ya-bg-light-orange padding6 margin4">文字</div>
                <div className="ya-border ya-purple ya-bg-light-purple padding6 margin4">文字</div>
                <div className="ya-border ya-yellow ya-bg-light-yellow padding6 margin4">文字</div>
            </div>
        </div>
        <h2 className="ya-title">标题</h2>
        <div className="ya-p">
            <h1>h1标题</h1>
            <h2>h2标题</h2>
            <h3>h3标题</h3>
            <h4>h4标题</h4>
            <h5>h5标题</h5>
            <h6>h6标题</h6>
        </div>
        <h2 className="ya-title">标签默认样式</h2>
        <div className="ya-p">
            <mark>标记</mark>
            <br/>
            <code>代码</code>
            <br/>
            <u>下划线</u>
            <br/>
            <del>删除线</del>
            <br/>
            <strong>粗体</strong>
            <br/>
        </div>

        <h2 className="ya-title">对齐方式</h2>
        <div className="ya-p">
            <div className="ya-flex center">
                <div className="ya-flex-1 ya-bg-blue ya-white">ya-flex-1</div>
                <div className="ya-flex-auto ya-bg-green ya-white">ya-flex-auto</div>
                <div className="ya-flex-2 ya-bg-orange ya-white">ya-flex-2</div>
                <div className="ya-flex-3 ya-bg-blue ya-white">ya-flex-3</div>
                <div className="ya-flex-4 ya-bg-green ya-white">ya-flex-4</div>
                <div className="ya-flex-5 ya-bg-orange ya-white">ya-flex-5</div>
                <div className="ya-flex-6 ya-bg-blue ya-white">ya-flex-6</div>
            </div>
            <br/>
            <div className="ya-flex center">
                <div className="ya-flex-1 ya-bg-blue ya-white height20">ya-flex-1</div>
                <div className="ya-flex-auto ya-bg-green ya-white height50">ya-flex-auto</div>
                <div className="ya-flex-3 ya-bg-orange ya-white height20">ya-flex-3</div>
            </div>
            <br/>
            <div className="ya-flex align-center center">
                <div className="ya-flex-1 ya-bg-green ya-white height20">ya-flex-1</div>
                <div className="ya-flex-auto ya-bg-blue ya-white height50">ya-flex-auto</div>
                <div className="ya-flex-4 ya-bg-orange ya-white height20">ya-flex-4</div>
            </div>
            <br/>
            <div className="ya-flex align-bottom center">
                <div className="ya-flex-1 ya-bg-green ya-white height20">ya-flex-1</div>
                <div className="ya-flex-auto ya-bg-blue ya-white height50">ya-flex-auto</div>
                <div className="ya-flex-5 ya-bg-orange ya-white height20">ya-flex-5</div>
            </div>
        </div>


        <h2 className="ya-title">图标</h2>
        <div className="ya-p">
            <Icon name="i-chakan"/>彩色图标<br/>
            <Icon name="i-BAI-wuzi"/>单色图标<br/>
            <Icon name="i-BAI-zan" className={" ya-purple"}/>自定义颜色图标<br/>
        </div>
        <h2 className="ya-title">多选框</h2>
        <div className="ya-p checkboxDemo">
            <div>
                <Checkbox select={1}>未选中</Checkbox>
                <Checkbox select={2} className={"ya-orange"}>选中</Checkbox>
                <Checkbox select={3} className={"ya-blue"}>半选</Checkbox>
            </div>
        </div>

        <h2 className="ya-title">单选框</h2>
        <div className="ya-p">
            <Radio>单选框</Radio>
            <Radio className={"ya-red"}>单选框</Radio>
            <Radio className={"ya-green"}>单选框</Radio>
        </div>
        <h2 className="ya-title">索引（面包屑导航）</h2>
        <div className="ya-p">
            <div className="ya-indexBar">
                <span className="item"><Icon name="i-BAI-wuzi"/></span>
                <span className="item animated fastest fadeInLeft">节点node 8</span>
                <span className="item animated fastest fadeInLeft">节点node 8-1</span>
                <span className="item animated fastest fadeInLeft">节点node 8-1-5</span>
                <span className="item animated fastest fadeInLeft">节点node 8-1-5-14</span>
            </div>
        </div>

    </div>;
}

export default Typography;
