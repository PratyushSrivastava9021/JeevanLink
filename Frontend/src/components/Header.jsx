import React from 'react';
import { Heart } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white shadow-lg border-b-2 border-red-500 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-2" />
            <span className="font-bold text-2xl text-gray-800">JeevanLink</span>
            <span className="ml-2 text-sm text-gray-600 hidden sm:block">Connecting Lives, Saving Futures</span>
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'home' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('request')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'request' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Request Help
            </button>
            <button
              onClick={() => setActiveTab('donor')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'donor' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Be a Donor
            </button>
            <button
              onClick={() => setActiveTab('find-donors')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'find-donors' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Find Donors
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
