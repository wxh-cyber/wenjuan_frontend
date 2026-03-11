import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents/index';
import { getNextSelectedId, insertNewComponent } from './utils';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';

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
    copiedComponent: ComponentInfoType | null;
}

const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent: null           //默认初始化时不拷贝任何信息
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
            insertNewComponent(draft, newComponent);
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
            const newSelectedId = getNextSelectedId(removeId, componentList);
            draft.selectedId = newSelectedId;

            const index = componentList.findIndex(c => c.fe_id === removeId);
            componentList.splice(index, 1);
        },

        //隐藏/选中 组件
        changeComponentHidden: (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
            const { componentList } = draft;
            const { fe_id, isHidden } = action.payload;

            //重新计算selectedId
            let newSelectedId = '';
            if (isHidden) {
                //要隐藏
                newSelectedId = getNextSelectedId(fe_id, componentList);
            } else {
                //要显示
                newSelectedId = fe_id;
            }
            draft.selectedId = newSelectedId;

            const curComp = componentList.find(c => c.fe_id === fe_id);
            if (curComp) {
                curComp.isHidden = isHidden;
            }
        },

        // 锁定/解锁 组件
        toggleComponentLocked: (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
            const { fe_id } = action.payload;

            const curComp = draft.componentList.find(c => c.fe_id === fe_id);
            if (curComp) {
                curComp.isLocked = !curComp.isLocked;
            }
        },

        //拷贝当前选中的组件
        copySelectedComponent: (draft: ComponentsStateType) => {
            const { selectedId, componentList = [] } = draft;
            const selectedComponent = componentList.find(c => c.fe_id === selectedId);
            if (!selectedComponent) return;
            draft.copiedComponent = cloneDeep(selectedComponent);      //深拷贝
        },

        //粘贴组件
        pasteCopiedComponent: (draft: ComponentsStateType) => {
            const { copiedComponent } = draft;
            if (!copiedComponent) return;

            //将fe_id修改为新的id
            copiedComponent.fe_id = nanoid();
            insertNewComponent(draft, copiedComponent);
        },

        //选中上一个
        selectPrevComponent: (draft: ComponentsStateType) => {
            const { selectedId, componentList = [] } = draft;
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);

            if (selectedIndex <= 0) return;       //如果当前选中的组件是第一个，或者根本未选中任何组件，则不执行选中上一个
            draft.selectedId = componentList[selectedIndex - 1].fe_id;
        },

        //选中下一个
        selectNextComponent: (draft: ComponentsStateType) => {
            const { selectedId, componentList = [] } = draft;
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);

            if (selectedIndex < 0) return;       //未选中任何组件，则不执行
            if (selectedIndex + 1 === componentList.length) return;     //已经选中了最后一个，无法再向下选中

            draft.selectedId = componentList[selectedIndex + 1].fe_id;
        },

        //修改标题组件
        changeComponentTitle:(draft:ComponentsStateType,action:PayloadAction<{fe_id:string;title:string}>)=>{
            const {fe_id,title}=action.payload;
            const curComp=draft.componentList.find(c=>c.fe_id===fe_id);
            if(curComp){
                curComp.title=title;
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
    toggleComponentLocked,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent,
    changeComponentTitle } = componentsSlice.actions;

export default componentsSlice.reducer;
