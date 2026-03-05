import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import styles from './MainLayout.module.scss'
import useNavPage from '../hooks/useNavPage';
import useLoadUserData from '../hooks/useLoadUserData';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
    const { waitingUserData } = useLoadUserData();       //加载用户信息
    /*
        相较于Home页面点击Button按钮触发跳转逻辑，useNavPage可在pathname改变时，也判断应该跳转到怎样的页面。
    */
    useNavPage(waitingUserData);                        //导航页面

    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <UserInfo />
                </div>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    {waitingUserData ?
                        <div style={{ textAlign: 'center', marginTop: '60px' }}>
                            <Spin />
                        </div> : <Outlet />}
                </Content>
            </Layout>
            <Footer className={styles.footer}>
                小慕问卷 &nbsp; 2026 - present. Created by 小慕
            </Footer>
        </Layout>
    )
}

export default MainLayout;
