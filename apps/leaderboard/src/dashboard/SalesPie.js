import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import Title from './Title';
import { leaders } from './Leaders';
import { useParams } from 'react-router-dom';

const data = Object.values(leaders)
  .filter((row) => row.id)
  .map((row) => ({
    name: row.name,
    won: row.won,
    open: row.open,
    lost: row.lost,
  }));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'green'];

const customLabel = ({ name, percent }) =>
  name + ` (${(percent * 100).toFixed(0)}%)`;

export default function SalesPie() {
  const { status } = useParams();
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <PieChart width={800} height={400}>
          <Pie
            dataKey={status ?? 'won'}
            // label
            isAnimationActive={false}
            labelLine={true}
            label={customLabel}
            data={data}
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
