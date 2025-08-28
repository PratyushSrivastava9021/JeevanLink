import React from 'react';
import { Heart, ArrowRight, Users, Clock, AlertTriangle, Search, Shield, Cross } from 'lucide-react';

const HeroSection = ({ setActiveTab }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Medical Cross Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 15 L30 45 M15 30 L45 30' stroke='%23ffffff' stroke-width='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-8 shadow-2xl">
              <Cross className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight tracking-tight">
              <span className="font-normal">Jeevan</span>
              <span className="font-bold text-red-400">Link</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Advanced donor matching platform for critical medical emergencies
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4 text-slate-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">ISO 27001 Certified</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm font-medium">HIPAA Compliant</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm font-medium">24/7 Medical Support</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-slate-300 font-medium">Verified Donors</div>
              <div className="text-slate-500 text-sm mt-2">Pre-screened & certified</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-slate-300 font-medium">Lives Saved</div>
              <div className="text-slate-500 text-sm mt-2">Documented cases</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">&lt; 30 min</div>
              <div className="text-slate-300 font-medium">Response Time</div>
              <div className="text-slate-500 text-sm mt-2">Critical emergency response</div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => setActiveTab('request')}
              className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-2xl hover:shadow-red-500/25 flex items-center transform hover:-translate-y-1"
            >
              <AlertTriangle className="w-6 h-6 mr-3" />
              Emergency Request
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('donor')}
              className="group bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex items-center transform hover:-translate-y-1"
            >
              <Heart className="w-6 h-6 mr-3" />
              Register as Donor
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('find-donors')}
              className="group bg-gradient-to-r from-slate-600 to-slate-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-2xl hover:shadow-slate-500/25 flex items-center transform hover:-translate-y-1"
            >
              <Search className="w-6 h-6 mr-3" />
              Find Donors
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-white/10 pt-12">
            <p className="text-slate-400 text-sm mb-6 font-medium tracking-wide uppercase">Trusted by Leading Medical Institutions</p>
            <div className="flex flex-wrap justify-center items-center space-x-8 opacity-70">
              <div className="text-white font-semibold text-lg">AIIMS Delhi</div>
              <div className="text-slate-400">•</div>
              <div className="text-white font-semibold text-lg">Apollo Hospital</div>
              <div className="text-slate-400">•</div>
              <div className="text-white font-semibold text-lg">Fortis Healthcare</div>
              <div className="text-slate-400">•</div>
              <div className="text-white font-semibold text-lg">Manipal Hospital</div>
            </div>
            <div className="mt-6 text-slate-500 text-sm">
              Partnered with 500+ hospitals across India
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
