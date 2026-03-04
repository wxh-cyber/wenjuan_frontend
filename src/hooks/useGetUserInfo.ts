import {useSelector} from 'react-redux';
import {StateType} from '../store';
import { UserStateType } from '../store/userReducer';

//从redux中获取客户端用户信息的hook
function useGetUserInfo(){
    const {username,nickname}=useSelector<StateType,UserStateType>(state=>state.user);
    return {username,nickname};
}

export default useGetUserInfo;