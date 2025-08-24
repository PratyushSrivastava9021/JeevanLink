import React from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';

const HomePage = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 w-full">
      <HeroSection setActiveTab={setActiveTab} />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
