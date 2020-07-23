let Cookie = {
    /**
     * 设置cookie
     * @param name cookie的名称
     * @param value cookie的值
     * @param day cookie的过期时间
     */
    setCookie : function (name, value, day) {
        if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            let expires = day * 24 * 60 * 60 * 1000;
            let date = new Date(+new Date() + expires);
            document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
        } else {
            document.cookie = name + "=" + escape(value);
        }
    },

    /**
     * 获取对应名称的cookie
     * @param name cookie的名称
     * @returns {null} 不存在时，返回null
     */
    getCookie : function (name) {
        let arr;
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg);
        return arr ? unescape(arr[2]) : null;
    },

    /**
     * 删除cookie
     * @param name cookie的名称
     */
    delCookie : function (name) {
        this.setCookie(name, ' ', -1);
    },
};
export {Cookie};