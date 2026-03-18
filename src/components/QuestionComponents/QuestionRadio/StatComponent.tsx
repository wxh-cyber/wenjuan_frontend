import { FC,useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { STAT_COLORS } from '../../../constant';
import { QuestionRadioStatPropsType } from './interface';

function format(n:number){
    return (n*100).toFixed(2);
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({stat=[]}) => {
    const sum=useMemo(()=>{
        let s=0;
        stat.forEach(i =>s+=i.count);
        return s;
    },[stat]);

    return (
        <div style={{ width: '300px', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%" >
                <PieChart>
                    <Pie
                        data={stat}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"              //x轴的偏移
                        cy="50%"              //y轴的偏移
                        outerRadius={50}      //饼图的直径
                        fill="#8884d8"        //填充的颜色
                        label={({ name, payload }) => {
                            //注意：label的回调参数中默认有name、value、payload等，但是默认不支持count
                            /**
                             * 正确写法：
                             * 1.label={({name,value})=>...}   value来自dataKey="count"
                             * 2.label={({name,payload})=>...}   从原始字段取数据
                             */
                            const count = (payload as { count?: number } | undefined)?.count ?? 0;
                            return `${name}:${format(count/sum)}%`;
                        }}
                    >
                        {
                            stat.map((i,index)=>{
                                return (
                                    // 取模避免数组越界问题
                                    <Cell key={index} fill={STAT_COLORS[index % STAT_COLORS.length]} />
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

export default StatComponent;
