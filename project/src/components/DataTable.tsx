import React from 'react';
import { WeatherData } from '../types';

interface DataTableProps {
  data: WeatherData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature (°C)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity (%)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precipitation (mm)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.city}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.temperature}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.humidity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.precipitation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}