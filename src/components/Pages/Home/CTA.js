import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTA = () => {
  const benefits = [
    "Find flexible gigs that fit your schedule",
    "Set your own rates and conditions",
    "Connect directly with local clients",
    "Get paid instantly upon completion"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-pink-50 to-pink-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="hidden md:block absolute -right-10 top-0 w-64 h-64 rounded-full bg-pink-200 opacity-50"></div>
      <div className="hidden md:block absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-pink-200 opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-xl border border-pink-200">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="md:w-3/5 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                Ready to find your next side hustle?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands who've found flexible gigs through EzJob.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
              <a href="/listing" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors inline-flex items-center justify-center gap-2">
                  Find gigs now
                  <ArrowRight size={20} />
                </a>
                <a href="/listing" className="border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                  Post a gig
                </a>
              </div>
            </div>
            
            {/* Right content - statistics */}
            <div className="md:w-2/5 bg-pink-50 rounded-lg p-6 border border-pink-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
                Join the community
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <span className="block text-3xl font-bold text-blue-600 mb-1">10K+</span>
                  <span className="text-gray-600 text-sm">Active gigs</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <span className="block text-3xl font-bold text-purple-600 mb-1">8K+</span>
                  <span className="text-gray-600 text-sm">Users</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <span className="block text-3xl font-bold text-teal-600 mb-1">24h</span>
                  <span className="text-gray-600 text-sm">Avg. response</span>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <span className="block text-3xl font-bold text-green-600 mb-1">95%</span>
                  <span className="text-gray-600 text-sm">Success rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;