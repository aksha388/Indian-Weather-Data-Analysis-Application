import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';

interface WeatherChartProps {
  data: ChartData[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
          <Line type="monotone" dataKey="precipitation" stroke="#ffc658" name="Precipitation (mm)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}