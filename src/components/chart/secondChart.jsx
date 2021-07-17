import "./chart.css";
import {
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Sector, 
  Cell, 
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
export default function SecondChart({ title, data, dataKey }) {
	return (
        <div className="secondChart">
            <h3 className="secondChartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={1.6 / 1}>
                <PieChart width={600} height={400}>
			        <Pie dataKey={dataKey} isAnimationActive={true} data={data} cx={180} cy={100} outerRadius={80} label>
                    {
          	            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                    <Legend verticalAlign="bottom" align="center" wrapperStyle={{position: 'relative', marginTop: '20px'}}/>
			        <Tooltip />
		        </PieChart>
                
            </ResponsiveContainer>    
        </div>
	);
}

