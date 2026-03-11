import { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const {TextArea} = Input;

const PageSetting: FC = () => {
    const pageInfo = useGetPageInfo();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    //实时更新表单内容
    useEffect(() => {
        form.setFieldsValue(pageInfo);
    }, [pageInfo,form]);     
    // useEffect通过浅比较来判断依赖项是否发生变化。
    // 由于form的引用始终不变，无论是否将其加入依赖数组，React都会认为该依赖项没有发生变化，因此不会触发额外的Effect运行。

    function handleValuesChange() {
        dispatch(resetPageInfo(form.getFieldsValue()));
    }

    return (
        <Form
            layout="vertical"
            initialValues={pageInfo}
            onValuesChange={handleValuesChange}
            form={form}
        >
            <Form.Item
                name="title"
                label="问卷标题"
                rules={[
                    {
                        required: true,
                        message: '请输入问卷标题'
                    }
                ]}>
                <Input placeholder="请输入问卷标题" />
            </Form.Item>
            <Form.Item
                name="desc"
                label="问卷描述">
                <TextArea placeholder="请输入问卷描述" />
            </Form.Item>
            <Form.Item
                label="样式代码"
                name="css">
                    <TextArea placeholder="请输入样式代码" />
            </Form.Item>
            <Form.Item
                label="脚本代码"
                name="js">
                    <TextArea placeholder="请输入脚本代码" />
            </Form.Item>
        </Form>
    )
}

export default PageSetting;