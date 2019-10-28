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
            return <span className={"item"}>
                <img src={item.url}/>
                <span>

                </span>
            </span>
        });
        return <div className={"ya-photo"}>
            {photos}
        </div>
    }
}

export default Photo