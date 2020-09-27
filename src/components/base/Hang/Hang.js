import React, {useEffect, useState} from 'react';
import "./Hang.css"

/**
 * 悬挂部件
 */
const Hang = (props) => {
    const [mini, set_mini] = useState(false)

    useEffect(() => {
        if(!props.autoHide || typeof props.autoHide === 'number') {
            setTimeout(() => {
                if (!mini) set_mini(true);
            }, typeof props.autoHide === 'number'? props.autoHide : 8000);
        }
    },[mini,props.autoHide])

    let contentClass = "ya-hang-content " + props.className + (mini ? "" : "animated fastest fadeInDownSmall");
    return (
        <div className={"ya-hang "}>
            <div className={contentClass}>
                <div className={""} hidden={mini}>
                    {props.children}
                </div>
                <div className={"ya-hang-mini"} onClick={() => set_mini(!mini)}
                     style={mini ? {"display": "block"} : {}}>
                    <div className={"line"}/>
                </div>
            </div>
        </div>
    );

}

export {Hang}