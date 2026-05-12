"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { year: 1990, mortalityRate: 144 },
  { year: 2000, mortalityRate: 88 },
  { year: 2010, mortalityRate: 48 },
  { year: 2020, mortalityRate: 28 },
  { year: 2022, mortalityRate: 24 },
]

export default function AreaChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="mortalityRate"
          stroke="#9333ea"
          fillOpacity={1}
          fill="url(#colorRate)"
          name="মৃত্যুহার"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

