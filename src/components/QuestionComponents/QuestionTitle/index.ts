/**
 * @description 问卷标题
 * @author 小慕
 */
import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTitleDefaultProps } from './interface';

export * from './interface';

//Title组件的配置
export default {
    title: '标题',
    type: 'QuestionTitle',
    Component,        //画布显示的组件
    PropComponent,      //修改属性
    defaultProps: QuestionTitleDefaultProps
}
