import React from 'react';
import { Heart, Users, Clock, Award, MapPin, Phone, Shield, Cross, ArrowRight } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Heart,
      number: '15,000+',
      label: 'Lives Saved',
      description: 'Through successful organ and blood donations',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      icon: Users,
      number: '25,000+',
      label: 'Registered Donors',
      description: 'Willing to help in emergencies',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Clock,
      number: '< 30 min',
      label: 'Average Response',
      description: 'Time to find and contact donors',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: Award,
      number: '500+',
      label: 'Partner Hospitals',
      description: 'Across major cities in India',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      icon: MapPin,
      number: '50+',
      label: 'Cities Covered',
      description: 'From Kashmir to Kanyakumari',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      icon: Phone,
      number: '24/7',
      label: 'Support Available',
      description: 'Round the clock emergency assistance',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl mb-6 shadow-lg">
            <Cross className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Making a <span className="font-bold text-red-600">Real Difference</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Our platform has revolutionized how emergency medical requests are handled, 
            connecting those in need with willing donors faster than ever before.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className={`${stat.bgColor} ${stat.borderColor} border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-3">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-slate-800 mb-3">
                  {stat.label}
                </div>
                <p className="text-slate-600 leading-relaxed font-light">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Story */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Medical Cross Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 15 L30 45 M15 30 L45 30' stroke='%23ffffff' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-8 shadow-2xl">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-white mb-8 leading-tight">
              Every Number Represents a <span className="font-bold text-red-400">Life</span>
            </h3>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed font-light max-w-4xl mx-auto">
              Behind each statistic is a real person whose life was saved or improved. 
              Our donors are everyday heroes who step up when it matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1">
                <Shield className="w-5 h-5 mr-3" />
                Read Success Stories
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex items-center transform hover:-translate-y-1">
                <Cross className="w-5 h-5 mr-3" />
                Join Our Mission
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
