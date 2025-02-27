import React, { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';

const JobSeekerSurvey = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    role: '',
    jobTypes: [],
    reasons: [],
    willPay: '',
    feedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-gray-700 hover:text-teal-500 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to selection</span>
        </button>

        <div className="bg-white rounded-lg p-8 text-black shadow-lg">
          <div className="flex items-center mb-4">
            <Star className="text-yellow-500 fill-yellow-500 mr-2" size={20} />
            <span className="text-yellow-600 uppercase font-semibold tracking-wider text-xs">WAITLIST SURVEY</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Survey for Job Seekers</h2>
          <p className="text-gray-600 mb-8 border-b border-gray-200 pb-4">
            Thank you for taking the time to share your feedback! Your input helps us improve the platform.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">1. What is your role on our platform?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="offer"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>I offer jobs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="complete"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>I complete jobs</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="both"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Both</span>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">2. What types of jobs interest you the most?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="remote"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Remote freelance work (writing, design, programming, etc.)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="inPerson"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>In-person tasks (delivery, event help, tutoring, etc.)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="partTime"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Part-time jobs with flexible hours</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="oneTime"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>One-time gigs for quick extra income</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="other"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Other (please specify):</span>
                </label>
                <input
                  type="text"
                  className="ml-6 w-64 p-2 border border-gray-300 rounded focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Please specify"
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">3. What would make you use this platform instead of other job-finding methods?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="easier"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Easier and faster job search</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="payment"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Better payment security</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="flexible"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>More flexible and short-term job options</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="community"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>A community and networking opportunities</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="other"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Other (please specify):</span>
                </label>
                <input
                  type="text"
                  className="ml-6 w-64 p-2 border border-gray-300 rounded focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Please specify"
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">4. Would you be willing to pay for premium features (such as exclusive job postings, faster applications, or enhanced profiles)?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="willPay"
                    value="yes"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="willPay"
                    value="no"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>No</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="willPay"
                    value="maybe"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Maybe, depending on the features</span>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">5. Do you have any suggestions or additional comments?</p>
              <textarea
                name="feedback"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Your answer"
                onChange={handleInputChange}
              />
            </div>

            <div className="text-center border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Submit Feedback
              </button>
              <p className="text-sm text-gray-500 italic mt-4">🎉 Thank You Message 🎉</p>
              <p className="text-sm text-gray-600 mt-2">
                Thank you for your feedback! We truly appreciate your input and will use it to improve our platform. 
                If you have any further suggestions or questions, feel free to reach out to us anytime.
                We wish you great success using our platform, and thank you for being part of our community! 🚀
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSurvey;