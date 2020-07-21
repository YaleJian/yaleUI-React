import React from "react";
import {Pagination} from "./Pagination";
class PaginationDemo extends React.Component{
    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {
            page : 1
        }
    }

    render() {
        return <div>
            <Pagination getPage={this.getPage.bind(this)} total={10} page={1}/>
        </div>
    }

    getPage = (page)=>{
        this.setState({page});
    }

}
export {PaginationDemo}