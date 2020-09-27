import React, {useEffect, useState} from "react";
import {Input} from "../../index";
import {Button} from "../../index";
import "./pagination.css";

/**
 * 分页
 */
const Pagination = (props) => {
    const [page, set_page] = useState(props.page || 1);
    const [eachPage, set_eachPage] = useState(props.eachPage || 10);
    const [total, set_total] = useState(props.total || 1);

    useEffect(()=>{
        set_page(page);
        set_eachPage(eachPage);
        set_total(total);
    },[page,eachPage,total])

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
    return <div className={"ya-pagination "+ props.className}>
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