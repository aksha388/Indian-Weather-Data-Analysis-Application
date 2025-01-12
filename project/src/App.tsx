import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CloudRain, ThermometerSun } from 'lucide-react';
import { WeatherData, ChartData } from './types';
import { DataTable } from './components/DataTable';
import { WeatherChart } from './components/WeatherChart';

// Sample dataset for Indian cities
const WEATHER_DATA = `date,city,temperature,humidity,precipitation
2024-03-01,Mumbai,32,75,0
2024-03-01,Delhi,28,65,0
2024-03-01,Bangalore,27,68,2
2024-03-01,Chennai,31,78,0
2024-03-01,Kolkata,30,72,1
2024-03-02,Mumbai,31,77,0
2024-03-02,Delhi,27,62,0
2024-03-02,Bangalore,26,70,5
2024-03-02,Chennai,32,76,0
2024-03-02,Kolkata,29,74,2`;

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Parse CSV data
    Papa.parse(WEATHER_DATA, {
      header: true,
      complete: (results) => {
        const parsedData = results.data.map((row: any) => ({
          ...row,
          temperature: parseFloat(row.temperature),
          humidity: parseFloat(row.humidity),
          precipitation: parseFloat(row.precipitation),
        }));
        setWeatherData(parsedData);
      },
    });
  }, []);

  useEffect(() => {
    // Process data for charts
    const filteredData = selectedCity === 'all'
      ? weatherData
      : weatherData.filter(row => row.city === selectedCity);

    const processedData = filteredData.reduce((acc: ChartData[], curr) => {
      const existing = acc.find(item => item.name === curr.date);
      if (existing) {
        existing.temperature = (existing.temperature + curr.temperature) / 2;
        existing.humidity = (existing.humidity + curr.humidity) / 2;
        existing.precipitation = (existing.precipitation + curr.precipitation) / 2;
      } else {
        acc.push({
          name: curr.date,
          temperature: curr.temperature,
          humidity: curr.humidity,
          precipitation: curr.precipitation,
        });
      }
      return acc;
    }, []);

    setChartData(processedData);
  }, [weatherData, selectedCity]);

  const cities = [...new Set(weatherData.map(row => row.city))];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Indian Weather Analysis
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CloudRain className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Weather Trends</h2>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <WeatherChart data={chartData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Weather Data</h2>
          <DataTable data={weatherData} />
        </div>
      </main>
    </div>
  );
}

export default App;