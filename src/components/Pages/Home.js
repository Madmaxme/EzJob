import React from 'react';
import { ArrowRight, Search, Users, MessageSquare } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Full viewport height with centered content */}
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-medium text-navy-900 mb-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
              <span>The easiest way of</span>
              <span className="bg-teal-100 px-4 py-2 rounded-md font-bold whitespace-nowrap">
                finding jobs
              </span>
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              Apply in seconds. Get hired in minutes.
            </p>
            <button className="bg-[#0A0B26] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors inline-flex items-center gap-2">
              Start free trial
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-4xl md:text-5xl text-center font-medium text-navy-900 mb-20">
          How finding jobs with{' '}
          <span className="font-bold">EzJob</span> works:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Find Jobs */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <Search size={32} className="text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">1. Find the perfect job</h3>
            <p className="text-gray-600 leading-relaxed">
              Filter jobs by location, pay, and type. Find exactly what matches your skills and schedule.
            </p>
          </div>

          {/* Connect */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <Users size={32} className="text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">2. Connect instantly</h3>
            <p className="text-gray-600 leading-relaxed">
              View verified job posts with clear requirements and rates. Stand out with your profile.
            </p>
          </div>

          {/* Get Hired */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <MessageSquare size={32} className="text-navy-900" />
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">3. Get hired & paid</h3>
            <p className="text-gray-600 leading-relaxed">
              Chat with employers, agree on terms, and receive secure payments. Build your reputation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;