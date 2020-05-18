import React from 'react';
import './eatToday.css'
import Header from "../common/Header";
import Main from "../common/Main";
import Button from "../../modules/Button/Button";
class EatToday extends React.Component{

    render() {
        return <>
            <Header children={"今天吃什么"} className={"center"}/>
            <Main>
                <div className={"ya-eatToday"}>
                    <div className={"make"}>
                        <Button content={"生成菜谱"}/>
                    </div>
                    <div>今日菜谱</div>
                    <div>

                    </div>
                    <Button content={"保存今日菜谱"}/>
                </div>
            </Main>
        </>;
    }
}
export default EatToday;