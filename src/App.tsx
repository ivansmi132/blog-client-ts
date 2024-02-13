import {Layout, App} from 'antd';
import { Navbar } from './components/navigation/Navbar';
import "./styles/styles.css"
import {Outlet} from 'react-router-dom';
import { Footer } from './components/Footer';

const {Content} = Layout;

export function MyApp() {


    return (
            <App>

                <Layout style={{ minHeight: "100vh" }}>

                    <Navbar />

                    <Content className="main-content">
                        <div className="main-page-container">
                            <Outlet />
                        </div>
                    </Content>
                </Layout>

                <Footer />
            </App>
  );
}

