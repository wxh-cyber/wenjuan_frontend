/**
 * @description 问卷checkbox
 * @author 小慕
 */
import Component from "./Component";
import PropComponent from "./PropComponent";
import {QuestionCheckboxDefaultProps} from "./interface";

export * from "./interface";

export default {
    title:'多选',
    type:'QuestionCheckbox',
    Component,
    PropComponent,
    defaultProps:QuestionCheckboxDefaultProps,
}
