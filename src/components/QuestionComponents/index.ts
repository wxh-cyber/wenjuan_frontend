/**
 * @description 问卷组件的配置
 * @author 小慕
 */
import { FC } from 'react';
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput';
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConfig, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConfig, { QuestionTextareaPropsType } from './QuestionTextarea';
import QuestionRadioConfig, { QuestionRadioPropsType } from './QuestionRadio';
import QuestionCheckboxConfig, { QuestionCheckboxPropsType } from './QuestionCheckbox';

//各个组件的PropsType
//通过交叉类型的方式进行统一整合
export type ComponentPropsType = QuestionInputPropsType &
    QuestionTitlePropsType &
    QuestionParagraphPropsType &
    QuestionInfoPropsType &
    QuestionTextareaPropsType &
    QuestionRadioPropsType &
    QuestionCheckboxPropsType;


//组件的配置
export type ComponentConfigType = {
    title: string;
    type: string;
    Component: FC<ComponentPropsType>;
    PropComponent: FC<ComponentPropsType>;
    defaultProps: ComponentPropsType;
}

//全部组件配置的列表
//由于单个的QuestionInputConfig和QuestionTitleConfig的type内部都是可选属性，所以可以这样配置
const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig,
    QuestionTitleConfig,
    QuestionParagraphConfig,
    QuestionInfoConfig,
    QuestionTextareaConfig,
    QuestionRadioConfig,
    QuestionCheckboxConfig
];

//组件分组
export const componentConfigGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConfig,QuestionTitleConfig, QuestionParagraphConfig]
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConfig,QuestionTextareaConfig]
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConfig,QuestionCheckboxConfig]
    }
]

export function getComponentConfigByType(type: string) {
    if (!type) return undefined;
    return (
        //增加了大小写类型兼容
        componentConfigList.find(item => item.type === type) ||
        componentConfigList.find(item => item.type.toLowerCase() === type.toLowerCase())
    );
}
