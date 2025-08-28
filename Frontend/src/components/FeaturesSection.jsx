import React from 'react';
import { Heart, Search, Phone, Clock, Shield, Users, MapPin, Bell } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: 'Quick Registration',
      description: 'Become a donor in minutes with our simple registration process. Your information is kept secure and confidential.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'Our AI-powered system instantly finds the best matches based on blood type, organ type, and location.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Phone,
      title: 'Instant Contact',
      description: 'Get connected with donors immediately through phone, email, or our secure messaging system.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Emergency requests are processed round the clock. Every second counts in saving lives.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Verified Donors',
      description: 'All donors are verified and their information is validated to ensure safety and reliability.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a network of compassionate individuals committed to helping others in medical emergencies.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      icon: Bell,
      title: 'Emergency Request',
      description: 'Submit an emergency request with patient details, blood/organ requirements, and hospital information.',
      color: 'bg-red-500'
    },
    {
      step: '2',
      icon: Search,
      title: 'Find Matches',
      description: 'Our system instantly searches through our database to find compatible donors in your area.',
      color: 'bg-blue-500'
    },
    {
      step: '3',
      icon: Phone,
      title: 'Connect & Coordinate',
      description: 'Get connected with matched donors immediately for coordination and arrangements.',
      color: 'bg-green-500'
    },
    {
      step: '4',
      icon: Heart,
      title: 'Save Lives',
      description: 'Complete the donation process and save precious lives through timely medical assistance.',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How JeevanLink Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it simple and fast to connect patients in need with willing donors. 
            Here's how we revolutionize emergency medical assistance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            The Process in 4 Simple Steps
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}>
                    {step.step}
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Connection Lines for Desktop */}
          <div className="hidden lg:block relative mt-8">
            <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-3/4 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-purple-500 transform -translate-y-1/2"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who have already saved lives. Your registration could be the difference between life and death for someone in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center">
              <Heart className="w-5 h-5 mr-2" />
              Register as Donor
            </button>
            <button className="bg-transparent border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center">
              <MapPin className="w-5 h-5 mr-2" />
              Find Donors Near You
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
