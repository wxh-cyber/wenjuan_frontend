import { FC,MouseEvent } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress';
import styles from './EditCanvas.module.scss';

//临时静态展示一下Title和Input的效果
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';
// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';

type PropsType = {
    loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo;       //每个组件的信息，从redux store中获取的（最终还是从服务端获取的）

    const componentConfig = getComponentConfigByType(type);    //确定组件的具体类型
    if (!componentConfig) return null;

    const { Component } = componentConfig;      //从已经获取到的componentConfig中再获取到具体的组件
    return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
    const {componentList,selectedId} = useGetComponentsInfo();
    //console.log(componentList);
    const dispatch = useDispatch();

    function handleClick(event:MouseEvent,id: string) {
        event.stopPropagation();      //阻止事件冒泡，否则点击组件时，会t同时触发点击组件的父元素（canvas）
        dispatch(changeSelectedId(id));
    }

    //绑定快捷键
    useBindCanvasKeyPress();
    
    if (loading) return (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin />
        </div>
    );

    return (
        <div className={styles.canvas}>
            {
                componentList.filter(c => !c.isHidden).map(c => {
                    const { fe_id ,isLocked} = c;

                    //拼接class name
                    const wrapperDefaultClassName=styles['component-wrapper'];
                    const selectedClassName=styles.selected;
                    const lockedClassName=styles.locked;
                    const wrapperClassName=classNames({
                        [wrapperDefaultClassName]:true,
                        [selectedClassName]:fe_id===selectedId,
                        [lockedClassName]:isLocked
                    });

                    return (
                        <div
                            onClick={(event) => handleClick(event,fe_id)}
                            key={fe_id}
                            className={wrapperClassName}>
                            <div className={styles.component}>
                                {genComponent(c)}
                            </div>
                        </div>
                    )
                })
            }
            {/* <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput />
                </div>
            </div> */}
        </div>
    )
}

export default EditCanvas;