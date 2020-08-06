import React from 'react';
import "./Hang.css"

/**
 * 悬挂部件
 */
class Hang extends React.Component {
    static defaultProps = {
        className: "",
    }

    constructor(props) {
        super(props);
        this.state = {
            mini: false,
        }
    }

    render() {

        return (
            <div className={"ya-hang " + (this.state.mini ? "" : "animated fastest fadeInDownSmall")}>
                <div className={"ya-hang-content " + this.props.className} hidden={this.state.mini}>
                    {this.props.children}
                </div>
                <div className={"ya-hang-mini"} onClick={this.setMini.bind(this)}
                     style={this.state.mini ? {"display": "block"} : {}}>
                    <div className={"line"}/>
                </div>
            </div>
        );
    }

    setMini() {
        this.setState({mini: !this.state.mini})
    }
}

export {Hang}