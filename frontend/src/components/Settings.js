import React from 'react';

const Settings = () => {
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h2>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="emailNotifications">Email Notifications</label>
            <select id="emailNotifications" className="w-full px-3 py-2 border rounded-lg">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="smsNotifications">SMS Notifications</label>
            <select id="smsNotifications" className="w-full px-3 py-2 border rounded-lg">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Privacy Settings</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profileVisibility">Profile Visibility</label>
            <select id="profileVisibility" className="w-full px-3 py-2 border rounded-lg">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="searchEngineIndexing">Search Engine Indexing</label>
            <select id="searchEngineIndexing" className="w-full px-3 py-2 border rounded-lg">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;