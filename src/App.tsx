import {Layout, App, Breadcrumb} from 'antd';
import { Navbar } from './components/Navbar/Navbar';
import "./components/styles.css"
import { Footer } from 'antd/es/layout/layout';
import {Link, Outlet} from 'react-router-dom';
import {BreadcrumbItemType, BreadcrumbSeparatorType} from "antd/lib/breadcrumb/Breadcrumb";




const {
    Content,
} = Layout;


export function MyApp() {


    return (
            <App>
                <Layout style={{ minHeight: "100vh" }}>
                    <Navbar />
                    <Content style={{ padding: '0 48px', marginTop: "3%" }}>
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
                        Ivan's Blog ©{new Date().getFullYear()}
                    </Footer>
                </Layout>

            </App>
  );
}

