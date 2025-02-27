import React, { useState } from 'react';
import { ArrowLeft, PenLine, MapPin, CircleDollarSign, Clock, Briefcase, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostJobPage = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    payment: '',
    duration: '',
    description: '',
    requirements: '',
    tags: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackClick = () => {
    navigate('/listing');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to an API
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form (if needed)
    // setFormData({...});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
        {/* Back button */}
        <button 
          onClick={handleBackClick}
          className="flex items-center text-gray-600 hover:text-navy-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Jobs
        </button>

        {!formSubmitted ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-navy-900 mb-3">Post a New Job</h1>
              <p className="text-gray-600">
                Fill out the form below to post a side job in your community. Our team will review your submission.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className="mb-6">
                <label className="block text-navy-900 font-medium mb-2" htmlFor="title">
                  Job Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PenLine className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g. Lawn Mowing Service Needed"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Job Category */}
                <div>
                  <label className="block text-navy-900 font-medium mb-2" htmlFor="category">
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="category"
                      name="category"
                      className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="home">Home Improvement</option>
                      <option value="gardening">Gardening & Outdoor</option>
                      <option value="delivery">Delivery</option>
                      <option value="tech">Tech Support</option>
                      <option value="moving">Moving & Hauling</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="tutoring">Tutoring</option>
                      <option value="petcare">Pet Care</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-navy-900 font-medium mb-2" htmlFor="location">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. 123 Main St, City"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Payment */}
                <div>
                  <label className="block text-navy-900 font-medium mb-2" htmlFor="payment">
                    Payment
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CircleDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="payment"
                      name="payment"
                      className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. €50"
                      value={formData.payment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-navy-900 font-medium mb-2" htmlFor="duration">
                    Estimated Duration
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g. 2 hours"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-navy-900 font-medium mb-2" htmlFor="description">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  className="w-full py-3 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Describe the job in detail..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <label className="block text-navy-900 font-medium mb-2" htmlFor="requirements">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows="3"
                  className="w-full py-3 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="List any requirements or skills needed..."
                  value={formData.requirements}
                  onChange={handleInputChange}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Separate each requirement with a new line</p>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <label className="block text-navy-900 font-medium mb-2" htmlFor="tags">
                  Tags
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g. gardening, weekend, beginner-friendly"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-100 pt-8">
                <button 
                  type="submit"
                  className="w-full bg-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-navy-900 mb-4">Job Posted Successfully!</h1>
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              Thank you for posting your job on EzJob. Our team will review your submission within 24 hours and notify you once it's approved and live on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/listing')}
                className="bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
              >
                View All Jobs
              </button>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="bg-white text-navy-900 py-3 px-6 rounded-xl font-semibold border border-gray-200 hover:border-teal-100 transition-colors"
              >
                Post Another Job
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Check icon for success screen
const CheckIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default PostJobPage;