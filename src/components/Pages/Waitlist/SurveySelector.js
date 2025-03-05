import React from 'react';
import { UserRound, Briefcase, Star, Clock, Gift } from 'lucide-react';

const SurveySelector = ({ onSelectSurvey }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-pink-50 to-pink-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="hidden md:block absolute -right-10 top-0 w-64 h-64 rounded-full bg-pink-200 opacity-50"></div>
      <div className="hidden md:block absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-pink-200 opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-xl border border-pink-200">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="text-yellow-400" size={24} />
              <span className="text-yellow-500 uppercase font-semibold tracking-wider text-sm">Limited Alpha Access</span>
              <Star className="text-yellow-400" size={24} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-navy-900">
              Join Our Waitlist Now, <span className="text-teal-500">Get a Full Year Free</span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              EzJob is currently in alpha testing with select users. Join our waitlist today and you'll 
              receive <span className="underline font-medium">guaranteed access</span> plus a full year 
              of premium features absolutely free when we launch.
            </p>
          </div>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-pink-50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-teal-100 p-3 mb-4">
                <Clock size={24} className="text-teal-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900">Early Access</h3>
              <p className="text-gray-700">Be among the first to use our platform when we exit alpha.</p>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-teal-100 p-3 mb-4">
                <Gift size={24} className="text-teal-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900">Full Year Free</h3>
              <p className="text-gray-700">Receive 12 months of premium features at no cost.</p>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-teal-100 p-3 mb-4">
                <Star size={24} className="text-teal-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900">Shape Our Future</h3>
              <p className="text-gray-700">Provide feedback that will influence our platform.</p>
            </div>
          </div>
          
          {/* Survey Selection */}
          <h2 className="text-2xl font-bold text-center mb-6">Tell us a bit about yourself</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <button 
              onClick={() => onSelectSurvey('offerer')}
              className="bg-white hover:bg-gray-50 transition-colors p-6 rounded-lg flex flex-col items-center border-2 border-teal-200 hover:border-teal-400 shadow-md hover:shadow-lg"
            >
              <div className="rounded-full bg-teal-100 p-4 mb-4">
                <UserRound size={32} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">I'm Looking for Jobs</h3>
              <p className="text-gray-600 text-center">Complete this survey if you're interested in finding side jobs or gigs</p>
            </button>
            
            <button 
              onClick={() => onSelectSurvey('seeker')}
              className="bg-white hover:bg-gray-50 transition-colors p-6 rounded-lg flex flex-col items-center border-2 border-teal-200 hover:border-teal-400 shadow-md hover:shadow-lg"
            >
              <div className="rounded-full bg-teal-100 p-4 mb-4">
                <Briefcase size={32} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">I'm Offering Jobs</h3>
              <p className="text-gray-600 text-center">Complete this survey if you want to find workers for your jobs or projects</p>
            </button>
          </div>
          
          <p className="text-center text-gray-500 text-sm">No credit card required. Limited spots available.</p>
        </div>
      </div>
    </section>
  );
};

export default SurveySelector;