import React from 'react';
import { ArrowRight, Star, CircleDollarSign, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListingWaitlist = () => {
  return (
    <div className="w-full bg-white py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header with star icon */}
        <div className="flex items-center mb-4">
          <Star className="text-yellow-400 fill-yellow-400 mr-2" size={20} />
          <span className="text-yellow-500 uppercase font-semibold tracking-wider text-xs">LIMITED ALPHA ACCESS</span>
        </div>
        
        {/* Main headline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">
              Find More Jobs Like These <span className="text-teal-400">Before</span>
              <br className="hidden md:block" /> <span className="text-teal-400">Anyone Else</span>
            </h2>
            
            <p className="text-gray-600 mb-6">
              Join our waitlist today and get early access to premium side jobs in your 
              area, plus a full year of premium features free when we launch.
            </p>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-6">
              <div className="flex items-center">
                <CircleDollarSign size={18} className="text-teal-500 mr-2" />
                <span className="text-gray-600">Higher paying opportunities</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-teal-500 mr-2" />
                <span className="text-gray-600">Closer to your location</span>
              </div>
              <div className="flex items-center">
                <Star size={18} className="text-teal-500 mr-2" />
                <span className="text-gray-600">Verified employers only</span>
              </div>
              <div className="flex items-center">
                <ArrowRight size={18} className="text-teal-500 mr-2" />
                <span className="text-gray-600">Apply with priority</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button aligned to the right on desktop */}
          <div className="w-full md:w-auto">
            <Link
              to="/waitlist"
              className="w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-lg text-base font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              Join the Waitlist
              <ArrowRight size={18} />
            </Link>
            <p className="text-gray-400 text-xs mt-2 text-center md:text-right">No credit card required. Limited spots available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingWaitlist;