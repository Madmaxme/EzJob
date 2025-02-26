import React, { useState } from 'react';
import { Search, Users, MessageSquare, Briefcase, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('seekers');

  return (
    <div className="w-full bg-gradient-to-b from-pink-50 to-pink-100 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl text-center font-medium text-navy-900 mb-4">
            How <span className="font-bold">EzJob</span> works:
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-4"></div>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                activeTab === 'seekers'
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('seekers')}
            >
              Finding Side Hustles
            </button>
            <button
              type="button"
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                activeTab === 'posters'
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('posters')}
            >
              Posting Jobs
            </button>
          </div>
        </div>

        {/* Content for Job Seekers */}
        {activeTab === 'seekers' && (
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
        )}

        {/* Content for Job Posters */}
        {activeTab === 'posters' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {/* Post a Job */}
            <div className="bg-white rounded-lg p-8 shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-orange-500">
              <div className="mb-6 flex justify-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Briefcase size={32} className="text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">1. Post your job</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                List your task in minutes with our simple form. Specify your budget, timeline, and requirements.
              </p>
            </div>

            {/* Connect with Workers */}
            <div className="bg-white rounded-lg p-8 shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-indigo-500">
              <div className="mb-6 flex justify-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <Users size={32} className="text-indigo-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">2. Find local talent</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Browse profiles or let qualified individuals apply. Message directly with potential workers in your area.
              </p>
            </div>

            {/* Task Completed */}
            <div className="bg-white rounded-lg p-8 shadow-md transform hover:scale-105 transition-transform duration-300 border-t-4 border-green-500">
              <div className="mb-6 flex justify-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                  <DollarSign size={32} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4 text-center">3. Get work done</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Review the completed work, make secure payment, and leave feedback to build your trusted network.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HowItWorks;