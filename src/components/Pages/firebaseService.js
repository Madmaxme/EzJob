// We're assuming firebase is already initialized in your app
// This file handles Firestore operations for the waitlist surveys

import { collection, addDoc, serverTimestamp, getDocs, query, where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Updated path to match your project structure

// Submit job seeker survey to Firestore
export const submitJobSeekerSurvey = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist_job_seekers"), {
      ...data,
      submittedAt: serverTimestamp()
    });
    console.log("Job seeker survey submitted with ID: ", docRef.id);
    return {
      success: true,
      message: "Thank you for your submission!",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error submitting job seeker survey: ", error);
    return {
      success: false,
      message: "There was an error submitting your survey. Please try again.",
      error
    };
  }
};

// Submit job offerer survey to Firestore
export const submitJobOffererSurvey = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist_job_offerers"), {
      ...data,
      submittedAt: serverTimestamp()
    });
    console.log("Job offerer survey submitted with ID: ", docRef.id);
    return {
      success: true,
      message: "Thank you for your submission!",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error submitting job offerer survey: ", error);
    return {
      success: false,
      message: "There was an error submitting your survey. Please try again.",
      error
    };
  }
};

// Add email to waitlist
export const addToWaitlist = async (email, userType) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist"), {
      email,
      userType,
      joinedAt: serverTimestamp()
    });
    console.log("Email added to waitlist with ID: ", docRef.id);
    return {
      success: true,
      message: "You've been added to our waitlist!",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error adding to waitlist: ", error);
    return {
      success: false,
      message: "There was an error adding you to our waitlist. Please try again.",
      error
    };
  }
};

// ========== ANALYTICS FUNCTIONS ==========

/**
 * Fetches all job seeker survey responses
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {string} options.orderByField - Field to order results by
 * @param {boolean} options.descending - Whether to sort in descending order
 * @returns {Promise<Array>} Array of job seeker survey responses
 */
export const getJobSeekerSurveys = async (options = {}) => {
  try {
    const { 
      limit = 1000, 
      orderByField = 'submittedAt', 
      descending = true 
    } = options;
    
    let q = collection(db, "waitlist_job_seekers");
    
    // Build query with options
    if (orderByField) {
      q = query(q, orderBy(orderByField, descending ? 'desc' : 'asc'));
    }
    
    if (limit) {
      q = query(q, firestoreLimit(limit));
    }
    
    const querySnapshot = await getDocs(q);
    const surveys = [];
    
    querySnapshot.forEach((doc) => {
      surveys.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return surveys;
  } catch (error) {
    console.error('Error fetching job seeker surveys:', error);
    throw error;
  }
};

/**
 * Fetches all job offerer survey responses
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {string} options.orderByField - Field to order results by
 * @param {boolean} options.descending - Whether to sort in descending order
 * @returns {Promise<Array>} Array of job offerer survey responses
 */
export const getJobOffererSurveys = async (options = {}) => {
  try {
    const { 
      limit = 1000, 
      orderByField = 'submittedAt', 
      descending = true 
    } = options;
    
    let q = collection(db, "waitlist_job_offerers");
    
    // Build query with options
    if (orderByField) {
      q = query(q, orderBy(orderByField, descending ? 'desc' : 'asc'));
    }
    
    if (limit) {
      q = query(q, firestoreLimit(limit));
    }
    
    const querySnapshot = await getDocs(q);
    const surveys = [];
    
    querySnapshot.forEach((doc) => {
      surveys.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return surveys;
  } catch (error) {
    console.error('Error fetching job offerer surveys:', error);
    throw error;
  }
};

/**
 * Fetches total waitlist count
 * @returns {Promise<number>} Total number of waitlist entries
 */
export const getWaitlistCount = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "waitlist"));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    throw error;
  }
};

/**
 * Gets the count of waitlist by user type
 * @returns {Promise<Object>} Counts by user type
 */
export const getWaitlistCountByType = async () => {
  try {
    const seekersQuery = query(collection(db, "waitlist"), where("userType", "==", "seeker"));
    const offerersQuery = query(collection(db, "waitlist"), where("userType", "==", "offerer"));
    
    const [seekersSnapshot, offerersSnapshot] = await Promise.all([
      getDocs(seekersQuery),
      getDocs(offerersQuery)
    ]);
    
    return {
      seekers: seekersSnapshot.size,
      offerers: offerersSnapshot.size,
      total: seekersSnapshot.size + offerersSnapshot.size
    };
  } catch (error) {
    console.error('Error fetching waitlist counts by type:', error);
    throw error;
  }
};

/**
 * Gets signup trend data - counts by day
 * @param {number} daysBack - Number of days to look back
 * @returns {Promise<Array>} Daily signup counts
 */
export const getSignupTrend = async (daysBack = 30) => {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    
    // Get data from all three collections for a complete picture
    const waitlistQuery = getDocs(collection(db, "waitlist"));
    const seekersQuery = getDocs(collection(db, "waitlist_job_seekers"));
    const offerersQuery = getDocs(collection(db, "waitlist_job_offerers"));
    
    const [waitlistSnapshot, seekersSnapshot, offerersSnapshot] = await Promise.all([
      waitlistQuery, seekersQuery, offerersQuery
    ]);
    
    // Process data by day
    const signupsByDay = {};
    
    // Initialize all dates in range
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      signupsByDay[dateStr] = 0;
    }
    
    // Helper function to process timestamps
    const processTimestamp = (timestamp, fieldType) => {
      if (!timestamp || !timestamp.seconds) return null;
      
      const date = new Date(timestamp.seconds * 1000);
      if (date >= startDate) {
        const dateStr = date.toISOString().split('T')[0];
        return dateStr;
      }
      return null;
    };
    
    // Process waitlist entries (joinedAt field)
    waitlistSnapshot.forEach((doc) => {
      const data = doc.data();
      const dateStr = processTimestamp(data.joinedAt, 'joinedAt');
      if (dateStr) {
        signupsByDay[dateStr] = (signupsByDay[dateStr] || 0) + 1;
      }
    });
    
    // Process seeker surveys (submittedAt field)
    seekersSnapshot.forEach((doc) => {
      const data = doc.data();
      const dateStr = processTimestamp(data.submittedAt, 'submittedAt');
      if (dateStr && !signupsByDay[dateStr]) {
        // We don't double-count - this is just to ensure we have data even if joinedAt is missing
        signupsByDay[dateStr] = 1;
      }
    });
    
    // Process offerer surveys (submittedAt field)
    offerersSnapshot.forEach((doc) => {
      const data = doc.data();
      const dateStr = processTimestamp(data.submittedAt, 'submittedAt');
      if (dateStr && !signupsByDay[dateStr]) {
        // We don't double-count - this is just to ensure we have data even if joinedAt is missing
        signupsByDay[dateStr] = 1;
      }
    });
    
    // Convert to array for charting
    const trendData = Object.keys(signupsByDay)
      .sort() // Ensure dates are in order
      .map(date => ({
        date,
        count: signupsByDay[date]
      }));
    
    return trendData;
  } catch (error) {
    console.error('Error fetching signup trend:', error);
    throw error;
  }
};

/**
 * Gets feedback responses for either job seekers or offerers
 * @param {string} userType - Either 'seeker' or 'offerer'
 * @returns {Promise<Array>} Array of feedback entries
 */
export const getFeedbackResponses = async (userType) => {
  try {
    const collectionName = userType === 'seeker' 
      ? 'waitlist_job_seekers' 
      : 'waitlist_job_offerers';
    
    const querySnapshot = await getDocs(collection(db, collectionName));
    const feedbackEntries = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Use the exact field name from the form
      const feedbackField = "Suggestions or additional comments";
      
      // Check if feedback was provided
      if (data[feedbackField] && data[feedbackField] !== 'No feedback provided') {
        feedbackEntries.push({
          id: doc.id,
          email: data.email,
          feedback: data[feedbackField],
          submittedAt: data.submittedAt
        });
      }
    });
    
    return feedbackEntries;
  } catch (error) {
    console.error(`Error fetching ${userType} feedback responses:`, error);
    throw error;
  }
};

/**
 * Gets detailed analytics for job seeker survey responses
 * @returns {Promise<Object>} Object containing analytics data
 */
export const getJobSeekerAnalytics = async () => {
  try {
    const surveys = await getJobSeekerSurveys();
    
    // Define the exact question fields as they appear in the database
    const jobTypesField = "What types of jobs interest you the most?";
    const reasonsField = "What would make you use this platform instead of other job-finding methods?";
    const willPayField = "Would you be willing to pay for premium features?";
    const feedbackField = "Suggestions or additional comments";
    
    // Process job types data
    const jobTypesData = {};
    surveys.forEach(survey => {
      const jobTypes = survey[jobTypesField] || [];
      if (Array.isArray(jobTypes)) {
        jobTypes.forEach(type => {
          // Handle "Other: [text]" format
          if (type.startsWith('Other:')) {
            jobTypesData['Other'] = (jobTypesData['Other'] || 0) + 1;
          } else {
            jobTypesData[type] = (jobTypesData[type] || 0) + 1;
          }
        });
      }
    });
    
    // Process reasons data
    const reasonsData = {};
    surveys.forEach(survey => {
      const reasons = survey[reasonsField] || [];
      if (Array.isArray(reasons)) {
        reasons.forEach(reason => {
          if (reason.startsWith('Other:')) {
            reasonsData['Other'] = (reasonsData['Other'] || 0) + 1;
          } else {
            reasonsData[reason] = (reasonsData[reason] || 0) + 1;
          }
        });
      }
    });
    
    // Process willingness to pay data
    const willPayData = {};
    surveys.forEach(survey => {
      const willPay = survey[willPayField];
      if (willPay && willPay !== 'Not answered') {
        willPayData[willPay] = (willPayData[willPay] || 0) + 1;
      }
    });
    
    // Count feedback submissions
    let feedbackCount = 0;
    surveys.forEach(survey => {
      if (survey[feedbackField] && survey[feedbackField] !== 'No feedback provided') {
        feedbackCount++;
      }
    });
    
    return {
      totalResponses: surveys.length,
      jobTypes: jobTypesData,
      reasons: reasonsData,
      willPay: willPayData,
      feedbackCount
    };
  } catch (error) {
    console.error('Error analyzing job seeker survey data:', error);
    throw error;
  }
};

/**
 * Gets detailed analytics for job offerer survey responses
 * @returns {Promise<Object>} Object containing analytics data
 */
export const getJobOffererAnalytics = async () => {
  try {
    const surveys = await getJobOffererSurveys();
    
    // Define the exact question fields as they appear in the database
    const jobTypesField = "What type of jobs do you usually offer?";
    const reasonsField = "Why do you prefer using this platform to find workers?";
    const budgetField = "What is your typical budget for hiring workers?";
    const paymentMethodsField = "What payment methods do you prefer?";
    const willPayField = "Would you be willing to pay for premium features?";
    const feedbackField = "Suggestions or additional comments";
    
    // Process job types data
    const jobTypesData = {};
    surveys.forEach(survey => {
      const jobTypes = survey[jobTypesField] || [];
      if (Array.isArray(jobTypes)) {
        jobTypes.forEach(type => {
          if (type.startsWith('Other:')) {
            jobTypesData['Other'] = (jobTypesData['Other'] || 0) + 1;
          } else {
            jobTypesData[type] = (jobTypesData[type] || 0) + 1;
          }
        });
      }
    });
    
    // Process reasons data
    const reasonsData = {};
    surveys.forEach(survey => {
      const reasons = survey[reasonsField] || [];
      if (Array.isArray(reasons)) {
        reasons.forEach(reason => {
          if (reason.startsWith('Other:')) {
            reasonsData['Other'] = (reasonsData['Other'] || 0) + 1;
          } else {
            reasonsData[reason] = (reasonsData[reason] || 0) + 1;
          }
        });
      }
    });
    
    // Process budget data
    const budgetData = {};
    surveys.forEach(survey => {
      const budget = survey[budgetField];
      if (budget && budget !== 'Not answered') {
        if (budget.startsWith('Payment per task')) {
          budgetData['Payment per task'] = (budgetData['Payment per task'] || 0) + 1;
        } else {
          budgetData[budget] = (budgetData[budget] || 0) + 1;
        }
      }
    });
    
    // Process payment methods data
    const paymentMethodsData = {};
    surveys.forEach(survey => {
      const methods = survey[paymentMethodsField] || [];
      if (Array.isArray(methods)) {
        methods.forEach(method => {
          if (method.startsWith('Other:')) {
            paymentMethodsData['Other'] = (paymentMethodsData['Other'] || 0) + 1;
          } else {
            paymentMethodsData[method] = (paymentMethodsData[method] || 0) + 1;
          }
        });
      }
    });
    
    // Process willingness to pay data
    const willPayData = {};
    surveys.forEach(survey => {
      const willPay = survey[willPayField];
      if (willPay && willPay !== 'Not answered') {
        willPayData[willPay] = (willPayData[willPay] || 0) + 1;
      }
    });
    
    // Count feedback submissions
    let feedbackCount = 0;
    surveys.forEach(survey => {
      if (survey[feedbackField] && survey[feedbackField] !== 'No feedback provided') {
        feedbackCount++;
      }
    });
    
    return {
      totalResponses: surveys.length,
      jobTypes: jobTypesData,
      reasons: reasonsData,
      budget: budgetData,
      paymentMethods: paymentMethodsData,
      willPay: willPayData,
      feedbackCount
    };
  } catch (error) {
    console.error('Error analyzing job offerer survey data:', error);
    throw error;
  }
};

/**
 * Gets premium interest statistics for both job seekers and job offerers
 * @returns {Promise<Object>} Object containing premium interest statistics
 */
export const getPremiumInterestStats = async () => {
  try {
    const [seekerAnalytics, offererAnalytics] = await Promise.all([
      getJobSeekerAnalytics(),
      getJobOffererAnalytics()
    ]);
    
    // Get counts for Yes, No, and Maybe responses
    const seekerYes = Object.keys(seekerAnalytics.willPay).find(key => 
      key === 'Yes') ? seekerAnalytics.willPay['Yes'] : 0;
      
    const seekerMaybe = Object.keys(seekerAnalytics.willPay).find(key => 
      key === 'Maybe, depending on the features') ? seekerAnalytics.willPay['Maybe, depending on the features'] : 0;
      
    const offererYes = Object.keys(offererAnalytics.willPay).find(key => 
      key === 'Yes') ? offererAnalytics.willPay['Yes'] : 0;
      
    const offererMaybe = Object.keys(offererAnalytics.willPay).find(key => 
      key === 'Maybe, depending on the features') ? offererAnalytics.willPay['Maybe, depending on the features'] : 0;
    
    const totalInterested = seekerYes + seekerMaybe + offererYes + offererMaybe;
    const totalResponses = seekerAnalytics.totalResponses + offererAnalytics.totalResponses;
    const interestPercentage = totalResponses > 0 ? Math.round((totalInterested / totalResponses) * 100) : 0;
    
    return {
      seekerYes,
      seekerMaybe,
      offererYes,
      offererMaybe,
      totalInterested,
      totalResponses,
      interestPercentage
    };
  } catch (error) {
    console.error('Error calculating premium interest stats:', error);
    throw error;
  }
};