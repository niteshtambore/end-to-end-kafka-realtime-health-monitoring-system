import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AdditionalGraphs from './components/AdditionalGraphs';
import LiveHeartData from './components/LiveHeartData';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [isRiskDetected, setIsRiskDetected] = useState(false);
  const [consecutiveRiskCount, setConsecutiveRiskCount] = useState(0);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('http://localhost:5000/latest-message');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data);

        // Check for risk (e.g., heart rate > 200 or < 60)
        const heartRate = data.message.current_thalach;
        const isRisk = heartRate > 200 || heartRate < 60;
        setIsRiskDetected(isRisk);
        console.log('Heart rate:', heartRate, 'Risk detected:', isRisk);

        // Update chart data with a unique identifier
        setChartData((prevData) => {
          const newEntry = {
            id: Date.now(), // Use timestamp as a unique ID
            time: data.message.time,
            heartRate: heartRate,
          };
          return [...prevData, newEntry].slice(-10); // Limit to last 10 entries
        });

        // Update consecutive risk count
        setConsecutiveRiskCount((prevCount) => {
          const newCount = isRisk ? prevCount + 1 : 0;
          console.log('Previous risk count:', prevCount, 'New risk count:', newCount);
          if (newCount >= 3) {
            console.log('Risk detected more than 3 times consecutively');
            notifyUserAndDoctors();
          }
          return newCount;
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Fetch data initially
    fetchData();

    // Poll for new data every 2 seconds
    const interval = setInterval(fetchData, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const notifyUserAndDoctors = async () => {
    // Implement your notification logic here
    console.log('Notify user and doctors: Risk detected more than 3 times consecutively');

    // Define the common message
    const commonMessage = 'Urgent Health Alert:\nHeart rate exceeded normal limits 3+ times. Please check the health system.\nStay safe and take care.👨‍⚕️💌💕';

    // List of recipients (relatives and doctor)
    const recipients = [
      '+919834336193', // Relative's phone number
    ];

    // Send SMS to each recipient
    for (const recipient of recipients) {
      try {
        const response = await fetch('http://localhost:5000/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: commonMessage,
            to: recipient,
          }),
        });
        const data = await response.json();
        console.log('Message sent to', recipient, ':', data.message_sid);
      } catch (error) {
        console.error('Error sending message to', recipient, ':', error);
      }
    }
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        {/* Header */}
        <Navbar isLoggedIn={isLoggedIn} username={user?.username} setIsLoggedIn={setIsLoggedIn} setUsername={setUser} />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            {!isLoggedIn ? (
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/live-heart-data" element={
                  <LiveHeartData
                    loading={loading}
                    message={message}
                    chartData={chartData}
                    isRiskDetected={isRiskDetected}
                  />
                } />
                <Route path="/additional-graphs" element={<AdditionalGraphs />} />
                <Route path="/profile" element={<Profile user={user} />} />
                <Route path="/settings" element={<Settings />} />
              </>
            )}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-md py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2025 Real-Time Health Monitoring. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;