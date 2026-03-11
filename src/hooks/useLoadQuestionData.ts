import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { getQuestionService } from '../services/question';
import { resetComponents } from '../store/componentsReducer';
import { resetPageInfo } from '../store/pageInfoReducer';

function useLoadQuestionData() {
    const { id = '' } = useParams();
    const dispatch = useDispatch();

    //Ajax加载
    const { data, loading, error, run } = useRequest(async (id: string) => {
        if (!id) throw new Error('没有问卷Id!');
        const data = await getQuestionService(id);
        return data;
    }, {
        manual: true
    });

    //根据获取的data设置redux store
    useEffect(() => {
        if (!data) return;

        const { title = '', desc = '', js = '', css = '', componentList = [] } = data;

        //获取默认的selectedId
        let selectedId = '';
        if (componentList.length > 0) {
            selectedId = componentList[0].fe_id;     //默认选中第一个组件
        }

        //把componentList存储到redux store中
        dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));

        //把问卷标题存储到redux store中
        dispatch(resetPageInfo({ title, desc, js, css }));
    }, [data]);

    //判断id变化，执行Ajax加载问卷数据
    useEffect(() => {
        //加载问卷数据
        run(id);
    }, [id]);

    return { loading, error };
}

export default useLoadQuestionData;