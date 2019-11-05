import React from 'react'
import './photo.css';
import Header from "../common/Header";
import Main from "../common/Main";
import Button from "../../modules/Button/Button";
import Icon from "../../modules/utils/Icon";
import {cosList} from "../../modules/utils/qCloudUtils";

/**
 * 摄影展
 */
class Photo extends React.Component {
    static defaultProps = {};

    static Loading = 0;
    static Home = 1;
    static Scenery = 2;
    static Portrait = 3;
    static FindMe = 4;
    static Links = ["Home", "Scenery", "Portrait", "FindMe"];

    constructor(props) {
        super(props);
        let photoGroup = this.getImg();
        this.state = {
            type: Photo.Loading,
            photoGroup,
        }
    }

    render() {

        let photos = "";
        switch (this.state.type) {

            case Photo.Loading :
                photos = this.pages.loading();
                break;
            case Photo.Home :
                photos = this.pages.home();
                break;
            case Photo.Scenery:
                photos = this.pages.stream();
                break;
            case Photo.Portrait:
                photos = this.pages.stream();
                break;
            case Photo.FindMe:
                photos = this.pages.findMe();
                break;
        }


        return <>
            <Header children={"Photographic Exhibition"} className={"center"}/>
            <Main>
                <div className={"ya-photo"}>
                    <ul className={"p-header"}>
                        {Photo.Links.map((item, key) => {
                            return <li className={key + 1 === this.state.type ? "active" : ""} key={key}
                                       onClick={() => this.setState({type: key + 1})}>{item}</li>;
                        })}
                    </ul>
                    {photos}
                </div>
            </Main>
        </>
    }

    pages = {
        loading : () =>{
            return "加载中";
        },
        home: () => {
            let photoGroup = this.state.photoGroup;
            let img = photoGroup.list[Math.floor(Math.random()*photoGroup.list.length)] || {url : ""};
            return <div className={"home"}>
                <img className={"mainImg"} src={img.url}/>
            </div>
        },
        stream: () => {
            let photoGroup = this.state.photoGroup;
            let list = photoGroup.list.map((item, key) => {
                return <div className={"item"} key={key}>
                    <i/>
                    <img src={item.url} onLoad={this.imgOnLoad.bind(this)}/>
                </div>
            });
            return <div className={"stream"}>{list}</div>;
        },
        findMe: () => {
            return <div className={"findMe"}>
                <Icon className="headPortrait" name={"i-yalejian"}/>
                <div className={"introduce"}>
                    <div>E-mail:boss@yalejian.com</div>
                    <div>微信：</div>
                    <div>QQ：</div>
                    <div>微博：</div>
                </div>
                <div className={"price"}>

                </div>
            </div>
        }
    };

    imgOnLoad = (e) => {

        //加载完获取图片宽高
        let width = e.target.width;
        let height = e.target.height;

        if (document.body.clientWidth > 500) {
            //设置容器：平均分布按照长宽比，宽度重置为按照长宽比的
            e.target.parentNode.style.flexGrow = width / height;
            e.target.parentNode.style.width = width / height * 280 + "px";

        } else {
            e.target.parentNode.style.width = "100%";

        }
        //撑开容器
        e.target.previousSibling.style.paddingBottom = height / width * 100 + "%";


        //图片相对容器撑满
        e.target.style.position = "absolute";

        //显示图片
        e.target.parentNode.style.display = "block"
    };

    getImg = () => {
        let photoGroup = {
            list: [],
            author: "Yale Jian",
            shootingTime: new Date(),
            releaseTime: new Date(),
        };

        //测试代码
        /*let array = Array(28).fill(null).map((_, h) => h < 9 ? "0" + (h + 1) : h + 1);
        for (let i in array) {
            photoGroup.list.push({
                name: "图片" + i,
                url: require('./test/i000' + array[i] + '.jpg'),
                shootingTime: new Date(),
            })
        }*/

        //获取文件列表
        cosList("photo/", (data) => {
            let array = data;
            for (let i in array) {
                let key = array[i].Key;
                if (key.endsWith(".jpg")) {
                    photoGroup.list.push({
                        name: key,
                        url: "https://cdn.yalejian.com/" + key,
                        shootingTime: new Date(),
                    })
                }
            }
            this.setState({photoGroup, type: Photo.Home});
        });

    }

}

export default Photo