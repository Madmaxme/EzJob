import React, { useState } from 'react';
import SurveySelector from './SurveySelector';
import JobSeekerSurvey from './JobSeekerSurvey';
import JobOffererSurvey from './JobOffererSurvey';
import SuccessConfirmation from './SuccessConfirmation';
import { submitJobSeekerSurvey, submitJobOffererSurvey, addToWaitlist } from '../firebaseService';

const WaitlistPage = () => {
  const [surveyType, setSurveyType] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);

  const handleSelectSurvey = (type) => {
    setSurveyType(type);
  };

  const handleBackToSelection = () => {
    setSurveyType(null);
  };

  const handleSubmitSurvey = async (data) => {
    setSubmitting(true);
    setError(null);
    
    try {
      let result;
      
      // First, add the email to the waitlist collection
      const waitlistResult = await addToWaitlist(data.email, surveyType);
      if (!waitlistResult.success) {
        throw new Error(waitlistResult.message);
      }
      
      // Then submit the complete survey data
      if (surveyType === 'seeker') {
        result = await submitJobSeekerSurvey(data);
      } else if (surveyType === 'offerer') {
        result = await submitJobOffererSurvey(data);
      } else {
        throw new Error("Invalid survey type");
      }
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      // If we made it here, both operations were successful
      setSubmissionData({
        email: data.email,
        userType: surveyType,
        ...result
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting survey:", err);
      setError(err.message || "There was an error submitting your survey. Please try again.");
      // Log additional error details if available
      if (err.code) {
        console.error("Error code:", err.code);
      }
      if (err.details) {
        console.error("Error details:", err.details);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderContent = () => {
    if (submitted) {
      return <SuccessConfirmation email={submissionData?.email} />;
    }

    switch (surveyType) {
      case 'seeker':
        return (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-24 right-4 left-4 md:left-auto md:w-96 z-50">
                <p>{error}</p>
              </div>
            )}
            <JobSeekerSurvey 
              onBack={handleBackToSelection} 
              onSubmit={handleSubmitSurvey} 
              isSubmitting={submitting} 
            />
          </>
        );
      case 'offerer':
        return (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-24 right-4 left-4 md:left-auto md:w-96 z-50">
                <p>{error}</p>
              </div>
            )}
            <JobOffererSurvey 
              onBack={handleBackToSelection} 
              onSubmit={handleSubmitSurvey} 
              isSubmitting={submitting} 
            />
          </>
        );
      default:
        return <SurveySelector onSelectSurvey={handleSelectSurvey} />;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {renderContent()}
    </div>
  );
};

export default WaitlistPage;