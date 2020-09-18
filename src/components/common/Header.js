import React, {Component} from 'react';
import "./header.css";

class Header extends Component {

    static defaultProps = {
        className: "",
        occupied: true
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="ya-header ya-fixed">
                {this.props.children}
            </div>
        );
    }
}

export {Header};
