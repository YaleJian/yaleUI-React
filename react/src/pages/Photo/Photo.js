import React from 'react'
import './photo.css';
import Header from "../common/Header";
import Main from "../common/Main";
import Button from "../../modules/Button/Button";
import Icon from "../../modules/utils/Icon";

/**
 * 摄影展
 */
class Photo extends React.Component {
    static defaultProps = {};

    static Home = 1;
    static Scenery = 2;
    static Portrait = 3;
    static FindMe = 4;
    static Links = ["Home", "Scenery", "Portrait", "FindMe"];

    constructor(props) {
        super(props);
        this.state = {
            type: Photo.Home,
        }
    }

    render() {

        let photos = "";
        switch (this.state.type) {

            case Photo.Home :
                photos = this.pages.home();
                break;
            case Photo.Scenery:
                photos = this.pages.stream(this.getImg());
                break;
            case Photo.Portrait:
                photos = this.pages.stream(this.getImg());
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
                            return <li className={key+1 === this.state.type ? "active" : ""} key={key} onClick={() => this.setState({type: key + 1})}>{item}</li>;
                        })}
                    </ul>
                    {photos}
                </div>
            </Main>
        </>
    }

    pages = {

        home: () => {
            let img = this.getImg().list[0];
            return <div className={"home"}>
                <img className={"mainImg"} src={img.url}/>
            </div>
        },
        stream: (photoGroup) => {
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

        if(document.body.clientWidth > 500) {
            //设置容器：平均分布按照长宽比，宽度重置为按照长宽比的
            e.target.parentNode.style.flexGrow = width / height;
            e.target.parentNode.style.width = width / height * 280 + "px";

        }else {
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
        //获取cos临时密钥

        //测试代码
        let array = Array(28).fill(null).map((_, h) => h < 9 ? "0" + (h + 1) : h + 1);
        let photoGroup = {
            list: [],
            author: "Yale Jian",
            shootingTime: new Date(),
            releaseTime: new Date(),
        };
        for (let i in array) {
            photoGroup.list.push({
                name: "图片" + i,
                url: require('./test/i000' + array[i] + '.jpg'),
                shootingTime: new Date(),
            })
        }
        return photoGroup;
    }

}

export default Photo