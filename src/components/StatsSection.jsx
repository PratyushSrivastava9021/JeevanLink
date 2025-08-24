import React from 'react';

const StatsSection = () => {
  return (
    <div className="bg-white py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-gray-600">Lives Saved</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-red-600 mb-2">5000+</div>
            <div className="text-gray-600">Registered Donors</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
            <div className="text-gray-600">Partner Hospitals</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-red-600 mb-2">&lt; 10min</div>
            <div className="text-gray-600">Average Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
