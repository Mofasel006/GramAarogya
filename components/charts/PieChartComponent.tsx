"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "হৃদরোগ", value: 30.5 },
  { name: "শ্বাসকষ্ট জনিত রোগ", value: 15.2 },
  { name: "মাতৃত্বকালীন জটিলতা", value: 12.8 },
  { name: "ডায়াবেটিস", value: 10.4 },
  { name: "শিশুর অপুষ্টি", value: 8.6 },
  { name: "অন্যান্য", value: 22.5 },
]

const COLORS = ["#9333ea", "#ec4899", "#8b5cf6", "#d946ef", "#a855f7", "#64748b"]

export default function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

