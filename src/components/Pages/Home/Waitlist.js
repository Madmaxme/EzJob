import React from 'react';
import { ArrowRight, Star, Clock, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const Waitlist = () => {
  return (
    <div className="w-full bg-[#0A0B26] text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Main content */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-400" size={24} />
            <span className="text-yellow-400 uppercase font-semibold tracking-wider text-sm">Limited Alpha Access</span>
            <Star className="text-yellow-400" size={24} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Waitlist Now, <span className="text-teal-400">Get a Full Year Free</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            EzJob is currently in alpha testing with select users. Join our waitlist today and you'll 
            receive <span className="underline font-medium">guaranteed access</span> plus a full year 
            of premium features absolutely free when we launch.
          </p>
        </div>
        
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col items-center text-center">
            <Clock size={32} className="text-teal-400 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Early Access</h3>
            <p className="text-gray-300">Be among the first to use our platform when we exit alpha.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Gift size={32} className="text-teal-400 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Full Year Free</h3>
            <p className="text-gray-300">Receive 12 months of premium features at no cost.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <Star size={32} className="text-teal-400 mb-4" />
            <h3 className="font-semibold text-xl mb-2">Shape Our Future</h3>
            <p className="text-gray-300">Provide feedback that will influence our platform.</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/waitlist"
            className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            Join the Waitlist
            <ArrowRight size={20} />
          </Link>
          <p className="text-gray-400 text-sm mt-4">No credit card required. Limited spots available.</p>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;