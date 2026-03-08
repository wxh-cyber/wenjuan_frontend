import { ComponentInfoType, ComponentsStateType } from ".";

/** 
 * @description 计算删除组件后的下一个选中组件的id
 * @param fe_id 被删除的组件的id
 * @param componentList 组件列表
 * @returns 下一个选中组件的id
 */
export function getNextSelectedId(fe_id:string,componentList:ComponentInfoType[]){
    const visibleComponentList=componentList.filter(c=>!c.isHidden);
    const index=visibleComponentList.findIndex(c => c.fe_id===fe_id);
    if(index<0) return '';     //注意：这里不能写成return;的形式，因为返回类型规定了必须是字符串

    //重新计算selectedId
    let newSelectedId='';
    const length=visibleComponentList.length;
    if(length<=1){
        //组件长度就一个，被删除了，就没有组件了
        newSelectedId='';
    }else{
        //组件长度>1
        if(index+1===length){
            //要删除最后一个，就要选中上一个
            newSelectedId=visibleComponentList[index-1].fe_id;
        }else{
            //要删除的不是最后一个，就选中下一个
            newSelectedId=visibleComponentList[index+1].fe_id;
        }
    }

    return newSelectedId;
}

/**
 * @description 插入新组件
 * @param draft 组件状态
 * @param newComponent 新组件
 */
export function insertNewComponent(draft:ComponentsStateType,newComponent:ComponentInfoType){
    const {selectedId,componentList}=draft;
    const index=componentList.findIndex(c=>c.fe_id===selectedId);
    
    if(index<0){
        //未选中任何组件
        draft.componentList.push(newComponent);
    }else{
        //选中了某个组件
        draft.componentList.splice(index+1,0,newComponent);
    }

    //更新selectedId
    draft.selectedId=newComponent.fe_id;
}