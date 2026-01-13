import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="h-full flex items-center justify-center text-gray-500">No data available</div>;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="views" stackId="1" stroke="#c6ff00" fill="#c6ff00" fillOpacity={0.2} />
                <Area type="monotone" dataKey="clicks" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AnalyticsChart;
