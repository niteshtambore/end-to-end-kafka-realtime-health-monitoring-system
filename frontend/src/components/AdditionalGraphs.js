import React from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const hardcodedData = [
  { ActivityDate: '04-12-2024', Day: "Monday", TotalSteps: 13162, TotalDistance: 8.5, Calories: 1985 },
  { ActivityDate: '04-13-2024', Day: "Tuesday", TotalSteps: 10735, TotalDistance: 6.97, Calories: 1797 },
  { ActivityDate: '04-14-2024', Day: "Wednesday", TotalSteps: 10460, TotalDistance: 6.74, Calories: 1776 },
  { ActivityDate: '04-15-2024', Day: "Thursday", TotalSteps: 9762, TotalDistance: 6.28, Calories: 1745 },
  { ActivityDate: '04-16-2024', Day: "Friday", TotalSteps: 12669, TotalDistance: 8.16, Calories: 1863 },
  { ActivityDate: '04-17-2024', Day: "Saturday", TotalSteps: 9705, TotalDistance: 6.48, Calories: 1728 },
  { ActivityDate: '04-18-2024', Day: "Sunday", TotalSteps: 13019, TotalDistance: 8.59, Calories: 1921 },
];

function AdditionalGraphs() {
  const caloriesTarget = 2500;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Steps Graph */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Steps</h2>
          <div className="w-full flex justify-center items-center" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hardcodedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="Day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="TotalSteps" fill="#82ca9d" name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distance Graph */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Distance</h2>
          <div className="w-full flex justify-center items-center" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hardcodedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="Day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="TotalDistance" stroke="#ff7300" fill="#ff7300" name="Distance (km)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calories Graph */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Calories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hardcodedData.map((entry) => {
              const percentage = (entry.Calories / caloriesTarget) * 100;
              return (
                <div key={entry.ActivityDate} style={{ width: 100, height: 100, margin: '0 auto' }}>
                  <CircularProgressbarWithChildren
                    value={percentage}
                    styles={buildStyles({
                      textColor: '#8884d8',
                      pathColor: '#8884d8',
                      trailColor: '#eee',
                    })}
                  >
                    <div style={{ fontSize: 12, marginTop: -5 }}>
                      <strong>{entry.Day}</strong>
                    </div>
                    <div style={{ fontSize: 24 }}>
                      <strong>{Math.round(percentage)}%</strong>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalGraphs;