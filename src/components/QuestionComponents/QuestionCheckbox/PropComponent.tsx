import { FC } from 'react';
import { Form, Input, Checkbox, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { QuestionCheckboxPropsType, OptionType } from './interface';

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const { title, isVertical, list = [], onChange, disabled } = props;
    const [form] = Form.useForm();

    function handleValuesChange(changedValues: any, allValues: any) {
        //调用onChange
        if(onChange) {
            onChange(allValues);
        }
    }

    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{ title, isVertical, list }}
            onValuesChange={handleValuesChange}
            disabled={disabled}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[
                    { required: true, message: '请输入标题' }
                ]}>
                <Input />
            </Form.Item>
            <Form.Item label="选项">
                <Form.List name="list">
                    {
                        (fields, { add, remove }) => (
                            <>
                                {/* 遍历所有的选项（可删除） */}
                                {fields.map(({ key, name, ...restField }, index) => {
                                    return (
                                        <Space key={key} align="baseline">
                                            {/* 当前选项 是否选中 */}
                                            <Form.Item name={[name, 'checked']} valuePropName="checked">
                                                <Checkbox />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'text']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入选项内容'
                                                    },
                                                    {
                                                        validator: (_, text) => {
                                                            const { list = [] } = form.getFieldsValue();

                                                            let num = 0;
                                                            list.forEach((opt: OptionType) => {
                                                                if (opt.text === text) {
                                                                    num++;     //记录text相同的个数，预期只有一个（即自身）
                                                                }
                                                            });

                                                            if (num === 1) return Promise.resolve();
                                                            return Promise.reject(new Error('选项内容不能重复'));
                                                        }
                                                    }
                                                ]}>
                                                <Input placeholder="请输入选项内容" />
                                            </Form.Item>
                                            {/* Form.Item不支持在一个Item中绑定多个字段。 */}
                                            {/* value 字段绑定，但不显示任何界面元素 */}
                                            <Form.Item {...restField} name={[name, 'value']} noStyle>
                                                <input type="hidden" />
                                            </Form.Item>

                                            {/* 当前选项 删除按钮 */}
                                            {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                        </Space>
                                    )
                                })}

                                {/* 添加选项 */}
                                <Form.Item>
                                    <Button
                                        type="link"
                                        onClick={() => add({ text: '', value: `${Date.now()}`, checked: false })}
                                        icon={<PlusOutlined />}
                                        block
                                    >添加选项</Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
            </Form.Item>
            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent;