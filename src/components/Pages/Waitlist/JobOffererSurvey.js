import React, { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';

const JobOffererSurvey = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    jobTypes: [],
    reasons: [],
    budget: '',
    paymentMethods: [],
    willPay: '',
    feedback: ''
  });

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

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Survey for Job Offerers</h2>
          <p className="text-gray-600 mb-8 border-b border-gray-200 pb-4">
            Thank you for taking the time to share your feedback! Your input helps us improve the platform and better serve your needs.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">1. What type of jobs do you usually offer?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="shortTerm"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Short-term gigs (one-time tasks, quick jobs)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="partTime"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Part-time positions</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="freelance"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Freelance/remote work</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="jobTypes"
                    value="internship"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Internships or student jobs</span>
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
              <p className="font-medium text-gray-900 mb-3">2. Why do you prefer using this platform to find workers instead of other hiring methods?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="faster"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Faster hiring process</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="students"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Access to students and flexible workers</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="costEffective"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>More cost-effective than traditional job boards</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reasons"
                    value="communication"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Easier communication with job seekers</span>
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
              <p className="font-medium text-gray-900 mb-3">3. What is your typical budget for hiring workers?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="less10"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Less than $10 per hour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="10to20"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>$10 - $20 per hour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="20to30"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>$20 - $30 per hour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="more30"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>More than $30 per hour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="budget"
                    value="perTask"
                    onChange={handleRadioChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Payment per task, not hourly (please specify):</span>
                </label>
                <input
                  type="text"
                  className="ml-6 w-64 p-2 border border-gray-300 rounded focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Please specify"
                />
              </div>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-900 mb-3">4. What payment methods do you prefer when paying workers?</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paymentMethods"
                    value="bank"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Direct bank transfer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paymentMethods"
                    value="paypal"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>PayPal or online payment services</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paymentMethods"
                    value="cash"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Cash payments</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paymentMethods"
                    value="platform"
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-teal-500"
                  />
                  <span>Payment through the platform</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="paymentMethods"
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
              <p className="font-medium text-gray-900 mb-3">5. Would you be willing to pay for premium features (such as priority job listings, verified worker profiles, or better applicant screening tools)?</p>
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

            <div className="text-center border-t border-gray-200 pt-6">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Submit Feedback
              </button>
              <p className="text-sm text-gray-500 italic mt-4">🎉 Thank You Message 🎉</p>
              <p className="text-sm text-gray-600 mt-2">
                Thank you for your valuable feedback! We truly appreciate your input and will use it to improve 
                our platform. If you have any further suggestions or questions, feel free to reach out to us anytime. 🚀 
                We wish you great success using our platform, and thank you for being part of our community!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobOffererSurvey;