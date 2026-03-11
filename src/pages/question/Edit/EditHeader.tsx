import { FC, useState, ChangeEvent, useEffect } from "react";
import { Button, Typography, Space, Input, message } from 'antd';
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { useDispatch } from 'react-redux';
import { changePageTitle } from '../../../store/pageInfoReducer';
import { updateQuestionService } from "../../../services/question";
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks";
import styles from './EditHeader.module.scss';
import EditToolBar from "./EditToolBar";

const { Title } = Typography;

//显示和修改标题
const TitleElem: FC = () => {
    const { title } = useGetPageInfo();
    const dispatch = useDispatch();

    const [editState, setEditState] = useState(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim();
        if (!newTitle) return;
        dispatch(changePageTitle(newTitle));
    }

    if (editState) {
        return <Input
            value={title}
            onChange={handleChange}
            onPressEnter={() => setEditState(false)}
            onBlur={() => setEditState(false)}
        />
    }

    return (
        <Space>
            <Title>{title}</Title>
            <Button
                onClick={() => setEditState(true)}
                type="text"
                icon={<EditOutlined />}></Button>
        </Space>
    )
}

//保存按钮
const SaveButton: FC = () => {
    //pageInfo ComponentList
    const { id } = useParams();
    const { componentList = [] } = useGetComponentsInfo();
    const pageInfo = useGetPageInfo();

    const { loading, run: save } = useRequest(async () => {
        if (!id) return;
        await updateQuestionService(id, { ...pageInfo, componentList });
    }, {
        manual: true
    });

    //快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
        event.preventDefault();      //阻止冒泡，从而不会触发网页的保存，而仅触发问卷相关信息的保存
        if (!loading) save();
    })

    //自动保存
    useDebounceEffect(() => {
        save()
    }, [componentList, pageInfo],
        {
            wait: 1000
        });

    return <Button
        onClick={save}
        disabled={loading}
        icon={loading ? <LoadingOutlined /> : null}>
        保存
    </Button>
}

//发布按钮
const PublishButton: FC = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { componentList = [] } = useGetComponentsInfo();
    const pageInfo = useGetPageInfo();

    const { loading, run: pub } = useRequest(async () => {
        if (!id) return;
        await updateQuestionService(id, {
            ...pageInfo,
            componentList,
            isPublished: true         //标志着问卷已经被发布
        });
    }, {
        manual: true,
        onSuccess: () => {
            message.success('发布成功');
            nav(`/question/stat/${id}`);       //发布成功，跳转到统计页面
        }
    })

    return (
        <Button
            type="primary"
            onClick={pub}
            disabled={loading}>发布</Button>
    )
}

//编辑器头部
const EditHeader: FC = () => {
    const nav = useNavigate();

    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button
                            type="link"
                            icon={<LeftOutlined />}
                            onClick={() => nav(-1)}
                        >返回</Button>
                        <TitleElem />
                    </Space>
                </div>
                <div className={styles.main}>
                    <EditToolBar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButton />
                        <PublishButton />
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default EditHeader;
