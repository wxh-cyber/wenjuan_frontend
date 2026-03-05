import {QuestionInputPropsType} from './QuestionInput/interface';
import {QuestionTitlePropsType} from './QuestionTitle/interface';

//各个组件的PropsType
//通过联合类型的方式进行统一整合
export type ComponentPropsType=QuestionInputPropsType|QuestionTitlePropsType;