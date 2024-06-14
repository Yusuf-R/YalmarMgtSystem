import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function BarChartBufferStock({bufferStockStatusData}) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={bufferStockStatusData}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="status" fill="#8884d8"/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartBufferStock