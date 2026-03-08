import { FC, useEffect } from 'react'
import { Form,Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const {TextArea}=Input;

const QuestionInfoPropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title, desc = '', onChange, disabled } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title,
            desc
        })
    }, [title, desc]);

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }

    return (
        <Form
            layout="vertical"
            initialValues={{
                title,
                desc
            }}
            disabled={disabled}
            onValuesChange={handleValuesChange}
            form={form}
        >
            <Form.Item
            label="标题"
            name="title"
            rules={[
                {
                    required: true,
                    message: '请输入问卷标题'
                }
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="描述" name="desc">
                <TextArea />
            </Form.Item>
        </Form>
    )
}

export default QuestionInfoPropComponent;