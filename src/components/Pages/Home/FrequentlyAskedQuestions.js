import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FrequentlyAskedQuestions = () => {
  // State to track which FAQ item is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle FAQ item expansion
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "What types of jobs can I find on EzJob?",
      answer: "EzJob specializes in local side hustles and gigs such as home repairs, yard work, pet sitting, delivery services, tutoring, and other short-term tasks that can be completed within your community. We connect people with skills to those who need help with everyday tasks."
    },
    {
      question: "How much does it cost to use EzJob?",
      answer: "Creating an account and browsing jobs on EzJob is completely free. Job seekers pay no fees to apply for or accept jobs. Job posters only pay a small service fee (5%) when a job is successfully completed, helping us maintain a high-quality platform."
    },
    {
      question: "How do payments work?",
      answer: "Payments are handled securely through our platform. When posting a job, you'll set your budget. Once a job is completed, payment is released to the worker after you confirm the task was completed satisfactorily. This ensures both parties are protected throughout the transaction."
    },
    {
      question: "Is EzJob available in my area?",
      answer: "EzJob is rapidly expanding to communities across the country. When you sign up, you'll be able to see jobs available in your area. If EzJob hasn't fully launched in your community yet, you can join our waitlist to be notified when we expand to your location."
    },
    {
      question: "How are workers vetted?",
      answer: "EzJob uses a community-based reputation system. After jobs are completed, both parties leave reviews, helping build trust within the community. For certain job categories, we may require additional verification or background checks to ensure safety and quality."
    }
  ];

  return (
    <div className="w-full bg-pink-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-medium text-navy-900 mb-4">
            Frequently Asked <span className="font-bold">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about using EzJob for finding or posting side hustles in your community.
          </p>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-6"></div>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
            >
              <button
                className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                  expandedIndex === index ? 'bg-teal-50' : 'bg-white'
                }`}
                onClick={() => toggleExpand(index)}
              >
                <span className="font-medium text-lg text-navy-900">{item.question}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="text-teal-500 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500 flex-shrink-0" size={20} />
                )}
              </button>
              
              {expandedIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link to="/contact" className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;