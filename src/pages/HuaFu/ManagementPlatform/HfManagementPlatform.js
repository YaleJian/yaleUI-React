import React from 'react';
import './hfManagementPlatform.css'
import Header from "../../common/Header";
import Main from "../../common/Main";
import {hfCosList} from "../../../modules/utils/qCloudUtils";
import Button from "../../../modules/Button/Button";
import {Link} from "react-router-dom";

/**
 * 华富管理平台
 */
class HfManagementPlatform extends React.Component {
    static defaultProps = {};

    //页面展示方式
    static Loading = 0;
    static ScreenManage = 1;//管理平台

    //广告文件类型
    static Nonsupport = 0;//不支持
    static Pic = 1;//图片
    static Movie = 2;//视频

    //广告加载状态
    static DownloadedNoLoading = 0;//下载区无正在的加载资源文件
    static DownloadedLoading = 1;//下载区新广告加载中

    constructor(props) {
        super(props);

        //获取广告
        this.getADs();

        this.state = {
            showType: HfManagementPlatform.Loading,//展示
            screenList: [],//屏幕列表
        };
    }

    render() {

        let page;
        switch (this.state.showType) {
            case HfManagementPlatform.Loading :
                page = this.pages.loading();
                break;
            case HfManagementPlatform.ScreenManage :
                page = this.pages.screenManage();
                break;
            default:
                page = this.pages.screenManage();
        }
        return <>
            <Header children={"华富物联网系统"} className={"center"}/>
            <Main>
                <div className={"ya-hfManagementPlatform"} ref={hf => this.hf = hf}>
                    {page}
                </div>
            </Main>
        </>;
    }

    pages = {
        loading: () => {
            return <div className={"ya-loading"}>
                <div className="loader3"><span/><span/></div>
            </div>;
        },
        screenManage: () => {
            let screenList = this.state.screenList.map((screen, key) => {
                return <div className={"screen"} key={key}>
                    <div className={"screenTitle"}>
                        云屏编号：{key}
                    </div>
                    <div className={"content"}>正在播放的广告</div>
                    <div className={"preview"}>
                        <Link to={"/hf/" + key + "/"} key={key}><Button content={"预览"}/></Link>
                    </div>
                </div>
            });

            return <div className={"screenManage"}>
                <div className={"header"}>
                    <img className={"hf-logo"} src="https://hfcdn.yalejian.com/system/hf-Logo.png" alt={"Logo"}/>
                    <span className={"platformName"}>华富云屏管理后台</span>
                </div>
                <div className={"screenList"}>
                    {screenList}
                </div>
            </div>
        },
    };

    //获取广告
    getADs = () => {

        //获取图片文件内的全部文件夹和文件
        let screenList = [];

        //获取全部广告文件列表
        hfCosList("AD/", (data) => {
            if (data) {
                for (let i in data) {
                    if (data.hasOwnProperty(i)) {
                        let item = data[i];
                        let key = item.Key;
                        let fileType = this.setFileType(key);
                        let folders = key.split("/");
                        let screenId = folders[1];//屏幕编号
                        let adFileName = folders[2];//广告文件名称
                        if (!screenList[screenId]) screenList[screenId] = [];
                        if (fileType !== HfManagementPlatform.Nonsupport) {
                            let url = "https://hfcdn.yalejian.com/" + key;//广告文件url
                            let ad = {
                                adFileName,
                                screenId,
                                url,
                                fileType,
                                lastModified: item.LastModified,
                                size: item.Size,
                            };

                            screenList[screenId].push(ad);
                        }
                    }
                }
                this.setState({screenList, showType: HfManagementPlatform.ScreenManage});

            }
        }, "", "", "", "hf-1252187891");
    };

    //设置文件类型
    setFileType(url) {
        if (url.endsWith(".jpg") || url.endsWith(".JPG") || url.endsWith(".png") || url.endsWith(".PNG") ||
            url.endsWith(".jpeg") || url.endsWith(".JPEG") || url.endsWith(".gif") || url.endsWith(".GIF")) {
            return HfManagementPlatform.Pic;
        } else if (url.endsWith(".mp4") || url.endsWith(".MP4") || url.endsWith(".MOV") || url.endsWith(".mov")) {
            return HfManagementPlatform.Movie;
        } else {
            return HfManagementPlatform.Nonsupport;
        }
    }
}

export default HfManagementPlatform;