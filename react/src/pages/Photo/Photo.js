import React from 'react'
import './photo.css';

/**
 * 摄影展
 */
class Photo extends React.Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

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
        let photos = photoGroup.list.map((item, key) => {
            return <div className={"item"} key={key}>
                <i/>
                <img src={item.url} onLoad={this.imgOnLoad.bind(this)}/>
            </div>
        });
        return <div className={"ya-photo"}>
            {photos}
        </div>
    }

    imgOnLoad = (e) => {

        //加载完获取图片宽高
        let width = e.target.width;
        let height = e.target.height;

        //设置容器：平均分布按照长宽比，宽度重置为按照长宽比的
        e.target.parentNode.style.flexGrow = width / height;
        e.target.parentNode.style.width = width / height * 280 + "px";

        //撑开容器
        e.target.previousSibling.style.paddingBottom = height / width * 100 + "%";

        //图片相对容器撑满
        e.target.style.position = "absolute";

        //显示图片
        e.target.parentNode.style.display = "block"
    }
}

export default Photo