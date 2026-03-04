//获取服务端信息的hook
import {useEffect,useState} from 'react';
import {useDispatch} from 'react-redux';
import useGetUserInfo from './useGetUserInfo';
import {useRequest} from 'ahooks';
import {getUserInfoService} from '../services/user';
import {loginReducer} from '../store/userReducer';

function useLoadUserData(){
    const dispatch=useDispatch();
    const [waitingUserData,setWaitingUserData]=useState(true);

    //Ajax加载用户信息
    const {run}=useRequest(getUserInfoService,{
        manual:true,
        onSuccess:(result)=>{
            const {username,nickname}=result;
            //将用户信息存储到redux store中
            dispatch(loginReducer({username,nickname}));
        },
        onFinally:()=>{
            setWaitingUserData(false);       //无论是否加载成功，都将waitingUserData设置为false
        }
    });

    //Ajax加载完用户信息后，直接放在redux中，不用返回
    const {username}=useGetUserInfo();       //首先从客户端的redux中获取用户信息
    useEffect(()=>{
        if(username){
            setWaitingUserData(false);       //如果redux中已经存在用户信息，则不用重新加载
            return;
        }

        run();       //如果redux store中没有用户信息，则进行加载
    },[username]);

    return {waitingUserData};
}

export default useLoadUserData;