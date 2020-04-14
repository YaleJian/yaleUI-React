import React from 'react';

class Footer extends React.Component {

    render() {
        return <div className={"ya-footer"}>
            © 2020 扬歌YaleJian
            | <a className={"copyright"} href="http://www.beian.miit.gov.cn" rel="noopener noreferrer"
                 target="_blank">苏ICP备18013414号</a>
            | <img className={"publicSafety"} src={"http://www.beian.gov.cn/img/ghs.png"} alt={""}/>
            <a className={"copyright"}
               href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011702000196"
               rel="noopener noreferrer" target="_blank">苏公网安备32011702000196号</a>
        </div>
    }
}

export default Footer;