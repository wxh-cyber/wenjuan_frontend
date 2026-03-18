import { FC } from 'react';
import { BarChart, Bar,Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({stat}) => {
    return (
        <div style={{ width: '400px', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart
                    width={400}
                    height={300}
                    data={stat}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />       {/*X轴上显示name变量的值 */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatComponent;