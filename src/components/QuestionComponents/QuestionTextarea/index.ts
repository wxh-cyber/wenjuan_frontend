/**
 * @description 文本输入框组件
 * @author 小慕
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTextareaDefaultProps } from './interface';

export * from './interface';

//TextArea组件的配置
export default {
    title: '文本输入框',
    type: 'QuestionTextarea',
    Component,
    PropComponent,
    defaultProps: QuestionTextareaDefaultProps
}