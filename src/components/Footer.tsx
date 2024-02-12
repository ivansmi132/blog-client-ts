import React from "react";
import {Layout} from "antd";

export function Footer() {

    const {Footer} = Layout;

    return (
        <Footer style={{ textAlign: 'center' }}>
            OurBlog ©{new Date().getFullYear()}
        </Footer>
    )
}