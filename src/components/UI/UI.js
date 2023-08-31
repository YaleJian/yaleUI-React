import React from 'react';
import ButtonDemo from "./Demo/Button/ButtonDemo";
import TreeDemo from "./Demo/Tree/TreeDemo";
import {Route, Routes, useLocation, useMatch} from "react-router";
import {Animate, Brand, CloudDrive} from "../index";
import DesignStandard from "./DesignStandard";
import Typography from "./Typography";
import RichTextEditorDemo from "./Demo/RichTextEditor/RichTextEditorDemo";
import InputDemo from "./Demo/Input/InputDemo";
import MessageDemo from "./Demo/Message/MessageDemo";
import DatepickerDemo from "./Demo/Datepicker/DatepickerDemo";
import PaginationDemo from "./Demo/Pagination/PaginationDemo";
import ChartDemo from "./Demo/Chart/ChartDemo";
import {Header, Main} from "..";
import WeatherDemo from "./Demo/Weather/WeatherDemo";

const menuData = [
    {id: "designStandard", name: "设计规范", link: "/ui/designStandard", sort: 1},
    {id: "typography", name: "排版", link: "/ui/typography", sort: 2},
    {id: "base", name: "基础组件", sort: 3},
    {id: "button", name: "按钮", parentId: "base", link: "/ui/button", sort: 3},
    {id: "input", name: "输入框和选择框", parentId: "base", link: "/ui/input", sort: 6},
    {id: "message", name: "提示", parentId: "base", link: "/ui/message", sort: 7},
    {id: "tree", name: "树组件", parentId: "base", link: "/ui/tree", sort: 8},
    {id: "func", name: "功能组件", link: "/ui/tree", sort: 8},
    {id: "date", name: "日期", parentId: "func", link: "/ui/date", sort: 9},
    {id: "pagination", name: "分页", parentId: "func", link: "/ui/pagination", sort: 10},
    {id: "richTextEditor", name: "富文本编辑器", parentId: "func", link: "/ui/richTextEditor", sort: 11},
    {id: "weather", name: "天气", parentId: "func", link: "/ui/weather", sort: 12},
    {id: "cloudDrive", name: "云盘", parentId: "func", link: "/ui/cloudDrive", sort: 13},
    {id: "animation", name: "动画", link: "/ui/animation", sort: 14},
    {id: "chart", name: "图表", link: "/ui/chart", sort: 15},
    {id: "map", name: "地图", link: "/ui/map", sort: 16},
];

/**
 * API文档
 */
const UI = () => {

    let path = '/ui';

    let pages = <>
        <Routes>
            <Route exact path={"*"} element={<DesignStandard/>}/>
            <Route path={`${path}/designStandard`} element={<DesignStandard/>}/>
            <Route path={`${path}/typography`} element={<Typography/>}/>
            <Route path={`${path}/animation`} element={<Animate/>}/>
            <Route path={`${path}/tree`} element={<TreeDemo/>}/>
            <Route path={`${path}/richTextEditor`} element={<RichTextEditorDemo/>}/>
            <Route path={`${path}/cloudDrive`} element={<CloudDrive/>}/>
            <Route path={`${path}/button`} element={<ButtonDemo/>}/>
            <Route path={`${path}/input`} element={<InputDemo/>}/>
            <Route path={`${path}/message`} element={<MessageDemo/>}/>
            <Route path={`${path}/date`} element={<DatepickerDemo/>}/>
            <Route path={`${path}/pagination`} element={<PaginationDemo/>}/>
            <Route path={`${path}/map`} element={""}/>
            <Route path={`${path}/chart`} element={<ChartDemo/>}/>
            <Route path={`${path}/weather`} element={<WeatherDemo/>}/>
        </Routes>
    </>;


    let pathname= useLocation().pathname;
    let indexId = pathname.substring(pathname.lastIndexOf("/") + 1);
    if (indexId === 'ui') indexId = menuData[0].id;

    return (
        <>
            <Brand/>
            <Header/>
            <Main menuData={menuData} indexId={indexId}>
                {pages}
            </Main>
        </>
    );

}

export {UI};
