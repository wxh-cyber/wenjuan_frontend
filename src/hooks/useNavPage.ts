import {useEffect} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import {isLoginOrRegister,MANAGE_INDEX_PATHNAME,isNoNeedUserInfo,LOGIN_PATHNAME} from '../router/index';

function useNavPage(waitingUserData:boolean) {
    const {username}=useGetUserInfo();
    const {pathname}=useLocation();
    const nav=useNavigate();

    useEffect(()=>{
        if(waitingUserData) return;

        //已经登录了
        if(username){
            if(isLoginOrRegister(pathname)){
                nav(MANAGE_INDEX_PATHNAME);      //若位于登录或注册页面，则跳转到问卷管理页面
            }
            return;
        }

        //未登录
        if(isNoNeedUserInfo(pathname)) return;            //若当前页面不需要登录，则直接返回
        else nav(LOGIN_PATHNAME);                          //否则跳转到登录页面
    },[username,pathname,waitingUserData]);
}

export default useNavPage;