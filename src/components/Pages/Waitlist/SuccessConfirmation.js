import React from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessConfirmation = () => {
  return (
    <div className="min-h-screen w-full bg-pink-50 text-gray-800 pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-lg p-10 shadow-lg border border-teal-200">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-teal-500" size={64} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            You're on the <span className="text-teal-500">Waitlist!</span>
          </h2>
          
          <p className="text-xl text-gray-700 mb-8">
            Thank you for your valuable feedback and for joining our waitlist.
            We'll notify you as soon as EzJob is ready to launch.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            <span className="text-yellow-600 uppercase font-semibold tracking-wider text-sm">Limited Alpha Access</span>
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
          </div>
          
          <p className="text-gray-600 mb-8">
            Remember, as one of our early supporters, you'll receive a full year of premium features for free when we launch!
          </p>
          
          <Link
            to="/"
            className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirmation;