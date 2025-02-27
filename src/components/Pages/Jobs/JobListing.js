import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CircleDollarSign, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchSection from './SearchSection';
import { allJobs, categoryIcons, getJobCategory } from './JobData';
import ListingWaitlist from './ListingWaitlist';

const JobCard = ({ job, onClick }) => {
  const category = getJobCategory(job.tags);
  const CategoryIcon = categoryIcons[category];

  return (
    <div 
      className="bg-white rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-teal-100 relative cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1">
              <CategoryIcon className="w-6 h-6 text-navy-900" />
              <h3 className="text-xl font-semibold text-navy-900 hover:text-teal-600 transition-colors">
                {job.title}
              </h3>
            </div>
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

const JobListing = () => {
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  
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

    // Category filter
    if (filters.category !== 'all') {
      results = results.filter(job => getJobCategory(job.tags) === filters.category);
    }

    setFilteredJobs(results);
    setTotalJobs(results.length);
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-pink-50">
       <div className="max-w-5xl mx-auto px-4 pt-32 pb-12">
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
            <JobCard 
              key={job.id} 
              job={job} 
              onClick={() => handleJobClick(job.id)}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-white text-navy-900 px-6 py-3 rounded-xl border border-gray-200 hover:border-teal-100 transition-colors">
            Load More Jobs
          </button>
        </div>
      </div>
      <ListingWaitlist />
    </div>
  );
};

export default JobListing;