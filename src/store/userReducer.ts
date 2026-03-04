import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type UserStateType={
    username:string,
    nickname:string
    //密码不作为其类型进行存储
}

const INIT_STATE:UserStateType={
    username:'',
    nickname:''
}

export const userSlice=createSlice({
    name:'user',
    initialState:INIT_STATE,
    reducers:{
        loginReducer:(state:UserStateType,action:PayloadAction<UserStateType>)=>{
            return action.payload;      //设置username和nickname到redux的store中
            //此处没用用到immer
        },
        logoutReducer:()=> INIT_STATE      //登出即返回初始状态
    }
})

export const {loginReducer,logoutReducer}=userSlice.actions;

export default userSlice.reducer;