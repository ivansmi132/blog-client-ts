import {Layout, App} from 'antd';
import { Navbar } from './components/navigation/Navbar';
import "./components/styles.css"
import {Outlet} from 'react-router-dom';
import { Footer } from './components/Footer';




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

                </Layout>

                <Footer />
            </App>
  );
}

