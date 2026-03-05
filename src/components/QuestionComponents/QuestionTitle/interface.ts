export type QuestionTitlePropsType={
    title?:string;
    level?:1|2|3|4|5;      //由于level只有固定的几个整数，所以写成联合类型
    isCenter?:boolean;
}

export const QuestionTitleDefaultProps:QuestionTitlePropsType={
    title:'一行标题',
    level:1,
    isCenter:false
}