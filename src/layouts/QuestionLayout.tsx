import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const QuestionLayout: FC = () => {
    const { waitingUserData } = useLoadUserData();       //加载用户信息
    useNavPage(waitingUserData);                        //导航页面

    return (
        <div style={{ height: '100vh' }}>
            {waitingUserData ?
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <Spin />
                </div> : <Outlet />}
        </div>
    )
}

export default QuestionLayout;