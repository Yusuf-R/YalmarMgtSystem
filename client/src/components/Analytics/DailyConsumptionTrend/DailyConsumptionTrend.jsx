import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import dayjs from 'dayjs';

function DailyConsumptionTrend({dateSupplied, cpd}) {
    const startDate = dayjs(dateSupplied, "DD/MMM/YYYY");
    const today = dayjs();
    
    const data = [];
    for (let date = startDate; date.isBefore(today) || date.isSame(today); date = date.add(1, 'day')) {
        data.push({
            date: date.format("DD/MMM/YYYY"),
            consumption: (date.diff(startDate, 'day') + 1) * cpd
        });
    }
    
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#cccccc"/>
                <XAxis dataKey="date" stroke="#ffffff" tick={{fill: '#ffffff'}}/>
                <YAxis stroke="#ffffff" tick={{fill: '#ffffff'}}/>
                <Tooltip
                    labelStyle={{color: '#FFF'}}
                    itemStyle={{color: '#FFF'}}
                    cursor={{fill: 'transparent'}}
                    contentStyle={{backgroundColor: '#000', color: '#FFF'}}
                />
                <Legend/>
                <Line type="monotone" dataKey="consumption" stroke="#00ff00" activeDot={{r: 8}}
                
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default DailyConsumptionTrend;
