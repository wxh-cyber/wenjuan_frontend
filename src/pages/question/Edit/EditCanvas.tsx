import {FC} from 'react';
import { Spin } from 'antd';
import styles from './EditCanvas.module.scss';

//临时静态展示一下Title和Input的效果
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';

type PropsType={
    loading:boolean
}

const EditCanvas:FC<PropsType>=({loading})=>{
    if(loading) return (
        <div style={{textAlign:'center',marginTop:'24px'}}>
            <Spin />
        </div>
    );

    return (
        <div className={styles.canvas}>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput />
                </div>
            </div>
        </div>
    )
}

export default EditCanvas;