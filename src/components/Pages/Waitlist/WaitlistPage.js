import React, { useState } from 'react';
import SurveySelector from './SurveySelector';
import JobSeekerSurvey from './JobSeekerSurvey';
import JobOffererSurvey from './JobOffererSurvey';
import SuccessConfirmation from './SuccessConfirmation';

const WaitlistPage = () => {
  const [surveyType, setSurveyType] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectSurvey = (type) => {
    setSurveyType(type);
    console.log("Survey type selected:", type); // Debug logging
  };

  const handleBackToSelection = () => {
    setSurveyType(null);
    console.log("Going back to selection"); // Debug logging
  };

  const handleSubmitSurvey = (data) => {
    // Here you would normally send the data to your backend
    console.log('Survey submitted:', data);
    setSubmitted(true);
  };

  const renderContent = () => {
    if (submitted) {
      return <SuccessConfirmation />;
    }

    switch (surveyType) {
      case 'seeker':
        return <JobSeekerSurvey onBack={handleBackToSelection} onSubmit={handleSubmitSurvey} />;
      case 'offerer':
        return <JobOffererSurvey onBack={handleBackToSelection} onSubmit={handleSubmitSurvey} />;
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