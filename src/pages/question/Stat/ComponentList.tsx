import { FC } from 'react';
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import styles from './ComponentList.module.scss';
import classNames from 'classnames';

type PropsType = {
    selectedComponentId: string;
    setSelectedComponentId: (id: string) => void;
    setSelectedComponentType: (type: string) => void;
}

const ComponentList: FC<PropsType> = (props) => {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
    const { componentList } = useGetComponentsInfo();

    return (
        <div className={styles.container}>
            {
                componentList
                    .filter(c => !c.isHidden)          //过滤隐藏的组件
                    .map(c => {
                        const { fe_id, props, type } = c;

                        const componentConfig = getComponentConfigByType(type);
                        if (!componentConfig) return null;

                        const { Component } = componentConfig;

                        //拼接class name
                        const wrapperDefaultClassName = styles['component-wrapper'];
                        const selectedClassName = styles.selected;
                        const wrapperClassName = classNames({
                            [wrapperDefaultClassName]: true,
                            [selectedClassName]: fe_id === selectedComponentId
                        });

                        return (
                            <div  
                                tabIndex={0}        
                                className={wrapperClassName}
                                key={fe_id}
                                onClick={() => {
                                    setSelectedComponentId(fe_id);
                                    setSelectedComponentType(type);
                                }}
                                onBlur={() => {
                                    setSelectedComponentId('');
                                    setSelectedComponentType('');
                                }}
                                >
                                <div className={styles.component}>
                                    <Component {...props} />
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default ComponentList;
