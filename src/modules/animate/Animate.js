import React, {Component} from 'react';

/**
 * 动画
 */
class Animate extends Component {

    render() {
        return <>
            <h1 className="ya-title">加载动画</h1>
            <div className="ya-p">
                <div className={"ya-animation-1"}>
                    LOADING...
                </div>
            </div>
            <div className="ya-p">
                <div className={"ya-animation-2"}/>
            </div>
            <div className="ya-p">
                <div className="loader"/>
            </div>
            <div className="ya-p">
                <div className="loader1">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
            <div className="ya-p">
                <div className="loader2"/>
            </div>
            <div className="ya-p">
                <div className="loader3"><span/><span/></div>
            </div>
            <div className="ya-p">
                <div className="loader4"/>
            </div>
            <div className="ya-p">
                <div className="loader5"/>
            </div>
            <div className="ya-p">
                <div className="loader6"/>
            </div>
            <div className="ya-p">
                <div className="loader7"/>
            </div>
            <div className="ya-p">
                <div className="loader8"/>
            </div>
            <div className="ya-p">
                <div className="loader9"/>
            </div>

        </>;
    }
}

export default Animate;
