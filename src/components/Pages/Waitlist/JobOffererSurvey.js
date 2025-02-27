import React, { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';

// Define mapping between values and full text
const JOB_TYPES_MAPPING = {
  'shortTerm': 'Short-term gigs (one-time tasks, quick jobs)',
  'partTime': 'Part-time positions',
  'freelance': 'Freelance/remote work',
  'internship': 'Internships or student jobs',
  'other': 'Other'
};

const REASONS_MAPPING = {
  'faster': 'Faster hiring process',
  'students': 'Access to students and flexible workers',
  'costEffective': 'More cost-effective than traditional job boards',
  'communication': 'Easier communication with job seekers',
  'other': 'Other'
};

const BUDGET_MAPPING = {
  'less10': 'Less than $10 per hour',
  '10to20': '$10 - $20 per hour',
  '20to30': '$20 - $30 per hour',
  'more30': 'More than $30 per hour',
  'perTask': 'Payment per task, not hourly'
};

const PAYMENT_METHODS_MAPPING = {
  'bank': 'Direct bank transfer',
  'paypal': 'PayPal or online payment services',
  'cash': 'Cash payments',
  'platform': 'Payment through the platform',
  'other': 'Other'
};

const WILL_PAY_MAPPING = {
  'yes': 'Yes',
  'no': 'No',
  'maybe': 'Maybe, depending on the features'
};

const JobOffererSurvey = ({ onBack, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    jobTypes: [],
    otherJobType: '',
    reasons: [],
    otherReason: '',
    budget: '',
    perTaskSpecification: '',
    paymentMethods: [],
    otherPaymentMethod: '',
    willPay: '',
    feedback: ''
  });
  
  const [emailError, setEmailError] = useState('');

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

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');

    // Prepare submission data with full text values
    const submissionData = {
      email: formData.email,
      
      // Question 1: What type of jobs do you usually offer?
      "What type of jobs do you usually offer?": 
        formData.jobTypes.length > 0 
          ? formData.jobTypes.map(type => 
              type === 'other' && formData.otherJobType
                ? `Other: ${formData.otherJobType}`
                : JOB_TYPES_MAPPING[type]
            )
          : ['Not answered'],
      
      // Question 2: Why do you prefer using this platform to find workers?
      "Why do you prefer using this platform to find workers?": 
        formData.reasons.length > 0
          ? formData.reasons.map(reason => 
              reason === 'other' && formData.otherReason
                ? `Other: ${formData.otherReason}`
                : REASONS_MAPPING[reason]
            )
          : ['Not answered'],
      
      // Question 3: What is your typical budget for hiring workers?
      "What is your typical budget for hiring workers?": 
        formData.budget 
          ? (formData.budget === 'perTask' && formData.perTaskSpecification
              ? `Payment per task, not hourly: ${formData.perTaskSpecification}`
              : BUDGET_MAPPING[formData.budget])
          : 'Not answered',
      
      // Question 4: What payment methods do you prefer?
      "What payment methods do you prefer?": 
        formData.paymentMethods.length > 0
          ? formData.paymentMethods.map(method => 
              method === 'other' && formData.otherPaymentMethod
                ? `Other: ${formData.otherPaymentMethod}`
                : PAYMENT_METHODS_MAPPING[method]
            )
          : ['Not answered'],
      
      // Question 5: Would you be willing to pay for premium features?
      "Would you be willing to pay for premium features?": 
        formData.willPay ? WILL_PAY_MAPPING[formData.willPay] : 'Not answered',
      
      // Feedback
      "Suggestions or additional comments": 
        formData.feedback || 'No feedback provided'
    };
    
    onSubmit(submissionData);
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
              <p className="font-medium text-gray-900 mb-3">Email Address <span className="text-red-500">*</span></p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={`w-full p-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500`}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              <p className="text-gray-500 text-sm mt-1">We'll notify you when we launch and you'll get early access.</p>
            </div>
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
                  name="otherJobType"
                  value={formData.otherJobType}
                  onChange={handleInputChange}
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
                  name="otherReason"
                  value={formData.otherReason}
                  onChange={handleInputChange}
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
                  name="perTaskSpecification"
                  value={formData.perTaskSpecification}
                  onChange={handleInputChange}
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
                  name="otherPaymentMethod"
                  value={formData.otherPaymentMethod}
                  onChange={handleInputChange}
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
                disabled={isSubmitting}
                className={`bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-lg font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
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