"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {name: 'Mon', ThisWeek: 350, LastWeek: 200},
    {name: 'Tue', ThisWeek: 280, LastWeek: 460},
    {name: 'Wed', ThisWeek: 320, LastWeek: 410},
    {name: 'Thu', ThisWeek: 390, LastWeek: 380},
    {name: 'Fri', ThisWeek: 420, LastWeek: 100},
    {name: 'Sat', ThisWeek: 300, LastWeek: 90},
    {name: 'Sun', ThisWeek: 257, LastWeek: 50},
  ];
  

export default function WaterConsumptionChart() {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ThisWeek" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="LastWeek" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer>
      );
}