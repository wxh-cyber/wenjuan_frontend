export type QuestionInputPropsType={
    title?:string,
    placeholder?:string,

    onChange?:(newProps:QuestionInputPropsType)=>void,
    disabled?:boolean;      //禁用表单的属性
}

export const QuestionInputDefaultProps:QuestionInputPropsType={
    title:'输入框标题',
    placeholder:'请输入...'
}