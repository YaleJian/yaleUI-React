import React, {useState} from "react";
import {Pagination} from "../../../index";

const PaginationDemo = () => {

    const [page, set_page] = useState(2)

    return <div>
        <h1>分页</h1>
        <div className={"ya-p"}>
            <Pagination className={"ya-shadow radius6 margin6"} getPage={set_page.bind(this)} total={1000} page={page} eachPage={10}/>
            选择的页：{page}
        </div>
    </div>
}
export default PaginationDemo