import { FC } from "react";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { getComponentConfigByType,ComponentPropsType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
    return (
        <div style={{textAlign:'center'}}>
            未选中组件
        </div>
    )
}

const ComponentProp: FC = () => {
    const dispatch=useDispatch();       //获取dispatch方法实例

    const {selectedComponent}=useGetComponentsInfo();
    if(!selectedComponent){       //如果没有获取到组件，返回NoProp
        return <NoProp />
    }

    const {type,props,isLocked,isHidden}=selectedComponent;
    const componentConfig=getComponentConfigByType(type);
    if(!componentConfig){       //如果没有获取到组件配置，返回NoProp
        return <NoProp />
    }

    function changeProps(newProps:ComponentPropsType){
        if(!selectedComponent) return;
        const {fe_id}=selectedComponent;

        dispatch(changeComponentProps({fe_id,newProps}));
    }

    const {PropComponent}=componentConfig;

    return (
        //如果表单被锁定或者被隐藏，则不能使用右侧进行编辑
        <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
    )
}

export default ComponentProp;