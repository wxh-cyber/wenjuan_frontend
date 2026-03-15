import { FC ,useState} from 'react'
import { Spin, Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import styles from './index.module.scss';

const Stat: FC = () => {
    const nav = useNavigate();
    const { loading } = useLoadQuestionData();

    const { title, isPublished } = useGetPageInfo();

    //状态提升
    const [selectedComponentId,setSelectedComponentId]=useState('');
    const [selectedComponentType,setSelectedComponentType]=useState('');

    //修改标题
    useTitle(`问卷统计 - ${title}`);

    //Loading Elem
    const LoadingElem = (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
        </div>
    );

    //生成内容元素
    function genContentElem() {
        if (typeof isPublished === 'boolean' && !isPublished) return (
            <div style={{ flex: 1 }}>
                <Result
                    status="warning"
                    title="该页面尚未发布"
                    extra={
                        <Button type="primary" onClick={() => nav(-1)}>
                            返回
                        </Button>
                    }>
                </Result>
            </div>
        )

        return (
            <>
            {/* 如果将最外层标签写成div，则内部样式将无法正确显示 */}
                <div className={styles.left}>
                    <ComponentList 
                        selectedComponentId={selectedComponentId}
                        setSelectedComponentId={setSelectedComponentId}
                        setSelectedComponentType={setSelectedComponentType}
                    />
                </div>
                <div className={styles.main}>中间</div>
                <div className={styles.right}>右侧</div>
            </>
        )
    }

    return (
        <div className={styles.container}>
            <StatHeader />
            <div className={styles['content-wrapper']}>
                {loading && LoadingElem }
                {!loading&&<div className={styles.content}>
                    {genContentElem()}
                </div>}
            </div>
        </div>
    )
}

export default Stat;
