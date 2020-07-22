import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './progress.css'

let defaultState = {show: false};

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {...defaultState}
    }

    // 开始显示
    start() {
        this.setState({
            show: true
        })
    }

    // 结束隐藏
    done() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="progress" style={this.state.show ? {display: 'block'} : {display: 'none'}}>
                <div className="bar" style={this.state.show ? {width: '99%'} : {width: '0'}}>
                    <div className="peg"> </div>
                </div>
                {/*<div className="spinner">*/}
                {/*    <div className="spinner-icon"> </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

// 创建元素追加到body
let progress = document.createElement('ya-progress');
document.body.appendChild(progress);

let box = ReactDOM.render(<Progress/>, progress);
export default box;