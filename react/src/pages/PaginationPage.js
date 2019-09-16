import React from "react"
import Header from "./BasePage/Header";
import Menu from "./BasePage/Menu";
import Main from "./BasePage/Main";
import PaginationDemo from "../modules/Pagination/PaginationDemo";

/**
 * 分页
 */
class PaginationPage extends React.Component{
    render() {
        return (
            <>
                <Header/>
                <Menu indexId={10}/>
                <Main content={<PaginationDemo/>}/>
            </>
        );
    }

}
export default PaginationPage