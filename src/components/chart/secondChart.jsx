import './chart.css';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
export default function SecondChart({ title, data, dataKey }) {
  return (
    <div className="secondChart">
      <h3 className="secondChartTitle">{title}</h3>
      <ResponsiveContainer aspect={1.6 / 1}>
        <PieChart>
          <Pie
            dataKey={dataKey}
            isAnimationActive={true}
            data={data}
            cx={250}
            cy={120}
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
