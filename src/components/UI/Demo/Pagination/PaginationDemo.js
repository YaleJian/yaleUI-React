import React, {useState} from "react";
import {Pagination} from "../../../index";

const PaginationDemo = () => {

    const [page, set_page] = useState(0)

    return <div>
        <h1>分页</h1>
        <div className={"ya-p"}>
            <Pagination getPage={set_page.bind(this)} total={1000} page={2}/>
        </div>
    </div>
}
export default PaginationDemo