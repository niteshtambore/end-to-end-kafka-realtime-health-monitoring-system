import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LiveHeartData = ({ loading, message, chartData, isRiskDetected }) => {
  // Custom tick formatter to display only the time part
  const formatTime = (tickItem) => {
    const time = tickItem.split(' ')[1]; // Extract the time part
    return time;
  };

  return (
    loading ? (
      <p className="text-center text-gray-600">Loading data...</p>
    ) : message ? (
      <div>
        {/* Heart Rate Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Heart Rate Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Heart Rate</h2>
            <div className="text-center">
              <p className="text-5xl font-bold text-purple-600">
                {message.message.current_thalach} <span className="text-2xl text-gray-500">bpm</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">Last updated: {message.message.time}</p>
              {isRiskDetected ? (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
                  <p className="font-bold">Risk Detected!</p>
                  <p>Heart rate is outside the safe range.</p>
                </div>
              ) : (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-4" role="alert">
                  <p className="font-bold">Normal Heart Rate</p>
                  <p>Heart rate is within the safe range.</p>
                </div>
              )}
            </div>
          </div>

          {/* Heart Rate Graph */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Heart Rate Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="time" stroke="#666" tickFormatter={formatTime} />
                <YAxis ticks={[50, 75, 100, 125, 150, 175, 200, 225, 250]} stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  stroke={isRiskDetected ? "#ff0000" : "#8884d8"} // Change line color if risk is detected
                  strokeWidth={2}
                  dot={{ fill: isRiskDetected ? "#ff0000" : "#8884d8", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Heart Rate (bpm)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-600">No data received yet.</p>
    )
  );
};

export default LiveHeartData;