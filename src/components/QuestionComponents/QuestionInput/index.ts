/**
 * @description 问卷输入框
 * @author 小慕
 */
import Component from './Component';
import PropComponent from './PropComponent';
import {QuestionInputDefaultProps} from './interface';

export * from './interface';

//Input组件的配置
export default {
    title:'输入框',
    type:'QuestionInput',
    Component,        //画布显示的组件
    PropComponent,      //修改属性
    defaultProps:QuestionInputDefaultProps
}
