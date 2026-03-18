import { FC, useEffect,useState } from 'react';
import { Divider, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getComponentStatService } from '../../../services/stat';
import { getComponentConfigByType } from '../../../components/QuestionComponents';

const { Title } = Typography;

type PropsType = {
    selectedComponentId: string;
    selectedComponentType: string;
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
    const { selectedComponentId, selectedComponentType } = props;
    const { id = '' } = useParams();

    const [stat, setStat] = useState([]);
    const { run } = useRequest(async (questionId, componentId) => await getComponentStatService(id, selectedComponentId), {
        manual: true,
        onSuccess: (res) => {
            setStat(res.stat);
        }
    });

    useEffect(() => {
        if (selectedComponentId) {
            run(id, selectedComponentId)
        }
    }, [id,selectedComponentId]);

    //生成统计图表
    function genStatElem(){
        if(!selectedComponentId) return (<div>未选中组件</div>);

        const {StatComponent}=getComponentConfigByType(selectedComponentType)||{};
        if(!StatComponent) return <div>该组件无统计图表</div> ;

        return <StatComponent stat={stat} />
    }

    return (
        <div>
            <Title level={3}>图表统计</Title>
            <div>{genStatElem()}</div>
        </div>
    )
}

export default ChartStat;