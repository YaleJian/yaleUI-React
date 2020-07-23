import React, {Component} from 'react';
import Progress from "../../components/Progress/Progress";

/**
 * 测试
 */
class Test extends Component {

    componentDidMount() {
        this.Test();
    }

    render() {
        return <React.Fragment>

        </React.Fragment>;
    }

    Test(){
        Progress.start();
    }
}

export default Test;
