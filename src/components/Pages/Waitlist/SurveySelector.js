import React from 'react';
import { UserRound, Briefcase, Star, Clock, Gift } from 'lucide-react';

const SurveySelector = ({ onSelectSurvey }) => {
  return (
    <div className="w-full min-h-screen bg-pink-50 text-gray-800 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="text-yellow-500 fill-yellow-500" size={24} />
          <span className="text-yellow-600 uppercase font-semibold tracking-wider text-sm">Limited Alpha Access</span>
          <Star className="text-yellow-500 fill-yellow-500" size={24} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Join Our Waitlist Now, <span className="text-teal-500">Get a Full Year Free</span>
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          EzJob is currently in alpha testing with select users. Join our waitlist today and you'll 
          receive <span className="underline font-medium">guaranteed access</span> plus a full year 
          of premium features absolutely free when we launch.
        </p>
        
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col items-center text-center">
            <Clock size={32} className="text-teal-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-gray-900">Early Access</h3>
            <p className="text-gray-700">Be among the first to use our platform when we exit alpha.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Gift size={32} className="text-teal-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-gray-900">Full Year Free</h3>
            <p className="text-gray-700">Receive 12 months of premium features at no cost.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Star size={32} className="text-teal-500 mb-4" />
            <h3 className="font-semibold text-xl mb-2 text-gray-900">Shape Our Future</h3>
            <p className="text-gray-700">Provide feedback that will influence our platform.</p>
          </div>
        </div>
        
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Please select which survey is most relevant to you so we can better understand your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            onClick={() => onSelectSurvey('seeker')}
            className="bg-white hover:bg-gray-50 transition-colors p-8 rounded-lg flex flex-col items-center border border-teal-200 hover:border-teal-400 shadow-md hover:shadow-lg"
          >
            <UserRound size={48} className="text-teal-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">I'm Looking for Jobs</h2>
            <p className="text-gray-600">Complete this survey if you're interested in finding side jobs or gigs</p>
          </button>
          
          <button 
            onClick={() => onSelectSurvey('offerer')}
            className="bg-white hover:bg-gray-50 transition-colors p-8 rounded-lg flex flex-col items-center border border-teal-200 hover:border-teal-400 shadow-md hover:shadow-lg"
          >
            <Briefcase size={48} className="text-teal-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">I'm Offering Jobs</h2>
            <p className="text-gray-600">Complete this survey if you want to find workers for your jobs or projects</p>
          </button>
        </div>
        
        <p className="text-gray-500 text-sm mt-6">No credit card required. Limited spots available.</p>
      </div>
    </div>
  );
};

export default SurveySelector;