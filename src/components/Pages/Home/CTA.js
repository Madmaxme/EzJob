import React from 'react';
import { ArrowRight, CheckCircle, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  const benefits = [
    "Early access when we exit alpha testing",
    "Full year of premium features for free",
    "Provide feedback to shape our platform",
    "No credit card required to join"
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
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-yellow-400" size={20} />
                <span className="text-yellow-500 uppercase font-semibold tracking-wider text-sm">Limited Alpha Access</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-6">
                Ready to join our exclusive waitlist?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get early access and a full year of premium features for free when we launch.
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
                <Link 
                  to="/waitlist" 
                  className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
                >
                  Join the Waitlist
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            {/* Right content - waitlist benefits */}
            <div className="md:w-2/5 bg-pink-50 rounded-lg p-6 border border-pink-100">
              <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
                Why join now?
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <div className="rounded-full bg-yellow-100 p-3 mr-4">
                    <Clock size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Limited Alpha Testing</h4>
                    <p className="text-gray-600 text-sm">Currently only available to select users</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <div className="rounded-full bg-teal-100 p-3 mr-4">
                    <Star size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Premium Features</h4>
                    <p className="text-gray-600 text-sm">Free for a full year when we launch</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <CheckCircle size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Guaranteed Access</h4>
                    <p className="text-gray-600 text-sm">Skip the line when we exit alpha</p>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-4">Limited spots available. Join today!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;