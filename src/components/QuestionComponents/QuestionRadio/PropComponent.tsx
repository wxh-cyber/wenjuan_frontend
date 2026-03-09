import { FC, useEffect } from 'react';
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { QuestionRadioPropsType, QuestionRadioDefaultProps, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, isVertical, options = [], value, onChange, disabled } = { ...QuestionRadioDefaultProps, ...props };
    const [form] = Form.useForm();

    //监听options字段变化，确保实时获取最新选项
    const watchOptions = Form.useWatch('options', form) || [];

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, options, value });
    }, [title, isVertical, options, value]);

    //接收Antd传过来的参数：changedValues（变化的字段）, allValues（所有字段）
    function handleValueChange(changedValues: any, allValues: any) {
        if (onChange) {
            //错误：这里拿到的可能是未更新的旧数据
            //onChange(form.getFieldsValue());
            /**
             * handleValueChange 处理函数和useEffect相互配合出现的问题：
             * 1.触发添加：你点击 add，Antd 的 Form.List 在内部状态中增加了一个新选项。
             * 2.触发变化：表单内部状态改变，触发了 <Form onValuesChange={handleValueChange}>。
             * 3.获取脏数据（罪魁祸首）：在你的 handleValueChange 中，你使用了 form.getFieldsValue()。在 onValuesChange 触发的瞬间，由于 React 的异步更新机制，form.getFieldsValue() 有时拿到的还是添加之前的旧数据。
             * 4.状态提升：你把这份旧数据通过 onChange 传给了父组件（Redux）。
             * 5.重置表单：父组件接收到旧数据后，将旧的 options 作为 props 传回给当前组件。触发了 useEffect。
             * 6.瞬间抹杀：useEffect 执行 form.setFieldsValue({ ... })，用旧的 options 强行覆盖了表单，导致你刚刚添加的*   新选项瞬间消失，看起来就像没加成功一样。
             *  
             *  onValuesChange语义：监听表单值的变化，触发回调函数，并不保证store中的值及时更新。
             *  getFieldsValue语义：从当前store中读取字段值。              
             */

            // 确保在 onChange 中获取到最新的所有值
            onChange(allValues);
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
            <Form.Item label="选项">
                <Form.List name="options">
                    {
                        (fields, { add, remove }) => (
                            <>
                                {/* 遍历所有的选项（可删除） */}
                                {fields.map(({ key, name, ...restField }, index) => {
                                    return (
                                        <Space key={key} align="baseline">
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
                                                            const { options = [] } = form.getFieldsValue();

                                                            let num = 0;
                                                            options.forEach((opt: OptionType) => {
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
                                            {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                        </Space>
                                    )
                                })}

                                {/* 添加选项 */}
                                <Form.Item>
                                    <Button
                                        type="link"
                                        onClick={() => add({ text: '', value: `${Date.now()}` })}
                                        icon={<PlusOutlined />}
                                        block
                                    >添加选项</Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
            </Form.Item>
            <Form.Item label="默认选中" name="value">
                <Select
                    value={value}
                    options={watchOptions.map((opt: any, index: number) => ({
                        value: opt?.value || index,
                        label: opt?.text || ''
                    }))} />
            </Form.Item>
            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>垂直显示</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent;
