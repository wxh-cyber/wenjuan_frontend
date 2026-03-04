import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';
import {HOME_PATHNAME,MANAGE_INDEX_PATHNAME} from '../router';
import styles from './Logo.module.scss';

const { Title } = Typography;

const Logo: FC = () => {
    const {username}=useGetUserInfo();

    const [pathname,setPathname]=useState(HOME_PATHNAME);      //设置默认路径为根路径

    useEffect(()=>{
        if(username){      //如果已经登录，则跳转到我的问卷目录
            setPathname(MANAGE_INDEX_PATHNAME);
        }
    },[pathname]);

    return (
        <div className={styles.container}>
            <Link to={pathname}>
                <Space>
                    <Title>
                        <FormOutlined />
                    </Title>
                    <Title>小慕问卷</Title>
                </Space>
            </Link>
        </div>
    )
}

export default Logo;
