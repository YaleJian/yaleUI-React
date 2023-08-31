import React, {Component} from 'react';
import "./header.css";

function Header(pros = {
    className: "",
    occupied: true
}) {
    return (
        <div className="ya-header ya-fixed">
            <slot></slot>
        </div>
    );
}

export {Header};
