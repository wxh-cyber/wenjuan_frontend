import { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography;

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props };

    //尽量不要使用dangerouslySetInnerHTML，因为它会导致XSS攻击
    //采用加工成数组的方式进行文本框换行
    const textList=text.split('\n');

    return (
        <Paragraph
            style={{
                textAlign: isCenter ? 'center' : 'start',
                marginBottom: 0
            }}
        >
            {
                textList.map((item,index)=>{
                    return <span key={index}>{index>0&&<br />}{item}</span>
                })
            }
        </Paragraph>
    )
}

export default QuestionParagraph