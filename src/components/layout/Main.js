import React from 'react';
import {Menu} from "./Menu";
const Main =(props)=>{

    return (
        <div className={"ya-main " + (props.className || "")}>
            <Menu indexId={props.indexId || 1} menuData={props.menuData}/>
            <div className={"ya-main-contain"}>{props.children}</div>
        </div>
    )

}

export {Main};