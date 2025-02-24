import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CircleDollarSign, Star } from 'lucide-react';
import SearchSection from './SearchSection';

// JobCard Component
const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-teal-100 relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h3 className="text-xl font-semibold text-navy-900 hover:text-teal-600 transition-colors cursor-pointer flex-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-3">
              {job.verified && (
                <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </span>
              )}
              <div className="flex items-center text-teal-600 font-medium whitespace-nowrap">
                <CircleDollarSign className="w-4 h-4 mr-1" />
                {job.payment}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.distance}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.duration}</span>
            </div>
            {job.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
                <span>{job.rating} Rating</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};


// Main JobsPage Component
const JobsPage = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  
  const allJobs = [
    {
      id: 1,
      title: "Help Moving Furniture",
      distance: "2.5 km away",
      duration: "3-4 hours",
      payment: "€80",
      description: "Need help moving furniture from a 2nd floor apartment to a moving truck. Some heavy lifting required. Must be able to handle stairs.",
      tags: ["Moving", "Heavy Lifting", "Furniture"],
      verified: true,
      rating: "4.8"
    },
    {
      id: 2,
      title: "Garden Maintenance",
      distance: "5 km away",
      duration: "4 hours",
      payment: "€65",
      description: "Looking for someone to help with garden work including mowing, weeding, and trimming hedges. Tools provided.",
      tags: ["Gardening", "Outdoor", "Maintenance"],
      verified: true
    },
    {
      id: 3,
      title: "Package Delivery Helper",
      distance: "1.8 km away",
      duration: "2-3 hours",
      payment: "€45",
      description: "Need assistance delivering packages in the local area. Must have valid driver's license and clean driving record.",
      tags: ["Delivery", "Driving", "Local"],
      verified: false
    },
    {
      id: 4,
      title: "House Cleaning",
      distance: "3.2 km away",
      duration: "5 hours",
      payment: "€75",
      description: "Deep cleaning of 2-bedroom apartment including windows and balcony. Cleaning supplies provided.",
      tags: ["Cleaning", "Household", "Indoor"],
      verified: true,
      rating: "4.9"
    },
    {
      id: 5,
      title: "Event Setup Helper",
      distance: "4.7 km away",
      duration: "6 hours",
      payment: "€90",
      description: "Need help setting up and breaking down for a local community event. Includes arranging chairs, tables, and decorations.",
      tags: ["Event", "Setup", "Physical Work"],
      verified: false
    },
    {
      id: 6,
      title: "Dog Walking",
      distance: "0.8 km away",
      duration: "1 hour",
      payment: "€15",
      description: "Walk two friendly golden retrievers around the neighborhood. Regular opportunity available.",
      tags: ["Pets", "Walking", "Regular"],
      verified: true,
      rating: "5.0"
    }
  ];

  useEffect(() => {
    setFilteredJobs(allJobs);
    setTotalJobs(allJobs.length);
  }, []);

  const handleFilterChange = (filters) => {
    let results = [...allJobs];
    
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Distance filter
    if (filters.distance !== 'all') {
      const [min, max] = filters.distance.split('-').map(num => 
        num.includes('+') ? Infinity : Number(num)
      );
      results = results.filter(job => {
        const jobDistance = parseFloat(job.distance);
        return jobDistance >= min && jobDistance < (max || Infinity);
      });
    }

    // Payment filter
    if (filters.payment !== 'all') {
      const [min, max] = filters.payment.split('-').map(num => 
        num.includes('+') ? Infinity : Number(num)
      );
      const jobPayment = job => Number(job.payment.replace('€', ''));
      results = results.filter(job => 
        jobPayment(job) >= min && jobPayment(job) < (max || Infinity)
      );
    }

    // Duration filter
    if (filters.duration !== 'all') {
      const [min, max] = filters.duration.split('-').map(num => 
        num.includes('+') ? Infinity : Number(num)
      );
      results = results.filter(job => {
        const jobHours = parseInt(job.duration);
        return jobHours >= min && jobHours < (max || Infinity);
      });
    }

    // Job type filter
    if (filters.type !== 'all') {
      results = results.filter(job =>
        job.tags.includes(filters.type)
      );
    }

    setFilteredJobs(results);
    setTotalJobs(results.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy-900 mb-3">
            Side Jobs Near You
          </h1>
          <p className="text-gray-600 text-lg">
            {totalJobs} opportunities available in your area
          </p>
        </div>

        <SearchSection onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-white text-navy-900 px-6 py-3 rounded-xl border border-gray-200 hover:border-teal-100 transition-colors">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;