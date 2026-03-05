import React, { FC } from 'react';
import { Typography } from 'antd';
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface';

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { title = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props };

    const genFontSize = (level: number) => {
        if (level === 1) return '24px';
        if (level === 2) return '20px';
        if (level === 3) return '16px';
    }

    return (
        <Title
            level={level}
            style={{
                fontSize: genFontSize(level),
                textAlign: isCenter ? 'center' : 'start',
                marginBottom: '0'
            }}>
            {title}
        </Title>
    )
}

export default QuestionTitle;
