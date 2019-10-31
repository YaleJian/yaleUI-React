import React, {Component} from 'react';
import Icon from "../../modules/utils/Icon";
import Button from "../../modules/Button/Button";

class Header extends Component {

    static defaultProps = {
        title: "",
        className:"",
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"ya-header ya-nav-simple ya-fixed " + this.props.className}>
                <a href={"/"}><Icon name={"i-logo"}/></a>
                <span className={"name"}>{this.props.children}</span>
            </div>
        );
    }
}

export default Header;
