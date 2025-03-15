import React from 'react';
import { Link } from 'react-router-dom';
import graphImage from '../assets/graph-image.png'; // Replace with your actual image path
import mapImage from '../assets/route-marked-on-a-map.avif'; // Replace with your actual image path
import liveImage from '../assets/low-heart-rate.jpg'; // Replace with your actual image path

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Real-Time Health Monitoring</h1>
        <p className="text-lg text-gray-600 mt-4">Monitor your health in real-time with our advanced analytics and visualization tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Live Heart Data</h2>
          <p className="text-gray-600 mb-4">Track your heart rate in real-time and get alerts if any abnormalities are detected.</p>
          <img src={liveImage} alt="Graph" className="w-full h-48 object-cover rounded-lg mb-4" />
          <Link to="/live-heart-data" className="text-blue-600 hover:underline">View Live Heart Data</Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Additional Graphs</h2>
          <p className="text-gray-600 mb-4">Explore additional graphs and analytics to gain deeper insights into your health.</p>
          <img src={graphImage} alt="Graph" className="w-full h-48 object-cover rounded-lg mb-4" />
          <Link to="/additional-graphs" className="text-blue-600 hover:underline">View Additional Graphs</Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Health Maps</h2>
          <p className="text-gray-600 mb-4">Visualize your health data on interactive maps for better understanding.</p>
          <img src={mapImage} alt="Map" className="w-full h-48 object-cover rounded-lg mb-4" />
          <Link to="/health-maps" className="text-blue-600 hover:underline">View Health Maps</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;