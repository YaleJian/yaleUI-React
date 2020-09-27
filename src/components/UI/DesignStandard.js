import React, {useEffect, useRef, useState} from 'react';
import {getNavData, Tree} from "..";

/**
 * 设计规范
 */
const DesignStandard= ()=> {

    //加载右侧目录
    const [loading, setLoading] = useState(true);
    const [navData, setNavData] = useState([]);
    useEffect(() => {
        if (loading) {
            setNavData(getNavData())
            setLoading(false)
        }
    },[loading])
    const tree = useRef();
    return <div>
        <Tree treeData={navData}
              treeType={3}
              openBtn={false}
              openLevel={"all"}
              ref={tree}
        />
        <h1>设计规范</h1>
        <h2 className="ya-title">无障碍设计</h2>
        <div className="ya-p">
            <div>
                1.操作无障碍：对于操作有障碍场景时，在设计每一个UI组件的时候，充分考虑无指针输入例如鼠标、无键盘输入的情况、有指针输入设备会键盘时如何反馈，
                移动设备通常只有触摸输入，触摸输入时如何反馈。
            </div>
            <div>
                2.视觉无障碍：对于视力障碍用户，确保有足够的色彩对比度
            </div>
        </div>
        <h2 className="ya-title">偶数数值</h2>
        <div className="ya-p">尽量使用偶数数值，因为某些布局计算的时候，奇数/2会造成多出一个像素。</div>
        <h2 className="ya-title">移动优先</h2>
        <div className="ya-p">竖版小尺寸移动网页和横版大尺寸网页占有率平分秋色，优先考虑移动优先能够加速适配开发。</div>
        <h2 className="ya-title">少即是多</h2>
        <div className="ya-p">尽量简洁的代码和设计，才是更成熟的。</div>
    </div>;
}

export default DesignStandard;
