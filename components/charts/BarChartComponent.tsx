"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { indicator: "উন্নত স্যানিটেশন সুবিধা", urban: 90, rural: 65 },
  { indicator: "প্রাতিষ্ঠানিক প্রসব", urban: 85, rural: 60 },
  { indicator: "সম্পূর্ণ টিকাদান", urban: 92, rural: 88 },
  { indicator: "শিশুদের খর্বকায়তা (Stunting)", urban: 28, rural: 35 },
  { indicator: "মাতৃত্বকালীন পুষ্টি", urban: 75, rural: 65 },
]

export default function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="indicator" type="category" width={150} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="urban" fill="#9333ea" name="শহর" />
        <Bar dataKey="rural" fill="#ec4899" name="গ্রাম" />
      </BarChart>
    </ResponsiveContainer>
  )
}

