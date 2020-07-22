import React, {Component} from 'react';
import {axios} from "../../components";

/**
 * 测试
 */
class Test extends Component {

    render() {
        this.Test();
        return <React.Fragment>

        </React.Fragment>;
    }

    Test(){
        axios.post('/service/user/register', {}, {withCredentials: true})
            .then((res) => {

            })
            .catch(function (res) {
                console.log(res);
            });
    }
}

export default Test;
