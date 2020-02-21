import React from 'react';
import './hf.css'
import {hfCosList} from "../../../modules/utils/qCloudUtils";
import Button from "../../../modules/Button/Button";
import axios from "../../../modules/utils/Axios";
import Message from "../../../modules/message/Message";

/**
 * 华富云播放器
 */
class Hf extends React.Component {
    static defaultProps = {};

    static GetADIntervalTime = 10000;
    //页面展示方式
    static Loading = 0;
    static BootScreen = 1;//广告系统启动页面
    static Screen = 2;//广告播放页面

    //广告文件类型
    static Nonsupport = 0;//不支持
    static Pic = 1;//图片
    static Video = 2;//视频

    //广告状态
    static NoDownload = 0;//未下载
    static Downloading = 1;//下载中
    static Downloaded = 2;//下载完成
    static Playing = 3;//播放中

    constructor(props) {
        super(props);

        //根据URL获取要播放的屏幕ID
        let screenId = this.props.match.params.id;

        //获取广告
        this.getADs(screenId, true);

        this.state = {
            showType: Hf.BootScreen,//展示
            screenId,//设备屏幕编号
            playingAdList: [],//正在播放的广告组
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
        return <div className={"ya-Hf"} ref={hf => this.hf = hf}>
            {page}
        </div>;
    }

    pages = {
        loading: () => {
            return <div className={"ya-loading"}>
                <div className="loader3"><span/><span/></div>
            </div>;
        },
        bootScreen: () => {
            let downLoadedNum = 0;//已下载
            let playingAdList = this.state.playingAdList;
            playingAdList.forEach((ad) => {
                if (ad.status === Hf.Downloaded) downLoadedNum++;
            });

            let noAd = <span className={"noAd"}>暂无广告资源</span>;
            let schedule = playingAdList.length === 0 ? noAd : downLoadedNum + "/" + playingAdList.length;
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
                        <span>广告资源加载进度：{schedule}</span>
                    </div>
                    {this.state.newSystemVersion ? <div className={"updateSystem"}>
                        系统升级中：V{this.state.systemVersion} => V{this.state.newSystemVersion}
                    </div> : ""}
                </div>
                <div className={"serialNumber"}>当前设备编号：{this.state.screenId}</div>
            </div>
        },
        screen: () => {
            let downLoadedNum = 0;//已下载
            let playingAdList = this.state.playingAdList;
            let playingAd = false;//获取播放中的广告
            playingAdList.forEach((ad) => {
                if (ad.status === Hf.Playing) playingAd = ad;
                if (ad.status === Hf.Downloaded || ad.status === Hf.Playing) downLoadedNum++;
            });
            if(!playingAd){
                //无广告
                playingAd = playingAdList[0];
                if(playingAdList.length > 0) console.log("播放列表没有指定要播放的广告！",playingAdList);
            }

            let content = "";
            if (playingAdList.length > 0) {
                if (playingAd.fileType === Hf.Pic) {
                    content =
                        <img className={"adImage"} alt={playingAd.url} src={playingAd.url} id={"fullScreenArea"}/>;
                } else if (playingAd.fileType === Hf.Video) {
                    content = <video className={"adVideo"} id="fullScreenArea" autoPlay poster=""
                                     ref={video => this.video = video}
                                     onPause={this.onEnded.bind(this, playingAd)}
                                     onEnded={this.onEnded.bind(this, playingAd)}>
                        <source src={playingAd.url} type="video/mp4"/>
                    </video>
                }
            } else {
                content = <div className={"noAd"}>暂无广告资源</div>
            }

            let loadingSchedule = <div className={"loadingSchedule"}>
                <span>更新广告中：{downLoadedNum + "/" + playingAdList.length}</span>
            </div>;
            return <div className={"hf-realTimeScreen"}>
                {content}
                {downLoadedNum < playingAdList.length ? loadingSchedule : ""}
            </div>;
        },
    };

    //获取广告
    getADs = (screenId, first) => {

        //检查系统配置
        this.checkConfig();

        //屏幕ID
        screenId = screenId || this.state.screenId || this.props.match.params.id;

        //获取全部广告文件列表
        hfCosList("AD/" + screenId + "/", (data, error) => {
            if (data) {
                //成功请求到此设备的广告池
                let playingAdList = [];
                for (let i in data) {
                    if (data.hasOwnProperty(i)) {
                        let item = data[i];
                        let key = item.Key;
                        let fileType = this.setFileType(key);
                        let folders = key.split("/");
                        let screenId = folders[1];//屏幕
                        let adFileName = folders[2];//广告文件名称
                        if (screenId === this.state.screenId && fileType !== Hf.Nonsupport) {
                            let url = "https://hfcdn.yalejian.com/" + key;//广告文件url
                            let ad = {
                                adFileName,
                                screenId,
                                url,
                                status: Hf.NoDownload,
                                fileType,
                                lastModified: item.LastModified,
                                size: item.Size,
                            };
                            playingAdList.push(ad);
                        }
                    }
                }

                //如果原播放列表为空，或者首次播放，则默认为首次播放
                let reStart = false;
                let originalPlayingAdList = this.state.playingAdList;
                if (originalPlayingAdList.length === 0 || first) reStart = true;

                //处理获取到到广告列表：更新播放列表、下载新广告
                this.handleNewAdGroup(playingAdList, reStart);

                if (first) this.getADInterval();
            } else {
                //请求失败
                if (error) Message("获取广告失败，" + Hf.GetADIntervalTime / 1000 + "秒后重试", "错误信息：" + error);

                //首次请求广告失败重试
                if (first) this.getADs();
            }
        }, "", "", "", "hf-1252187891");
    };

    //定时获取广告方法
    getADInterval() {
        setInterval(this.getADs, Hf.GetADIntervalTime);
    }

    //处理新请求到的广告组
    handleNewAdGroup(adList, first) {

        //更新播放列表
        let originalPlayingAdList = this.state.playingAdList;
        let playingAdList = adList;
        if (!first) {
            //非首次，复制原播放列表广告的状态
            playingAdList.forEach((ad, index) => {
                let oIndex = originalPlayingAdList.findIndex(oAd => oAd.adFileName === ad.adFileName);
                let oAd = originalPlayingAdList[oIndex];
                if (oAd){
                    let realTimeStatus = !this.state.playingAdList[oIndex] || this.state.playingAdList[oIndex].status;
                    if(!(realTimeStatus === Hf.Downloaded && oAd.status === Hf.Downloading)) {
                        //排除，下次请求已经到了，准备复制下载中状态，此时这个广告下载成功，state状态已经是下载成功，不能复制为下载中
                        playingAdList[index].status = oAd.status;
                    }
                }
            });
        }

        //正在播放的视频不可用删除，因为视频触发下一个，需要播放完成,如果被删了，重新添加回去，等播完，下次会自动删
        let playingVideoAdIndex = originalPlayingAdList.findIndex(ad => ad.status === Hf.Playing && ad.fileType === Hf.Video);
        if(playingVideoAdIndex > -1){
            let oPlayingVideoAd = originalPlayingAdList[playingVideoAdIndex];
            let newPlayingAdListIndex = playingAdList.findIndex(ad => ad.adFileName === oPlayingVideoAd.adFileName);
            if(newPlayingAdListIndex === -1) playingAdList.push(oPlayingVideoAd);
        }

        //生成要下载的广告列表
        let downloadAdList = this.getDownloadAdList(playingAdList);

        //下载新的广告
        downloadAdList.forEach((ad, index) => {
            this.downloadFiles(ad, playingAdList, first);
        });

        this.setState({playingAdList});
    }

    //生成新广告列表
    getDownloadAdList(playingAdList) {
        let downloadAdList = [];
        playingAdList.forEach((ad) => {
            if (ad.status === Hf.NoDownload) downloadAdList.push(ad);
        });
        return downloadAdList;
    }

    //下载广告文件
    downloadFiles(ad, playingAdList, first) {
        //开始下载，更新播放列表此广告的状态为：下载中
        let adIndex = playingAdList.findIndex(pAd => pAd.adFileName === ad.adFileName);
        playingAdList[adIndex].status = Hf.Downloading;

        //请求广告资源超时时间
        let config = {timeout: 6000000};

        //视频使用blob格式缓存
        if (ad.fileType === Hf.Video) config.responseType = 'blob';

        //发起下载请求
        axios.get(ad.url, config)
            .then((res) => {
                console.log("广告【" + ad.adFileName + "]下载成功，链接是：" + ad.url);

                let playingAdList = this.state.playingAdList;
                if (ad.fileType === Hf.Video) {
                    //视频下载缓存完成，创建本地播放链接，更新播放列表中，此广告视频的播放地址
                    playingAdList[adIndex].url = URL.createObjectURL(res.data);
                }
                playingAdList[adIndex].status = Hf.Downloaded;

                this.setState({playingAdList});

                //首次播放
                if (first) {
                    if (this.state.showType === Hf.BootScreen) {
                        //如果在广告启动界面，等5秒后自动播放
                        this.bootScreenAutoOpen();
                    } else {
                        //屏幕界面，马上播放
                        this.playNext();
                    }
                }
            })
            .catch(function (res) {
                console.log("在下载此以下广告发生异常：", ad, "异常内容：", res);
            });

    }

    timer = null;//图片广告切换定时器
    //播放下一个广告，并设置切换下一个广告策略
    playNext = () => {
        clearTimeout(this.timer);
        let playingAdList = this.state.playingAdList;
        if (playingAdList.length > 0) {
            let playingAdIndex = 0;//播放中的广告序号
            playingAdList.forEach((ad, index) => {
                if (ad.status === Hf.Playing) {
                    //设置正在播放的广告为：下载完成
                    playingAdList[index].status = Hf.Downloaded;
                    //生成下一个广告的序号
                    playingAdIndex = index + 1;
                    while (playingAdList[playingAdIndex] && playingAdList[playingAdIndex].status !== Hf.Downloaded){
                        //如果下一个不是已下载，跳过，如果下一个不存在，跳出循环
                        playingAdIndex ++
                    }
                    if(!playingAdList[playingAdIndex]) playingAdIndex = 0;//没有剩余可播放的，从头播放
                }
            });

            //最后一个播放完回第一个
            if (playingAdIndex >= this.state.playingAdList.length) playingAdIndex = 0;

            //设置播放列表中，要播放的广告状态为：播放中
            let playingAd = playingAdList[playingAdIndex];//当前播放的广告
            if (playingAd) {
                playingAdList[playingAdIndex].status = Hf.Playing;
            } else {
                //发生异常
                console.log("播放下一个广告时发生异常,广告对象不存在,序号为：" + playingAdIndex, playingAdList, this.state.playingAdList);
                playingAdIndex = 0;
                playingAd = this.state.playingAdList[0];
            }

            this.setState({playingAdList, showType: Hf.Screen});

            //图片设置播放5秒切换下一个
            if (playingAd && playingAd.fileType === Hf.Pic) {
                this.timer = setTimeout(this.playNext, 5000);
            }
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
            this.playNext();
        }, 5000);
    }

    //设置文件类型
    setFileType(url) {
        if (url.endsWith(".jpg") || url.endsWith(".JPG") || url.endsWith(".png") || url.endsWith(".PNG") ||
            url.endsWith(".jpeg") || url.endsWith(".JPEG") || url.endsWith(".gif") || url.endsWith(".GIF")) {
            return Hf.Pic;
        } else if (url.endsWith(".mp4") || url.endsWith(".MP4") || url.endsWith(".MOV") || url.endsWith(".mov")) {
            return Hf.Video;
        } else {
            return Hf.Nonsupport;
        }
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