import React, {Component} from 'react';

/**
 * 设计规范
 */
class DesignStandard extends Component {

    render() {
        return <React.Fragment>
            <h1>设计规范</h1>
            <h2>无障碍设计</h2>
            <div className="ya-p">
                <div>
                    1.操作无障碍：对于操作有障碍场景时，在设计每一个UI组件的时候，充分考虑无指针输入例如鼠标、无键盘输入的情况、有指针输入设备会键盘时如何反馈，
                    移动设备通常只有触摸输入，触摸输入时如何反馈。
                </div>
                <div>
                    2.视觉无障碍：对于视力障碍用户，确保有足够的色彩对比度
                </div>
            </div>
            <h2>偶数数值</h2>
            <div>尽量使用偶数数值，因为某些布局计算的时候，奇数/2会造成多出一个像素。</div>
            <h2>移动优先</h2>
            <div>竖版小尺寸移动网页和横版大尺寸网页占有率平分秋色，优先考虑移动优先能够加速适配开发。</div>
            <h2>少即是多</h2>
            <div>尽量简洁的代码和设计，才是更成熟的。</div>
        </React.Fragment>;
    }
}

export default DesignStandard;
