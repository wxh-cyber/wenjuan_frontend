import { FC, useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { Typography, Spin, Table, Pagination } from "antd";
import { getQuestionStatListService } from "../../../services/stat";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { STAT_PAGE_SIZE } from "../../../constant";

const { Title } = Typography;

type PropsType = {
    selectedComponentId: string;
    setSelectedComponentId: (id: string) => void;
    setSelectedComponentType: (type: string) => void;
}

const PageStat: FC<PropsType> = (props: PropsType) => {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;

    const { id = '' } = useParams();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);

    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);

    const { loading } = useRequest(async () => {
        const res = await getQuestionStatListService(id, { page, pageSize });
        return res;
    }, {
        refreshDeps:[id,page,pageSize],
        onSuccess: (res) => {
            const { total, list = [] } = res;
            setTotal(total);
            setList(list);
        }
    });

    //切换问卷时，重置到第一页
    useEffect(() => {
        setPage(1);
    }, [id]);

    const { componentList } = useGetComponentsInfo();
    const columns = componentList.map(c => {
        const { fe_id, title, props = {}, type } = c;

        const colTitle = props!.title || title;      //先从props中获取title，如果props中没有title，再从上方的title中进行获取

        return {
            //title:colTitle,       //title也可以是JSX这样的表达式
            title: (<div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setSelectedComponentId(fe_id);
                    setSelectedComponentType(type);
                }
                }>
                <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
                    {colTitle}
                </span>
            </div>),
            dataIndex: fe_id
        }
    });

    const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
    const TableElem = (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            >
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
            <Pagination
                total={total}
                pageSize={pageSize}
                current={page}
                showSizeChanger
                pageSizeOptions={[10, 20, 50, 100]}
                //在Antd中，已经规定好了分页器的onChange回调函数接收到nextPage和nextPageSize
                onChange={(nextPage:number, nextPageSize:number) => {
                    if (nextPageSize !== pageSize) {       //如果变化后的PageSize不同于当前PageSize，则进行相应修改
                        setPageSize(nextPageSize);
                        setPage(1);
                        return;
                    }
                    setPage(nextPage);
                }}
            />
            </div>
        </>
    );

    return (
        <div>
            <Title level={3}>答卷数量：{!loading && total}</Title>
            {
                loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )
            }
            {!loading && TableElem}

        </div>
    )
}

export default PageStat;
