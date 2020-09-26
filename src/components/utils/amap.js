import AMapLoader from "@amap/amap-jsapi-loader";
import {Message} from "..";

let initAMap = (containerRef, setMaoData, jsKey) => {
    AMapLoader.load({
        "key": jsKey || "3e1573216986096de00822a455a0a852",              // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.Geolocation'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        "AMapUI": {             // 是否加载 AMapUI，缺省不加载
            "version": '1.1',   // AMapUI 缺省 1.1
            "plugins":[],       // 需要加载的 AMapUI ui插件
        },
    }).then((AMap)=>{
        let map, geolocation;
        if(containerRef.current) {
            map = new AMap.Map(containerRef.current, {
                resizeEnable: true
            });

            let onComplete, onError;
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：无穷大
                zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RT',
                buttonOffset: new AMap.Pixel(10, 70),
            })
            geolocation.getCurrentPosition((status, result) => {
                if (status === 'complete') {
                    onComplete(result)
                } else {
                    onError(result)
                }
            });
            map.addControl(geolocation);

            // 绑定事件
            let clickHandler = (e) => {
                Message('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！拖动点选位置获取天气信息功能即将上线！', false, true);
            };
            map.on('click', clickHandler);

            //解析定位结果
            onComplete = (locationData) => {
                console.log("定位结果：", locationData);
                locationData.ya_location = locationData.position.toString().split(',');
                locationData.ya_address = locationData.addressComponent.district + locationData.addressComponent.township
                setMaoData(locationData)
            };

            //解析定位错误信息
            onError = (data) => {
                alert('定位失败', data)
            }
        }else {
            console.log("containerRef.current不存在")
        }
    }).catch(e => {
        console.log(e);
    })
};

export {initAMap}