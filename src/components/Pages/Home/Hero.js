import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full bg-pink-50">
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
            {/* Updated button with Link to /auth */}
            <Link
              to="/Auth"
              className="bg-[#0A0B26] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
            >
              Join Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
