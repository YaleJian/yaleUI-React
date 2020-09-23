import React, { Component } from 'react';
import {Menu} from "./Menu";
const Main =(props)=>{

    return (
        <div className={"ya-main " + (props.className || "")}>
            <Menu indexId={1} indexId={props.indexId} menuData={props.menuData}/>
            <div className={"ya-main-contain"}>{props.children}</div>
        </div>
    )

}

export {Main};