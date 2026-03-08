import { FC, useEffect } from 'react';
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, isVertical, options = [], value, onChange, disabled } = { ...QuestionRadioDefaultProps, ...props };
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, options, value });
    }, [title, isVertical, options, value]);

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }
    return (
        <Form
            layout="vertical"
            initialValues={{ title, isVertical, options, value }}
            onValuesChange={handleValueChange}
            disabled={disabled}
            form={form}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[
                    {
                        required: true,
                        message: '请输入标题'
                    }
                ]}>
                <Input />
            </Form.Item>
            <Form.Item label="默认选中" name="value">
                <Select
                    value={value}
                    options={options.map(({ value, text }) => ({
                        value,
                        label: text || ''
                    }))} />
            </Form.Item>
            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>垂直显示</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent;