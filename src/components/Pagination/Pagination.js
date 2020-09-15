import React from "react";
import {Input} from "..";
import {Icon} from "..";
import {Button} from "..";
import "./pagination.css";

/**
 * 分页
 */
const Pagination = () => {
    const [page, set_page] = useState(0);
    const [eachPage, set_eachPage] = useState(0);
    const [total, set_total] = useState(0);


    let getSelectData = (page) => {
        props.getPage(page);
        set_page(page)
    }
    let prev = () => {
        if (page > 1) set_page(page - 1);
    }
    let next = () => {
        if (page < total) set_page(page + 1);
    }

    let totalPage = Math.ceil(total / eachPage);
    let dropData = totalPage ? Array(totalPage).fill(null).map((_, h) => h + 1) : [];
    return <div className={"ya-pagination"}>
            <span onClick={prev.bind(this)}>
                <Button className={"item"} radius disabled={page === 1} icon={"i-BAI-zuojiantou"}/>
            </span>
        <span className="item pageItem">
                <Input className="page radius6" type={"select"} dropDownBoxData={dropData}
                       value={page} autoContent={true}
                       onChange={getSelectData.bind(this)} selectIcon={false}/>
            </span>
        <span className="item">/</span>
        <span className="item">{totalPage}</span>
        <span onClick={next.bind(this)}>
                <Button className={"item"} radius disabled={page === totalPage} icon={"i-BAI-youjiantou"}/>
            </span>
    </div>


}

export {Pagination};