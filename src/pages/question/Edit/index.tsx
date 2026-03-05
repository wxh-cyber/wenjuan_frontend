import React, { FC, useEffect, useState } from 'react'
//import {useParams} from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCanvas from './EditCanvas';
import styles from './index.module.scss';

const Edit: FC = () => {
    //const {id=''}=useParams();
    const { loading } = useLoadQuestionData();

    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: '#fff', height: '40px' }}>Header</div>
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>Left</div>
                    <div className={styles.main}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas loading={loading} />
                        </div>
                    </div>
                    <div className={styles.right}>Right</div>
                </div>
            </div>
        </div>
    )
}

export default Edit;