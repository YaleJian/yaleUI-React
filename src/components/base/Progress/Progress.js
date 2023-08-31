import React, {createRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import './progress.css'
import {createRoot} from "react-dom/client";

let ProgressBox = forwardRef((props, ref) => {

        const [show, setShow] = useState(false)

        // 开始显示
        let start = () => setShow(true)

        // 结束隐藏
        let done = () => setShow(false)

        useImperativeHandle(ref, () => ({start, done}))
        return (
            <div className={"ya-progress"}>
                <div className="progress" style={show ? {display: 'block'} : {display: 'none'}}>
                    <div className="bar" style={show ? {width: '99%'} : {width: '0'}}>
                        <div className="peg"></div>
                    </div>
                </div>
            </div>
        )
    }
)

// 创建元素追加到body
let progress = document.createElement('ya-progress');
document.body.appendChild(progress);

let ref = createRef()
createRoot(progress).render(<ProgressBox ref={ref}/>)

let Progress = {
    start: () => ref.current.start()
}
export {Progress};