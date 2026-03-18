import { FC } from 'react';
import { PieChart, Pie, Legend,Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { STAT_COLORS } from '../../../constant';

const data = [
    { name: 'group A', value: 400 },
    { name: 'group B', value: 300 },
    { name: 'group C', value: 300 },
    { name: 'group D', value: 200 },
    { name: 'group E', value: 278 },
    { name: 'group F', value: 189 }
];

const PieDemo: FC = () => {
    return (
        <div style={{ width: '300px', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"              //x轴的偏移
                        cy="50%"              //y轴的偏移
                        outerRadius={50}      //饼图的直径
                        fill="#8884d8"        //填充的颜色
                        label={i => `${i.name}:${i.value}`}
                    >
                        {
                            data.map((i,index)=>{
                                return (
                                    <Cell key={index} fill={STAT_COLORS[index]} />
                                )
                            })
                        }
                    </Pie>
                    {/* Tooltip保证鼠标放置时，显示浮动的字体 */}
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieDemo;