/**
 * @description 单选组件
 * @author 小慕
 */
import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionRadioDefaultProps } from './interface';

export * from './interface';

//Radio组件的配置
export default {
    title: '单选',
    type: 'QuestionRadio',
    Component,
    PropComponent,
    defaultProps: QuestionRadioDefaultProps
}