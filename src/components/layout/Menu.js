import React, {useRef, useState} from 'react';
import {Tree} from "..";
import {Icon} from "..";
import {Button} from "..";

const Menu = (props) => {

    const [isShow, set_isShow] = useState(document.body.clientWidth > 900)

    let toggleClass = isShow ? " animated fastest fadeInDownSmall" : " hide";

    const tree = useRef();
    return (
        <>
            <div className={isShow ? "ya-menu" : "ya-menu  hide"}>
                <div className={"content" + toggleClass}>
                    <Tree treeData={props.menuData}
                          indexId={props.indexId}

                          treeType={4}
                          openLevel={"all"}
                        // indent = {false}
                          menuStyle={"dark"}
                          rightClickMenu={true}

                          ref={tree}
                    />
                </div>
                <Button className={"toggle"} onClick={() => set_isShow(!isShow)}>
                    <Icon name={isShow ? "i-BAI-zuojiantou" : "i-BAI-youjiantou"}/>
                </Button>
            </div>

        </>
    );
}

export {Menu};
