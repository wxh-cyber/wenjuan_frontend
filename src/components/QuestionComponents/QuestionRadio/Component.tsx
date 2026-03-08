import {FC} from 'react';
import {Radio, Typography} from 'antd';
import {QuestionRadioPropsType,QuestionRadioDefaultProps} from './interface';

const {Paragraph} = Typography;

const Component:FC<QuestionRadioPropsType> = (props:QuestionRadioPropsType)=>{
    const {title,isVertical,options=[],value} = {...QuestionRadioDefaultProps,...props};

    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <Radio.Group value={value} vertical={isVertical?true:false}>
                 {
                    options.map(opt =>{
                        const {value,text} = opt;
                        return (
                            <Radio key={value} value={value}>{text}</Radio>
                        )
                    })
                 }
            </Radio.Group>
        </div>
    )
}

export default Component;