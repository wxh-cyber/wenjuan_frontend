import { configureStore } from "@reduxjs/toolkit";
import undoable,{excludeAction,StateWithHistory} from 'redux-undo';
import userReducer, { UserStateType } from './userReducer';
import componentsReducer ,{ComponentsStateType}from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType={
    user:UserStateType;
    //components:ComponentsStateType;
    components:StateWithHistory<ComponentsStateType>;
    pageInfo:PageInfoType;
}

export default configureStore({
    reducer:{
        //用户信息
        user:userReducer,
        //组件列表
        //没有undo redo
        //components:componentsReducer,

        //增加了undo redo
        components:undoable(componentsReducer,{
            limit:20,         //限制只能撤销20步
            filter:excludeAction([
                'components/resetComponent',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ])        //屏蔽某些action.type，不进行undo redo
        }),

        //页面信息
        pageInfo:pageInfoReducer
    }
})