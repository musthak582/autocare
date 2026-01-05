import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaCar className="text-2xl text-blue-400" />
            <span className="text-xl font-bold">FUCHSIUS AutoCare</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-300 transition-colors">
              Book Service
            </Link>
            {user && (
              <>
                <Link to="/admin" className="hover:text-blue-300 transition-colors">
                  Dashboard
                </Link>
                <Link to="/services" className="hover:text-blue-300 transition-colors">
                  Service Types
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <FaUserCog />
                  <span className="hidden md:inline">Welcome, {user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;