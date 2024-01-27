import React from 'react';
import {Layout, App, Breadcrumb} from 'antd';
import { Navbar } from './components/navbar';
import "./components/styles.css"
import { Footer } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';



const {
    Content,
} = Layout;


export function MyApp() {

    return (
            <App>
                <Layout style={{ minHeight: "100vh" }}>
                    <Navbar />
                    <Content style={{ padding: '0 48px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                background: '#a3d9ff',
                                minHeight: 280,
                                padding: 24,
                                borderRadius: 10,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>

            </App>
  );
}

