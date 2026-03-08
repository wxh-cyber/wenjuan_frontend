/** 
 * @description 问卷 - 段落
 * @author 小慕
 */

import Component from './Component'
import PropComponent from './PropComponent'
import {QuestionParagraphDefaultProps} from './interface'

export * from './interface'

//Paragraph组件的配置
export default {
    title:'段落',
    type:'QuestionParagraph',
    Component,
    PropComponent,
    defaultProps:QuestionParagraphDefaultProps,
}
