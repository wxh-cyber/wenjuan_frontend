import React, { FC } from 'react'
import { Link,useNavigate } from 'react-router-dom'
//import { getUserInfoService } from '../services/user'
//import { useRequest } from 'ahooks'
import { Button,message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { LOGIN_PATHNAME } from '../router/index'
import { removeToken,getToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import {logoutReducer} from '../store/userReducer';

const UserInfo: FC = () => {
    const nav=useNavigate();
    const dispatch=useDispatch();

    // const { data } = useRequest(getUserInfoService);
    // const { username, nickname } = data || {};
    const {username,nickname}=useGetUserInfo();       //从redux store中获取用户信息
    // const token=getToken();

    function logout(){
        dispatch(logoutReducer());     //清空了redux中的user信息
        removeToken();      //清除token的存储
        message.success('退出成功');
        nav(LOGIN_PATHNAME);    //跳转到登录页面
    }

    const UserInfo = (
        <>
            <span style={{ color: '#e8e8e8' }}>
                <UserOutlined />
                {/* 由于先前已经在登录页面将nickname和username绑定在一起，所以此处一定有nickname */}
                {nickname}
            </span>
            <Button type="link" onClick={logout}>退出</Button>
        </>
    );

    const Login = (
        <Link to={LOGIN_PATHNAME}>登录</Link>
    );

    return (
        <div>
            {/* 采用token判断登录状态，可以在退出之后，组件进行响应式更新 */}
            {/* 由于在引入redux状态管理之后，已经可以清空客户端中存储的user信息，所以此处采用username也可以实现响应式更新。 */}
            {username ? UserInfo : Login}
        </div>
    )
}

export default UserInfo;