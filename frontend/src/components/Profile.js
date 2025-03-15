import React from 'react';
import profile from '../assets/profile.png'; // Replace with your actual profile image path

const Profile = ({ user }) => {
    console.log(user , "user");
    
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-6">
          <img
            className="h-24 w-24 rounded-full"
            src={profile} // Replace with user's profile image
            alt="Profile"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
            <p className="text-gray-600">User ID: {user.email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-600 mb-2"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-gray-600 mb-2"><strong>Address:</strong> {user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;