import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents/index';
import { getNextSelectedId } from './utils';

export type ComponentInfoType = {
    fe_id: string;      //前端生成的id，服务端MongoDB不认这种格式，所以自定义一个fe_id
    type: string;
    title: string;
    isHidden?: boolean;
    isLocked?: boolean;
    props: ComponentPropsType;
}

export type ComponentsStateType = {
    selectedId: string;
    componentList: Array<ComponentInfoType>;
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: []
};

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        //重置所有组件
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload;
        },

        //修改selectedId
        changeSelectedId: (draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedId = action.payload;
        },

        //添加新组件
        addComponent: (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload;       //将参数保存为新的component
            const { selectedId, componentList } = draft;
            const index = componentList.findIndex(c => c.fe_id === selectedId);      //获取当前选中元素的索引

            if (index < 0) {
                //未选中任何组件
                draft.componentList.push(newComponent);
            } else {
                draft.componentList.splice(index + 1, 0, newComponent);
            }

            draft.selectedId = newComponent.fe_id;
        },

        //修改组件属性
        changeComponentProps: (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>) => {
            const { fe_id, newProps } = action.payload;
            //找到了当前要修改的组件
            const curComp = draft.componentList.find(c => c.fe_id === fe_id);
            if (curComp) {       //如果这个组件存在，则传入新的props
                curComp.props = {
                    ...curComp.props,
                    ...newProps
                }
            }
        },

        //删除选中的组件
        removeSelectedComponent: (draft: ComponentsStateType) => {      //由于已经知道selectedId，所以可以直接删除
            const { componentList = [], selectedId: removeId } = draft;

            //重新计算selectedId
            const newSelectedId=getNextSelectedId(removeId,componentList);
            draft.selectedId=newSelectedId;

            const index = componentList.findIndex(c => c.fe_id === removeId);
            componentList.splice(index, 1);
        },

        //隐藏/选中 组件
        changeComponentHidden:(draft:ComponentsStateType,action:PayloadAction<{fe_id:string,isHidden:boolean}>)=>{
            const {componentList}=draft;
            const {fe_id,isHidden}=action.payload;

            //重新计算selectedId
            let newSelectedId='';
            if(isHidden){
                //要隐藏
                newSelectedId=getNextSelectedId(fe_id,componentList);
            }else{
                //要显示
                newSelectedId=fe_id;
            }
            draft.selectedId=newSelectedId;

            const curComp=componentList.find(c=>c.fe_id===fe_id);
            if(curComp){
                curComp.isHidden=isHidden;
            }
        },

        // 锁定/解锁 组件
        toggleComponentLocked:(draft:ComponentsStateType,action:PayloadAction<{fe_id:string}>)=>{
            const {fe_id}=action.payload;

            const curComp=draft.componentList.find(c=>c.fe_id===fe_id);
            if(curComp){
                curComp.isLocked=!curComp.isLocked;
            }
        }
    }
});

export const { resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked } = componentsSlice.actions;

export default componentsSlice.reducer;
