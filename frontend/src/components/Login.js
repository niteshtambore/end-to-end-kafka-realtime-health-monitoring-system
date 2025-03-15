import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUser }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Hardcoded credentials
        const credentials = {
            '2022484408@health.com': { email: "2022484408@health.com", password: 'nitesh@123', username: 'Nitesh Tambore', phone: 9421809542, address: 'Pune' },
            '2022484409@health.com': { email: "2022484409@health.com", password: 'yogesh@123', username: 'Yogesh Tambore', phone: 9421809543, address: 'Pune' },
        };

        if (credentials[userId] && credentials[userId].password === password) {
            setIsLoggedIn(true);
            setUser(credentials[userId]);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="userId">User ID</label>
                        <input
                            type="text"
                            id="userId"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;