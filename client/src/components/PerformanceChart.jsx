import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = () => {
  const data = [
    { month: "Jan", marks: 30 },
    { month: "Feb", marks: 45 },
    { month: "Mar", marks: 38 },
    { month: "Apr", marks: 55 },
    { month: "May", marks: 53 },
    { month: "Jun", marks: 68 },
    { month: "Jul", marks: 75 },
    { month: "Aug", marks: 95 },
    { month: "Sep", marks: 125 },
  ];
  return (
    <div style={{ width: "90%", height: 165 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="marks"
            stroke="#ad46ff"
            strokeWidth={3}
            dot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
