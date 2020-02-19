import React from 'react';
import './hf.css'
import Header from "../common/Header";
import Main from "../common/Main";
import {hfCosList} from "../../modules/utils/qCloudUtils";
import Button from "../../modules/Button/Button";
import axios from "../../modules/utils/Axios";

/**
 * 华富物联网系统
 */
class Hf extends React.Component {
    static defaultProps = {};

    //页面展示方式
    static Loading = 0;
    static ManagementPlatform = 1;//管理平台
    static Screen = 2;//广告播放页面
    static BootScreen = 3;//广告系统启动页面

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

        //定时获取广告
        setInterval(this.getADs, 10000);

        this.state = {
            showType: Hf.loading,//展示
            screenList: [],//屏幕列表
            playingAdList: [],//正在播放的广告组
            playingAdIndex: 0,//正在播放的广告文件序号
            playingAd: false,//正在播放的广告对象
            downloadedNum: 0,//已下载的广告资源个数
            totalDownloadNum: 0,//总要下载的广告个数
            systemVersion: "1.0.0",
            newSystemVersion: false,
        };
    }

    render() {

        let page;
        switch (this.state.showType) {
            case Hf.Loading :
                page = this.pages.loading();
                break;
            case Hf.BootScreen :
                page = this.pages.bootScreen();
                break;
            case Hf.ManagementPlatform :
                page = this.pages.managementPlatform();
                break;
            case Hf.Screen :
                page = this.pages.screen();
                break;
            default:
                page = "";
        }
        let isScreen = this.state.showType === Hf.Screen;
        return <>
            <Header children={"华富物联网系统"} className={"center" + (isScreen ? " noHeader" : "")} occupied={!isScreen}/>
            <Main>
                <div className={"ya-Hf"} ref={hf => this.hf = hf}>
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
        bootScreen: () => {
            return <div className={"bootScreen"}>
                <div className={"bg"}/>
                <div className={"boot"}>
                    <div className={"title"}>
                        <div className={"welcome ya-animation-1"}>欢迎进入华富广告播放系统</div>
                        <div className={"systemVersion"}>V{this.state.systemVersion}</div>
                    </div>
                    <Button className={"radius bootBtn"} content={"按F11全屏后点此启动"}
                            onClick={this.playNext.bind(this, true)}/>
                    <div className={"firstLoading"}>
                        广告资源加载进度：
                        {this.state.totalDownloadNum === 0 ? <span
                            className={"noAd"}>暂无广告资源</span> : this.state.downloadedNum + "/" + this.state.totalDownloadNum}
                    </div>
                    {this.state.newSystemVersion ? <div className={"updateSystem"}>
                        系统升级中：V{this.state.systemVersion} => V{this.state.newSystemVersion}
                    </div> : ""}
                </div>
                <div className={"serialNumber"}>当前设备编号：{this.props.match.params.id}</div>
            </div>
        },
        managementPlatform: () => {
            let screenList = this.state.screenList.map((screen, key) => {
                return <div className={"screen"} key={key}>
                    <div className={"screenTitle"}>
                        云屏编号：{key}
                    </div>
                    <div className={"content"}>正在播放的广告</div>
                    <div className={"preview"}>
                        <a href={"/hf/" + key + "/"}><Button content={"预览"} onClick={() => {
                            this.setState({showType: Hf.BootScreen})
                        }}/></a>
                    </div>
                </div>
            });

            return <div className={"managementPlatform"}>
                <div className={"header"}>
                    <img className={"hf-logo"} src="https://hfcdn.yalejian.com/system/hf-Logo.png" alt={"Logo"}/>
                    <span className={"platformName"}>华富云屏管理后台</span>
                </div>
                <div className={"screenList"}>
                    {screenList}
                </div>
            </div>
        },
        screen: () => {
            let ad = this.state.playingAd;
            let content = "";
            if (ad) {
                if (ad.fileType === Hf.Pic) {
                    content = <img className={"adImage"} alt={ad.url} src={ad.url} id={"fullScreenArea"}/>;
                } else if (ad.fileType === Hf.Movie) {
                    content = <video className={"adVideo"} id="fullScreenArea" autoPlay poster=""
                                     ref={video => this.video = video} onEnded={this.onEnded.bind(this, ad)}>
                        <source src={ad.url} type="video/mp4"/>
                    </video>
                }
            } else {
                content = <div className={"noAd"}>暂无广告资源</div>
            }
            return <div className={"hf-realTimeScreen"}>{content}</div>;
        },
    };

    //获取广告
    getADs = () => {

        //检查系统配置
        this.checkConfig();

        //获取图片文件内的全部文件夹和文件
        let screenList = [];
        //屏幕编号
        let screenId = this.props.match.params.id;

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
                        if (fileType !== Hf.Nonsupport) {
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

                //获取到的广告列表
                let adList = screenList[screenId] || [];

                let showType = this.state.showType;
                if (showType !== Hf.Screen) {
                    //判断访问的是管理平台，还是屏幕
                    showType = JSON.stringify(this.props.match.params) === "{}" ? Hf.ManagementPlatform : Hf.BootScreen;
                }

                this.setState({screenList, showType});

                //下载广告资源
                this.downloadFiles(adList);
            }
        }, "", "", "", "hf-1252187891");
    };

    //设置文件类型
    setFileType(url) {
        if (url.endsWith(".jpg") || url.endsWith(".JPG") || url.endsWith(".png") || url.endsWith(".PNG")) {
            return Hf.Pic;
        } else if (url.endsWith(".mp4") || url.endsWith(".MP4") || url.endsWith(".MOV") || url.endsWith(".mov")) {
            return Hf.Movie;
        } else {
            return Hf.Nonsupport;
        }
    }


    timer = null;
    //播放下一个广告，并设置切换下一个广告策略
    playNext = (first) => {

        clearTimeout(this.timer);
        let playingAdIndex = this.state.playingAdIndex;
        if (first) {
            playingAdIndex = 0;
        } else {
            playingAdIndex++;
        }
        //最后一个播放完回第一个
        if (playingAdIndex === this.state.playingAdList.length) playingAdIndex = 0;

        //播放下一个广告
        let playingAd = this.state.playingAdList[playingAdIndex];//当前播放的广告
        this.setState({playingAdIndex, playingAd, showType: Hf.Screen});

        //图片设置播放5秒切换下一个
        if (playingAd && playingAd.fileType === Hf.Pic) {
            this.timer = setTimeout(this.playNext, 5000);
        }
    };

    //视频播放完毕，切换下一个广告
    onEnded() {
        this.playNext();
        this.video.load();
    }

    //已下载完成的文件
    hasDownloadedFiles = [];

    //下载广告资源
    downloadFiles(adList) {

        //生成新广告列表，过滤已下载过的广告文件
        let newAdList = [];
        adList.forEach((ad) => {
            if (!this.hasDownloadedFiles.includes(ad.url)) {
                newAdList.push(ad);
            }
        });

        //下载广告
        if (newAdList.length > 0) {
            newAdList.forEach((ad) => {
                axios.get(ad.url, {})
                    .then(() => {
                        //下载成功记录
                        this.hasDownloadedFiles.push(ad.url);

                        //下载文件进度+1
                        let downloadedNum = this.state.downloadedNum + 1;
                        this.setState({downloadedNum, totalDownloadNum: newAdList.length});

                        //全部新广告下载完毕,自动播放
                        if (downloadedNum === adList.length) {
                            if (this.state.showType === Hf.BootScreen) this.autoOpen();
                            this.setState({playingAdList: adList});
                        }
                    });
            })
        } else {
            //新广告组仅删除部分广告
            this.setState({playingAdList: adList});
        }
    }

    //自动播放
    autoOpen() {
        //5秒后自动进入
        this.timer = setTimeout(() => {
            this.playNext(true);
        }, 5000);
    }

    //检查系统配置
    checkConfig() {
        axios.get("https://hf-1252187891.cos.ap-beijing.myqcloud.com/system/hfConfig.json?time=" + new Date())
            .then((res) => {
                let config = res.data;
                if (config && config.version !== this.state.systemVersion) {
                    //自动更新系统
                    this.setState({newSystemVersion: config.version});
                    this.refresh = setTimeout(() => {
                        window.location.reload();
                        clearTimeout(this.refresh);
                    }, 3000)
                }
            });
    }
}

export default Hf;