"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { year: 1990, lifeExpectancy: 58 },
  { year: 2000, lifeExpectancy: 65 },
  { year: 2010, lifeExpectancy: 70 },
  { year: 2020, lifeExpectancy: 73 },
  { year: 2023, lifeExpectancy: 74 },
]

export default function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="lifeExpectancy" stroke="#ec4899" activeDot={{ r: 8 }} name="গড় আয়ু" />
      </LineChart>
    </ResponsiveContainer>
  )
}

