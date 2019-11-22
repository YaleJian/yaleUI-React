let dataUtils = {
    isNaN: (value) => {
        return typeof value === 'number' && !isNaN(value);
    },
    //经纬度，将度转换成为度分秒
    formatDegree: (value) => {
        value = Math.abs(value);
        let v1 = Math.floor(value);//度
        let v2 = Math.floor((value - v1) * 60);//分
        let v3 = Math.round((value - v1) * 3600 % 60);//秒
        return v1 + '°' + v2 + '\'' + v3 + '"';
    },
    //经纬度，度分秒转换成为度
    degreeConvertBack: (value) => {
        let du = value.split("°")[0];
        let s = Number(value.split("°")[1].split("'")[0]);
        let m = Number(value.split("°")[1].split("'")[1].split('"')[0]);
        return Math.abs(du) + "." + (Math.abs(s) / 60 + Math.abs(m) / 3600);
    }
};
export default dataUtils;