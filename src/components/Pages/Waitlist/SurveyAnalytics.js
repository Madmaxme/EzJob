import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
    getJobSeekerSurveys, 
    getJobOffererSurveys,
    getWaitlistCount,
    getWaitlistCountByType,
    getSignupTrend,
    getFeedbackResponses,
    getJobSeekerAnalytics,  
    getJobOffererAnalytics,  
    getPremiumInterestStats
  } from '../firebaseService';
import { Users, BriefcaseBusiness, Calendar, FileCheck, TrendingUp } from 'lucide-react';

const SurveyAnalytics = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  
  // Data states
  const [seekerSurveys, setSeekerSurveys] = useState([]);
  const [offererSurveys, setOffererSurveys] = useState([]);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [waitlistByType, setWaitlistByType] = useState({ seekers: 0, offerers: 0 });
  const [signupTrend, setSignupTrend] = useState([]);
  const [feedback, setFeedback] = useState({ seekers: [], offerers: [] });

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [
          seekerData, // Actually contains offerer data 
          offererData, // Actually contains seeker data
          seekerAnalytics, // Actually contains offerer analytics
          offererAnalytics, // Actually contains seeker analytics
          waitlistTotal,
          waitlistTypes,
          trendData,
          seekerFeedback, // May also be swapped
          offererFeedback // May also be swapped
        ] = await Promise.all([
          getJobSeekerSurveys(), // This actually fetches offerer data due to DB mixup
          getJobOffererSurveys(), // This actually fetches seeker data due to DB mixup
          getJobSeekerAnalytics(), // This may also be swapped
          getJobOffererAnalytics(), // This may also be swapped
          
          getWaitlistCount(),
          getWaitlistCountByType(), // This may need to be swapped too
          getSignupTrend(30), // Get 30 days of trend data
          getFeedbackResponses('seeker'), // May be swapped
          getFeedbackResponses('offerer') // May be swapped
        ]);

        // Update state with corrected data (swap seeker and offerer data)
        setSeekerSurveys(offererData); // Use offererData for seekers
        setOffererSurveys(seekerData); // Use seekerData for offerers
        setWaitlistCount(waitlistTotal);
        // Check if waitlistTypes also needs to be swapped
        const correctedWaitlistTypes = {
          seekers: waitlistTypes.offerers || 0, // Swap if needed
          offerers: waitlistTypes.seekers || 0  // Swap if needed
        };
        setWaitlistByType(correctedWaitlistTypes);
        setSignupTrend(trendData);
        // Swap feedback data as well if needed
        setFeedback({
          seekers: offererFeedback, // Swap feedback too
          offerers: seekerFeedback // Swap feedback too
        });

        console.log('Data correction applied due to database field swap');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load analytics data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to extract and count responses - dynamic approach with debugging
  const processMultipleChoiceResponses = (data, questionKey) => {
    const counts = {};
    let foundAnyAnswers = false;
    
    // Count responses
    data.forEach(response => {
      const answer = response[questionKey];
      if (answer) {
        foundAnyAnswers = true;
        if (Array.isArray(answer)) {
          // For checkbox questions (multiple answers)
          answer.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
          });
        } else {
          // For radio questions (single answer)
          counts[answer] = (counts[answer] || 0) + 1;
        }
      }
    });

    // Debug logging - uncomment if charts still aren't appearing
    if (!foundAnyAnswers) {
      console.log(`No answers found for question: "${questionKey}"`);
      // Optional: Log all available keys in the responses to help debug
      if (data.length > 0) {
        console.log("Available question keys:", Object.keys(data[0]).filter(key => 
          key !== 'email' && key !== 'timestamp' && key !== 'id' && key !== 'submittedAt'
        ));
      }
    }

    // Convert to format suitable for charts
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  };

  // Enhanced helper function that tries multiple question keys
  const processMultipleChoiceResponsesWithFallbacks = (data, questionKeys) => {
    // Try each possible question key until we find one that has data
    for (const questionKey of questionKeys) {
      const results = processMultipleChoiceResponses(data, questionKey);
      if (results.length > 0) {
        return results;
      }
    }
    return []; // Return empty array if no matches found
  };

  // Process job seekers data with dynamic approach & fallbacks for DB mix-up
  const getSeekerJobTypes = () => {
    // Try both the expected and the swapped question formats
    return processMultipleChoiceResponsesWithFallbacks(
      seekerSurveys, 
      [
        "What types of jobs interest you the most?",
        "What type of jobs interest you the most?", // Alternate wording
        "What types of jobs do you usually offer?", // In case the survey form was different
        "What type of jobs do you usually offer?" // Alternate wording
      ]
    );
  };

  const getSeekerReasons = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      seekerSurveys, 
      [
        "What would make you use this platform instead of other job-finding methods?",
        "Why would you use this platform instead of other job-finding methods?", // Alternate wording
        "Why do you prefer using this platform to find workers?", // From offerer survey
        "Why do you prefer using this platform?" // Alternate wording
      ]
    );
  };

  const getSeekerWillPay = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      seekerSurveys, 
      [
        "Would you be willing to pay for premium features?",
        "Are you willing to pay for premium features?" // Alternate wording
      ]
    );
  };

  // Process job offerers data with dynamic approach & fallbacks for DB mix-up
  const getOffererJobTypes = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      offererSurveys, 
      [
        "What type of jobs do you usually offer?",
        "What types of jobs do you usually offer?", // Alternate wording
        "What types of jobs interest you the most?", // From seeker survey
        "What type of jobs interest you the most?" // Alternate wording
      ]
    );
  };

  const getOffererReasons = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      offererSurveys, 
      [
        "Why do you prefer using this platform to find workers?",
        "Why do you prefer using this platform?", // Alternate wording
        "What would make you use this platform instead of other job-finding methods?", // From seeker survey
        "Why would you use this platform instead of other job-finding methods?" // Alternate wording
      ]
    );
  };

  const getOffererBudget = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      offererSurveys, 
      [
        "What is your typical budget for hiring workers?",
        "What's your typical budget for hiring?", // Alternate wording
        "What is your budget for hiring workers?" // Alternate wording
      ]
    );
  };

  const getOffererPaymentMethods = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      offererSurveys, 
      [
        "What payment methods do you prefer?",
        "Which payment methods do you prefer?", // Alternate wording
        "What payment methods do you prefer when paying workers?" // Full question from survey
      ]
    );
  };

  const getOffererWillPay = () => {
    return processMultipleChoiceResponsesWithFallbacks(
      offererSurveys, 
      [
        "Would you be willing to pay for premium features?",
        "Are you willing to pay for premium features?" // Alternate wording
      ]
    );
  };

  // Calculate premium interest percentage - adapted for dynamic responses with extra flexibility
  const calculatePremiumPercentage = () => {
    const seekerWillPay = getSeekerWillPay();
    const offererWillPay = getOffererWillPay();
    
    // Enhanced search for "Yes" and "Maybe" responses - case-insensitive and more flexible
    const seekerYes = seekerWillPay.reduce((sum, item) => 
      (item.name === "Yes" || 
       item.name.toLowerCase().includes("yes") || 
       item.name.includes("Yes"))
        ? sum + item.value 
        : sum, 
      0);
      
    const seekerMaybe = seekerWillPay.reduce((sum, item) => 
      (item.name.toLowerCase().includes("maybe") || 
       item.name.includes("Maybe") || 
       item.name.includes("depending"))
        ? sum + item.value 
        : sum, 
      0);
    
    const offererYes = offererWillPay.reduce((sum, item) => 
      (item.name === "Yes" || 
       item.name.toLowerCase().includes("yes") || 
       item.name.includes("Yes")) 
        ? sum + item.value 
        : sum, 
      0);
      
    const offererMaybe = offererWillPay.reduce((sum, item) => 
      (item.name.toLowerCase().includes("maybe") || 
       item.name.includes("Maybe") || 
       item.name.includes("depending"))
        ? sum + item.value 
        : sum, 
      0);
    
    // Debug log
    console.log("Premium interest calculation:", {
      seekerYes, seekerMaybe, offererYes, offererMaybe,
      seekerOptions: seekerWillPay.map(i => i.name),
      offererOptions: offererWillPay.map(i => i.name)
    });
    
    const totalInterested = seekerYes + seekerMaybe + offererYes + offererMaybe;
    const totalResponses = seekerSurveys.length + offererSurveys.length;
    
    return totalResponses > 0 ? Math.round((totalInterested / totalResponses) * 100) : 0;
  };

  // Render summary cards
  const renderSummaryCards = () => {
    const totalResponses = seekerSurveys.length + offererSurveys.length;
    const seekerPercentage = totalResponses > 0 
      ? Math.round((seekerSurveys.length / totalResponses) * 100) 
      : 0;
    const offererPercentage = totalResponses > 0 
      ? Math.round((offererSurveys.length / totalResponses) * 100) 
      : 0;
    
    const totalFeedback = feedback.seekers.length + feedback.offerers.length;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Respondents</p>
              <p className="text-2xl font-bold text-gray-900">{totalResponses}</p>
            </div>
            <Users className="text-teal-500" size={24} />
          </div>
          <div className="mt-4 flex justify-between text-xs">
            <span className="text-gray-500">Job Seekers: {seekerPercentage}%</span>
            <span className="text-gray-500">Job Offerers: {offererPercentage}%</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Waitlist Total</p>
              <p className="text-2xl font-bold text-gray-900">{waitlistCount}</p>
            </div>
            <Calendar className="text-blue-500" size={24} />
          </div>
          <div className="mt-4 text-xs">
            <span className="text-gray-500">People interested in the platform</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Feedback Received</p>
              <p className="text-2xl font-bold text-gray-900">{totalFeedback}</p>
            </div>
            <FileCheck className="text-purple-500" size={24} />
          </div>
          <div className="mt-4 text-xs">
            <span className="text-gray-500">Users who provided comments</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Premium Interest</p>
              <p className="text-2xl font-bold text-gray-900">
                {calculatePremiumPercentage()}%
              </p>
            </div>
            <BriefcaseBusiness className="text-yellow-500" size={24} />
          </div>
          <div className="mt-4 text-xs">
            <span className="text-gray-500">Users interested in premium features</span>
          </div>
        </div>
      </div>
    );
  };

  // Render signup trend chart
  const renderSignupTrend = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Waitlist Signup Trend</h3>
          <TrendingUp className="text-teal-500" size={24} />
        </div>
        
        {signupTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={signupTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} signups`, 'Count']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#0088FE" 
                activeDot={{ r: 8 }} 
                name="Daily Signups"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">No trend data available.</p>
        )}
      </div>
    );
  };

  // Render comparison charts for job seekers and offerers - adapted for dynamic data
  const renderComparisonCharts = () => {
    const seekerData = getSeekerWillPay();
    const offererData = getOffererWillPay();
    
    // Make sure we have data to show
    if (seekerData.length === 0 || offererData.length === 0) {
      return <p className="text-gray-500 text-center py-8">Insufficient data for comparison charts.</p>;
    }
    
    // Get all unique response names
    const allResponses = [...new Set([
      ...seekerData.map(d => d.name),
      ...offererData.map(d => d.name)
    ])];
    
    // Format for comparison chart
    const willPayComparison = allResponses.map(response => {
      return {
        name: response,
        jobSeekers: seekerData.find(d => d.name === response)?.value || 0,
        jobOfferers: offererData.find(d => d.name === response)?.value || 0
      };
    });
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Premium Features Interest Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={willPayComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="jobSeekers" fill="#0088FE" name="Job Seekers" />
            <Bar dataKey="jobOfferers" fill="#00C49F" name="Job Offerers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Render job seeker insights
  const renderJobSeekerInsights = () => {
    const jobTypes = getSeekerJobTypes();
    const reasons = getSeekerReasons();
    const willPay = getSeekerWillPay();
    
    if (jobTypes.length === 0) {
      return <p className="text-gray-500 text-center py-8">No job seeker data available.</p>;
    }
    
    return (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">What types of jobs interest you the most?</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={jobTypes}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name.length > 30 ? name.substring(0, 27) + '...' : name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {jobTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">What would make you use this platform instead of other job-finding methods?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={reasons}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={140}
                tick={props => {
                  const { x, y, payload } = props;
                  const text = payload.value;
                  const displayText = text.length > 20 ? text.substring(0, 17) + '...' : text;
                  
                  return (
                    <text x={x} y={y} dy={4} textAnchor="end" fill="#666" fontSize={12}>
                      {displayText}
                    </text>
                  );
                }}
              />
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Would you be willing to pay for premium features?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={willPay}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {willPay.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  // Render job offerer insights
  const renderJobOffererInsights = () => {
    const jobTypes = getOffererJobTypes();
    const reasons = getOffererReasons();
    const budget = getOffererBudget();
    const paymentMethods = getOffererPaymentMethods();
    const willPay = getOffererWillPay();
    
    if (jobTypes.length === 0) {
      return <p className="text-gray-500 text-center py-8">No job offerer data available.</p>;
    }
    
    return (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">What type of jobs do you usually offer?</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={jobTypes}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name.length > 30 ? name.substring(0, 27) + '...' : name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {jobTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Legend layout="vertical" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Why do you prefer using this platform to find workers?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={reasons}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={140}
                tick={props => {
                  const { x, y, payload } = props;
                  const text = payload.value;
                  const displayText = text.length > 20 ? text.substring(0, 17) + '...' : text;
                  
                  return (
                    <text x={x} y={y} dy={4} textAnchor="end" fill="#666" fontSize={12}>
                      {displayText}
                    </text>
                  );
                }}
              />
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">What is your typical budget for hiring workers?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budget}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name.length > 30 ? name.substring(0, 27) + '...' : name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {budget.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">What payment methods do you prefer?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={paymentMethods}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={140}
                tick={props => {
                  const { x, y, payload } = props;
                  const text = payload.value;
                  const displayText = text.length > 20 ? text.substring(0, 17) + '...' : text;
                  
                  return (
                    <text x={x} y={y} dy={4} textAnchor="end" fill="#666" fontSize={12}>
                      {displayText}
                    </text>
                  );
                }}
              />
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Bar dataKey="value" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Would you be willing to pay for premium features?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={willPay}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {willPay.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Render feedback list
  const renderFeedback = () => {
    const allFeedback = [...feedback.seekers, ...feedback.offerers].sort((a, b) => {
      // Sort by most recent first
      if (a.submittedAt && b.submittedAt) {
        return b.submittedAt.seconds - a.submittedAt.seconds;
      }
      return 0;
    });
    
    if (allFeedback.length === 0) {
      return <p className="text-gray-500 text-center py-8">No feedback available.</p>;
    }
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">User Feedback</h3>
        <div className="space-y-4">
          {allFeedback.map((item, index) => {
            const date = item.submittedAt ? 
              new Date(item.submittedAt.seconds * 1000).toLocaleDateString() : 
              'Unknown date';
            
            return (
              <div key={index} className="border-l-4 border-teal-500 pl-4 py-2">
                <p className="text-gray-900">{item.feedback}</p>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>{item.email}</span>
                  <span>{date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Main render function
  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-teal-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Analytics Dashboard</h1>
          <p className="text-gray-600 mb-6 border-b border-gray-200 pb-4">
            Insights from waitlist survey responses for Job Seekers and Job Offerers
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Navigation tabs */}
              <div className="flex flex-wrap space-x-2 mb-6">
                <button 
                  className={`px-4 py-2 rounded-lg mb-2 ${activeTab === 'summary' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveTab('summary')}
                >
                  Summary
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg mb-2 ${activeTab === 'seekers' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveTab('seekers')}
                >
                  Job Seekers
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg mb-2 ${activeTab === 'offerers' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveTab('offerers')}
                >
                  Job Offerers
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg mb-2 ${activeTab === 'feedback' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  onClick={() => setActiveTab('feedback')}
                >
                  Feedback
                </button>
              </div>
              
              {/* Content based on active tab */}
              {activeTab === 'summary' && (
                <>
                  {renderSummaryCards()}
                  {renderSignupTrend()}
                  {renderComparisonCharts()}
                </>
              )}
              
              {activeTab === 'seekers' && renderJobSeekerInsights()}
              
              {activeTab === 'offerers' && renderJobOffererInsights()}
              
              {activeTab === 'feedback' && renderFeedback()}
            </>
          )}
          
          <div className="text-right mt-6 text-gray-500 text-sm">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyAnalytics;