import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/realtime-logo.webp';
import profile from '../assets/profile.png';

const Navbar = ({ isLoggedIn, username, setIsLoggedIn, setUsername }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
    closeDropdown();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={logo} // Replace with your logo or profile image
                alt="Logo"
              />
            </div>
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-800">Health Monitor</p>
            </div>
          </div>

          {/* Middle Section: Navigation Links */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                    : 'text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/live-heart-data"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                    : 'text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Live Heart Data
              </NavLink>
              <NavLink
                to="/additional-graphs"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                    : 'text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
                }
              >
                Other Graphs
              </NavLink>
            </div>
          )}

          {/* Right Section: Profile Dropdown */}
          {isLoggedIn && (
            <div className="flex items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center focus:outline-none"
                  onClick={toggleDropdown}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={profile} // Replace with user's profile image
                    alt="Profile"
                  />
                  <span className="ml-2 text-gray-800 text-sm font-medium">{username}</span>
                  <svg
                    className="ml-2 h-4 w-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/s"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      Settings
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;