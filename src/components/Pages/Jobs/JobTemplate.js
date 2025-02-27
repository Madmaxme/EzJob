import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CircleDollarSign, Star, ArrowLeft, 
         CheckCircle2, Trophy, Navigation } from 'lucide-react';
import { allJobs, getJobCategory, categoryIcons } from './JobData';
import { useParams, useNavigate } from 'react-router-dom';

const JobTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const selectedJob = allJobs.find(j => j.id === parseInt(id, 10));
    setJob(selectedJob);
  }, [id]);

  const handleBackClick = () => {
    navigate('/listing');
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

  const category = getJobCategory(job.tags);
  const CategoryIcon = categoryIcons[category];

  return (
    <div className="min-h-screen bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
        {/* Back button */}
        <button 
          onClick={handleBackClick}
          className="flex items-center text-gray-600 hover:text-navy-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Jobs
        </button>

        {/* Main job card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          {/* Header section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <CategoryIcon className="w-8 h-8 text-navy-900" />
                <h1 className="text-3xl font-bold text-navy-900">{job.title}</h1>
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{job.distance}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center">
                  <CircleDollarSign className="w-5 h-5 mr-2 text-gray-400" />
                  <span>{job.payment}</span>
                </div>
                {job.rating && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />
                    <span>{job.rating} Rating</span>
                  </div>
                )}
              </div>
            </div>
            
            {job.verified && (
              <span className="bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-medium">
                Verified
              </span>
            )}
          </div>

          {/* Introduction section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Introduction</h2>
            <p className="text-gray-600">{job.introduction}</p>
          </div>

          {/* Full Description section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Job Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{job.fullDescription}</p>
          </div>

          {/* Requirements section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Requirements</h2>
            <div className="space-y-3">
              {job.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 mt-1" />
                  <span className="text-gray-600">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits section */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-navy-900 mb-4">Benefits</h2>
              <div className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-teal-600 mt-1" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Location</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-teal-600 mt-1" />
                <div>
                  <p className="text-gray-600">{job.location.address}</p>
                  <p className="text-gray-600">{job.location.district}, {job.location.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Apply section */}
          <div className="border-t border-gray-100 pt-8">
            <button className="w-full bg-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors">
              Apply for this Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTemplate;