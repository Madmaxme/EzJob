import React from 'react';
import { Search, Users, MessageSquare } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="w-full bg-gradient-to-b from-pink-50 to-pink-100 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl text-center font-medium text-navy-900 mb-4">
            How finding side hustles with{' '}
            <span className="font-bold">EzJob</span> works:
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* Find Gigs */}
          <div className="bg-white rounded-lg p-8 shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-blue-500">
            <div className="mb-6 flex justify-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Search size={32} className="text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">1. Find local gigs</h3>
            <p className="text-gray-600 leading-relaxed text-center">
              Browse side hustles by location, category, and duration. Find flexible gigs that fit your schedule and skills.
            </p>
          </div>

          {/* Connect */}
          <div className="bg-white rounded-lg p-8 shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-teal-500">
            <div className="mb-6 flex justify-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
                <Users size={32} className="text-teal-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">2. Connect directly</h3>
            <p className="text-gray-600 leading-relaxed text-center">
              Chat with local community members about their needs. No middlemen or complex applications.
            </p>
          </div>

          {/* Get Paid */}
          <div className="bg-white rounded-lg p-8 shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-purple-500">
            <div className="mb-6 flex justify-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center">
                <MessageSquare size={32} className="text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">3. Complete & get paid</h3>
            <p className="text-gray-600 leading-relaxed text-center">
              Finish the task on your terms, receive immediate payment, and build your local reputation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;