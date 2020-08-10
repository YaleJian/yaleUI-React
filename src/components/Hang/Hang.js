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
        let contentClass = "ya-hang-content " + this.props.className + (this.state.mini ? "" : "animated fastest fadeInDownSmall");
        return (
            <div className={"ya-hang "}>
                <div className={contentClass}>
                    <div className={""} hidden={this.state.mini}>
                        {this.props.children}
                    </div>
                    <div className={"ya-hang-mini"} onClick={this.setMini.bind(this)}
                         style={this.state.mini ? {"display": "block"} : {}}>
                        <div className={"line"}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(()=> {
            if(!this.state.mini) this.setState({mini : true});
        }, 8000);
    }

    setMini() {
        this.setState({mini: !this.state.mini})
    }
}

export {Hang}