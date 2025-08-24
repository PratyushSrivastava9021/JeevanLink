import React from 'react';
import { Heart, Plus } from 'lucide-react';

const HeroSection = ({ setActiveTab }) => {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your <span className="text-red-600">Lifeline</span> in
            <br />
            Emergencies
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            JeevanLink revolutionizes emergency blood and organ requests. We connect those in critical need
            with available donors swiftly and efficiently, minimizing response times and maximizing lives saved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('request')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="inline-block w-5 h-5 mr-2" />
              Request Emergency Help
            </button>
            <button
              onClick={() => setActiveTab('donor')}
              className="bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Heart className="inline-block w-5 h-5 mr-2" />
              Become a Donor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
