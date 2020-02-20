import React from 'react';
import './hf.css'
import Header from "../../common/Header";
import Main from "../../common/Main";
import {hfCosList} from "../../../modules/utils/qCloudUtils";
import Button from "../../../modules/Button/Button";
import axios from "../../../modules/utils/Axios";

/**
 * 华富云播放器
 */
class Hf extends React.Component {
    static defaultProps = {};

    //页面展示方式
    static Loading = 0;
    static BootScreen = 1;//广告系统启动页面
    static Screen = 2;//广告播放页面

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
        let screenId = this.props.match.params.id;
        this.state = {
            showType: Hf.BootScreen,//展示
            screenId,//设备屏幕编号
            screenList: [],//屏幕列表
            playingAdList: [],//正在播放的广告组
            playingAdIndex: 0,//正在播放的广告文件序号
            playingAd: false,//正在播放的广告对象
            downloadedNum: 0,//已下载的广告资源个数
            totalDownloadNum: 0,//总要下载的广告个数
            downloadingFileList: [],//正在下载的文件
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
            case Hf.Screen :
                page = this.pages.screen();
                break;
            default:
                page = "";
        }
        return <>
            <Header children={"华富物联网系统"} className={"center noHeader"} occupied={false}/>
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
                <div className={"serialNumber"}>当前设备编号：{this.state.screenId}</div>
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
                                     ref={video => this.video = video}
                                     onPause={this.onEnded.bind(this, ad)}
                                     onEnded={this.onEnded.bind(this, ad)}>
                        <source src={ad.url} type="video/mp4"/>
                    </video>
                }
            } else {
                content = <div className={"noAd"}>暂无广告资源</div>
            }

            let loadingSchedule = <div className={"loadingSchedule"}>
                更新广告中：{this.state.downloadedNum / this.state.totalDownloadNum * 100}%
            </div>;
            return <div className={"hf-realTimeScreen"}>
                {content}
                {this.state.totalDownloadNum > 0 && this.state.downloadedNum === 0 ? loadingSchedule : ""}
            </div>;
        },
    };

    //获取广告
    getADs = () => {

        //检查系统配置
        this.checkConfig();

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
                this.setState({screenList});

                //下载广告资源
                this.downloadFiles(screenList[this.state.screenId] || []);
            }
        }, "", "", "", "hf-1252187891");
    };

    //下载广告资源
    downloadingFile = "";
    downloadFiles(adList) {

        //生成新广告列表
        let newAdList = [];
        if(this.state.playingAdList.length === 0){
            newAdList = adList;
        }else {
            adList.forEach((ad) => {
                if (!this.state.playingAdList.find((playAd) => {
                    return playAd.url === ad.url
                })) {
                    //过滤下载中的文件
                    let downloadingFileList = this.state.downloadingFileList;
                    if(!downloadingFileList.includes(ad.url)){
                        debugger
                        newAdList.push(ad);
                    }
                }
            });
        }

        if (newAdList.length > 0) {
            //有新广告场景：下载新广告，删除云端已删除广告
            this.setState({downloadedNum: 0, totalDownloadNum: newAdList.length});

            //下载广告
            newAdList.forEach((ad) => {

                //正在下载中的文件
                let downloadingFileList = this.state.downloadingFileList;
                downloadingFileList.push(ad.url);
                this.setState({downloadingFileList});

                axios.get(ad.url, {timeout : 6000000})
                    .then(() => {
                        console.log("广告【" + ad.adFileName + "]下载成功，链接是：" + ad.url);

                        //更新下载文件进度，已下载文件+1,
                        let downloadedNum = this.state.downloadedNum + 1;
                        let playingAdList = this.state.playingAdList;
                        playingAdList.push(ad);
                        this.setState({downloadedNum, totalDownloadNum: newAdList.length, playingAdList});

                        //全部新广告下载完毕,自动播放
                        if (downloadedNum === adList.length) {

                            //下载完成，替换新的广告组, 清除下载中记录
                            this.setState({playingAdList: adList, downloadingFileList : []});

                            //如果在广告启动界面，原来一定不在播放中，5秒后自动播放
                            if (this.state.showType === Hf.BootScreen) {
                                this.bootScreenAutoOpen();
                            }

                            //如果在屏幕页面，如果原来无广告正在播放，则继续播放
                            if (this.state.showType === Hf.Screen && !this.state.playingAd) {
                                this.playNext(true);
                            }
                        }
                    })
                    .catch(function (res) {
                        console.log("在下载此以下广告发生异常：", ad,"异常内容：",res);
                    });

            })
        } else {
            //无新广告处理逻辑：删除云端已删除广告
            if (adList.length < this.state.playingAdList.length) {
                this.setState({playingAdList: adList});//更新播放列表
                this.playNext(true);//从头开始播放
            }
        }
    }

    //设置文件类型
    setFileType(url) {
        if (url.endsWith(".jpg") || url.endsWith(".JPG") || url.endsWith(".png") || url.endsWith(".PNG") ||
            url.endsWith(".jpeg") || url.endsWith(".JPEG") || url.endsWith(".gif") || url.endsWith(".GIF")) {
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
        let playingAdList = this.state.playingAdList;
        if (first) {
            playingAdIndex = 0;
        } else {
            playingAdIndex++;
        }
        //最后一个播放完回第一个
        if (playingAdIndex >= playingAdList.length) playingAdIndex = 0;

        //播放下一个广告
        let playingAd = playingAdList[playingAdIndex];//当前播放的广告

        //如果当前广告序号已删除，则从头播放
        if (!playingAd) {
            console.log("广告被删除，原序号为：" + playingAdIndex);
            playingAdIndex = 0;
            playingAd = playingAdIndex[0];
        }
        this.setState({playingAdIndex, playingAd, showType: Hf.Screen});

        //图片设置播放5秒切换下一个
        if (playingAd && playingAd.fileType === Hf.Pic) {
            this.timer = setTimeout(this.playNext, 5000);
        }
    };

    //视频播放完毕,或者意外暂停时，切换下一个广告
    onEnded() {
        this.playNext();
        this.video.load();//更改视频来源，并重载视频
    }

    //启动界面自动播放
    bootScreenAutoOpen() {
        //5秒后自动进入
        this.timer = setTimeout(() => {
            this.playNext(true);
            this.setState({totalDownloadNum: 0, downloadedNum: 0});
        }, 5000);
    }

    //检查系统配置
    checkConfig() {
        axios.get("https://hf-1252187891.cos.ap-beijing.myqcloud.com/system/playerConfig.json?time=" + new Date().getTime())
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