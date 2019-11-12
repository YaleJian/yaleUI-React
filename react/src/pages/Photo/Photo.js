import React from 'react'
import './photo.css';
import Header from "../common/Header";
import Main from "../common/Main";
import Icon from "../../modules/utils/Icon";
import {cosList} from "../../modules/utils/qCloudUtils";
import {Link} from "react-router-dom";

/**
 * 摄影展
 */
class Photo extends React.Component {
    static defaultProps = {};

    static Loading = 0;
    static Home = "首页";
    static Cover = 2;
    static FindMe = "联系我";
    static Group = 4;

    static PageSize = 5;

    constructor(props) {
        super(props);

        this.state = {
            showType: Photo.Loading,
            photoList: [],//全部照片
            photoData: this.getPhotos(),//图片结构化数据
            loadingCount: Photo.PageSize,//需要加载的图片数量，用于分页
        }
    }

    render() {

        let photos = "";
        switch (this.state.showType) {
            case Photo.Loading :
                photos = this.pages.loading();
                break;
            case Photo.Home :
                photos = this.pages.home();
                break;
            case Photo.FindMe:
                photos = this.pages.findMe();
                break;
            case Photo.Group:
                photos = this.pages.group();
                break;
            default:
                photos = this.pages.cover();
                break;
        }

        return <>
            <Header children={"Photographic Exhibition"} className={"center"}/>
            <Main>
                <div className={"ya-photo"}>
                    <ul className={"p-header"}>{this.pages.header()}</ul>
                    {photos}
                </div>
            </Main>
        </>
    }

    componentDidMount() {

        //分页
        let _this = this;
        window.onscroll = function () {
            if (document.body.scrollHeight - window.scrollY - document.body.offsetHeight < 60) {
                if (_this.state.showType !== Photo.Loading && _this.state.showType !== Photo.Home && _this.state.showType !== Photo.FindMe) {
                    _this.setState({loadingCount: _this.state.loadingCount += 5});
                }
            }
        };
    }

    pages = {
        loading: () => {
            return <div className={"ya-loading"}>
                <div className="loader3"><span/><span/></div>
            </div>;
        },
        header: () => {
            //模版
            let li = (c) => {
                return <li className={c === this.state.showType ? "active" : ""} key={c}
                           onClick={this.classifyClick.bind(this, c)}>
                    <Link to={"/photo"}>{c}</Link>
                </li>

            };
            let header = [li(Photo.Home)];
            //动态分类
            let photoData = this.state.photoData;
            for (let c in photoData) {

                if (photoData.hasOwnProperty(c)) {
                    header.push(li(c));
                }
                header.push()
            }
            header.push(li(Photo.FindMe));

            return header;
        },
        home: () => {
            let photoList = this.state.photoList;
            let img = photoList[Math.floor(Math.random() * photoList.length)] || {url: ""};
            return <div className={"home"}>
                <img className={"mainImg"} src={img.url} alt={img.name}/>
            </div>
        },
        cover: () => {
            let coverData = this.state.photoData[this.state.showType];
            let list = [];
            for (let i in coverData) {
                if (coverData.hasOwnProperty(i)) {
                    let item = coverData[i]["cover.jpg"];

                    //没有名称为cover.jpg的取最后一个
                    if (item === undefined) {
                        for (let j in coverData[i]) {
                            if (coverData[i].hasOwnProperty(j)) {
                                item = coverData[i][j];
                            }
                        }
                    }
                    list.push(<div className={"item"} key={i}
                                   onClick={() => this.setState({showType: Photo.Group, loadingCount: Photo.PageSize})}>
                        <i/>
                        <Link to={"/photo/" + item.classify + "/" + item.groupName + "/"}>
                            <img src={item.url} alt={item.name} onLoad={this.imgOnLoad.bind(this)}/>
                        </Link>
                    </div>)
                }
            }
            return <div className={"cover"}>{list}</div>;
        },
        findMe: () => {
            return <div className={"findMe"}>
                <Icon className="headPortrait" name={"i-yalejian"}/>
                <div className={"introduce"}>
                    <div>E-mail：boss@yalejian.com</div>
                    <div>微信：YangZi_3351</div>
                    <div>QQ：1558556540</div>
                    <div>微博：扬歌YaleJian</div>
                </div>
                <div className={"price"}>
                    拍摄价格：
                    <table border="1">
                        <thead>
                        <tr>
                            <th>类型</th>
                            <th>价格</th>
                            <th>拍摄张数</th>
                            <th>拍摄天数</th>
                            <th>描述</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>手机拍摄</td>
                            <td>1288元</td>
                            <td>20张成片</td>
                            <td>1天</td>
                            <td>使用iPhone8P拍摄</td>
                        </tr>
                        <tr>
                            <td>写真</td>
                            <td>1888元</td>
                            <td>15张成片</td>
                            <td>1天</td>
                            <td>使用单反拍摄</td>
                        </tr>
                        <tr>
                            <td>定制</td>
                            <td>2888元</td>
                            <td>20张成片</td>
                            <td>1天</td>
                            <td>使用单反拍摄</td>
                        </tr>
                        <tr>
                            <td>婚纱</td>
                            <td>5888元</td>
                            <td>40张成片</td>
                            <td>1-2天</td>
                            <td>使用单反拍摄</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        },
        group: () => {
            let classify = this.props.match.params.c || false;
            let groupName = this.props.match.params.g || false;
            if (!(classify || classify)) return "";
            let photos = this.state.photoData[classify][groupName];
            let list = [];
            let count = 0;
            for (let i in photos) {
                if (count > this.state.loadingCount) break;
                if (photos.hasOwnProperty(i)) {
                    let item = photos[i];
                    list.push(<div className={"item"} key={i}>
                        <i/>
                        <Link to={"/photo/" + item.classify + "/" + item.groupName + "/" + item.name}>
                            <img src={item.url} alt={item.name} onLoad={this.imgOnLoad.bind(this)}/>
                        </Link>
                    </div>);
                    count++;
                }
            }
            return <div className={"ya-photoGroup"}>
                <div className={"title"}>
                    <div className={"name"}>{groupName}</div>
                </div>
                <div className={"cover"}>{list}</div>
                <div className={"end"} ref={(endTag) => {
                    this.endTag = endTag;
                }}>--The End --
                </div>
            </div>;
        },
    };

    //图片排版
    imgOnLoad = (e) => {

        //加载完获取图片宽高
        let width = e.target.width;
        let height = e.target.height;

        let ele = e.target;

        if (document.body.clientWidth > 500) {
            //设置容器：平均分布按照长宽比，宽度重置为按照长宽比的
            ele.parentNode.parentNode.style.flexGrow = width / height;
            ele.parentNode.parentNode.style.width = width / height * 280 + "px";

        } else {
            ele.parentNode.parentNode.style.width = "100%";

        }
        //撑开容器
        ele.parentNode.previousSibling.style.paddingBottom = height / width * 100 + "%";

        //图片相对容器撑满
        ele.style.position = "absolute";

        //显示图片
        ele.parentNode.parentNode.style.display = "block"
    };

    //获取组图
    getPhotos = () => {
        //获取图片文件内的全部文件夹和文件
        let photoData = {};
        let photoList = [];
        cosList("photo/", (data) => {
            for (let i in data) {
                let item = data[i];
                let key = item.Key;

                if (key.endsWith(".jpg")) {
                    let folders = key.split("/");
                    let classify = folders[1];//分类
                    let groupName = folders[2];//组名称
                    let name = folders[3];//图片名称
                    if (photoData[classify] === undefined) photoData[classify] = {};
                    if (photoData[classify][groupName] === undefined) photoData[classify][groupName] = {};
                    let photo = {
                        name,
                        url: "https://cdn.yalejian.com/" + key,
                        classify,
                        groupName,
                        lastModified: item.LastModified,
                        size: item.Size,
                    };
                    photoData[classify][groupName][name] = photo;
                    photoList.push(photo);
                }
            }
            let showType = JSON.stringify(this.props.match.params) === "{}" ? Photo.Home : Photo.Group;
            this.setState({photoData, photoList, showType});
        });
    };

    //点击分类导航
    classifyClick = (showType) => {
        this.setState({showType});
    };
}

export default Photo