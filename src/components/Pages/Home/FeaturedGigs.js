import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import { allJobs, categoryIcons } from '../Jobs/JobData';
import { Link } from 'react-router-dom';

const FeaturedGigs = () => {
  // Select a few featured jobs from the JobData
  const featuredGigs = allJobs.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-navy-900 mb-3">
              Popular <span className="font-bold">Side Hustles</span>
            </h2>
            <div className="w-20 h-1 bg-blue-500 mb-2"></div>
            <p className="text-gray-600 max-w-lg">
              Check out these trending opportunities in your area
            </p>
          </div>
          <Link 
            to="/listing" 
            className="mt-4 md:mt-0 bg-pink-50 hover:bg-pink-100 text-navy-900 font-medium px-5 py-2 rounded-lg flex items-center border border-pink-200 transition-colors"
          >
            View all gigs
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredGigs.map((gig, index) => {
            // Get the appropriate icon based on the gig's tags
            const category = gig.tags[0];
            const Icon = categoryIcons[category] || categoryIcons.General;
            
            return (
              <Link 
                key={gig.id} 
                to={`/job/${gig.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group cursor-pointer"
              >
                {/* Header with color band */}
                <div className={`h-2 ${
                  index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-teal-500' : 'bg-purple-500'
                }`}></div>
                
                <div className="p-6">
                  {/* Icon and badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-blue-100 text-blue-600' : 
                      index === 1 ? 'bg-teal-100 text-teal-600' : 
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <Icon size={30} />
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
                      {gig.duration}
                    </span>
                  </div>
                  
                  {/* Title and description */}
                  <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-blue-600 transition-colors">{gig.title}</h3>
                  
                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{gig.distance}</p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {gig.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-pink-50 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-navy-900 font-bold text-lg">{gig.payment}</span>
                    {gig.verified && (
                      <span className="flex items-center text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGigs;