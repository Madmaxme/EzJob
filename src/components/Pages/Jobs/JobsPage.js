import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CircleDollarSign, Star } from 'lucide-react';
import SearchSection from './SearchSection';

// JobCard Component
const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-teal-100 relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h3 className="text-xl font-semibold text-navy-900 hover:text-teal-600 transition-colors cursor-pointer flex-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-3">
              {job.verified && (
                <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </span>
              )}
              <div className="flex items-center text-teal-600 font-medium whitespace-nowrap">
                <CircleDollarSign className="w-4 h-4 mr-1" />
                {job.payment}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.distance}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.duration}</span>
            </div>
            {job.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
                <span>{job.rating} Rating</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};


// Main JobsPage Component
const JobsPage = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  
  const allJobs = [
    {
      id: 1,
      title: "Help Moving Furniture",
      distance: "2.5 km away",
      duration: "3-4 hours",
      payment: "€80",
      description: "Need help moving furniture from a 2nd floor apartment to a moving truck. Some heavy lifting required. Must be able to handle stairs.",
      tags: ["Moving", "Heavy Lifting", "Furniture"],
      verified: true,
      rating: "4.8"
    },
    {
      id: 2,
      title: "Garden Maintenance",
      distance: "5 km away",
      duration: "4 hours",
      payment: "€65",
      description: "Looking for someone to help with garden work including mowing, weeding, and trimming hedges. Tools provided.",
      tags: ["Gardening", "Outdoor", "Maintenance"],
      verified: true
    },
    {
      id: 3,
      title: "Package Delivery Helper",
      distance: "1.8 km away",
      duration: "2-3 hours",
      payment: "€45",
      description: "Need assistance delivering packages in the local area. Must have valid driver's license and clean driving record.",
      tags: ["Delivery", "Driving", "Local"],
      verified: false
    },
    {
      id: 4,
      title: "House Cleaning",
      distance: "3.2 km away",
      duration: "5 hours",
      payment: "€75",
      description: "Deep cleaning of 2-bedroom apartment including windows and balcony. Cleaning supplies provided.",
      tags: ["Cleaning", "Household", "Indoor"],
      verified: true,
      rating: "4.9"
    },
    {
      id: 5,
      title: "Event Setup Helper",
      distance: "4.7 km away",
      duration: "6 hours",
      payment: "€90",
      description: "Need help setting up and breaking down for a local community event. Includes arranging chairs, tables, and decorations.",
      tags: ["Event", "Setup", "Physical Work"],
      verified: false
    },
    {
      id: 6,
      title: "Dog Walking",
      distance: "0.8 km away",
      duration: "1 hour",
      payment: "€15",
      description: "Walk two friendly golden retrievers around the neighborhood. Regular opportunity available.",
      tags: ["Pets", "Walking", "Regular"],
      verified: true,
      rating: "5.0"
    },
    {
      id: 7,
      title: "Paint Room & Small Repairs",
      distance: "3.5 km away",
      duration: "6-8 hours",
      payment: "€160",
      description: "Need help painting a living room and fixing some minor wall damage. Paint and tools will be provided. Experience preferred.",
      tags: ["Household", "Painting", "Repairs"],
      verified: true,
      rating: "4.7"
    },
    {
      id: 8,
      title: "Bike Courier Needed",
      distance: "1.2 km away",
      duration: "2-3 hours",
      payment: "€35",
      description: "Looking for someone with a bicycle to deliver small packages within the city center. Must have own bike and be familiar with the area.",
      tags: ["Delivery", "Cycling", "Quick"],
      verified: false
    },
    {
      id: 9,
      title: "Computer Setup Help",
      distance: "4.1 km away",
      duration: "2 hours",
      payment: "€40",
      description: "Need assistance setting up new computer and transferring files. Basic tech knowledge required.",
      tags: ["Technology", "Setup", "Indoor"],
      verified: true
    },
    {
      id: 10,
      title: "Weekend Food Delivery",
      distance: "2.9 km away",
      duration: "4 hours",
      payment: "€55",
      description: "Restaurant needs extra delivery help for busy weekend. Must have car or scooter. Tips additional.",
      tags: ["Delivery", "Food", "Weekend"],
      verified: true,
      rating: "4.6"
    },
    {
      id: 11,
      title: "Photography Assistant",
      distance: "6.2 km away",
      duration: "5 hours",
      payment: "€100",
      description: "Need assistant for weekend wedding shoot. Help with equipment and basic photography knowledge preferred.",
      tags: ["Photography", "Event", "Creative"],
      verified: true
    },
    {
      id: 12,
      title: "Organize Garage",
      distance: "3.7 km away",
      duration: "4-5 hours",
      payment: "€70",
      description: "Help needed to organize and clean garage. Includes sorting items, some heavy lifting, and cleaning.",
      tags: ["Cleaning", "Organizing", "Physical Work"],
      verified: false
    },
    {
      id: 13,
      title: "Language Exchange - German",
      distance: "1.5 km away",
      duration: "2 hours",
      payment: "€30",
      description: "Looking for native German speaker for conversation practice. Casual setting at local café.",
      tags: ["Teaching", "Language", "Casual"],
      verified: true,
      rating: "5.0"
    },
    {
      id: 14,
      title: "Children's Party Helper",
      distance: "4.4 km away",
      duration: "3 hours",
      payment: "€45",
      description: "Need help with kids' birthday party. Tasks include setup, supervising games, and cleanup.",
      tags: ["Event", "Children", "Party"],
      verified: true
    },
    {
      id: 15,
      title: "Basic Plumbing Help",
      distance: "2.3 km away",
      duration: "1-2 hours",
      payment: "€50",
      description: "Need assistance fixing a leaky faucet and unclogging drain. Basic plumbing knowledge required.",
      tags: ["Repairs", "Plumbing", "Quick"],
      verified: true,
      rating: "4.8"
    },
    {
      id: 16,
      title: "Grocery Shopping Assistant",
      distance: "1.1 km away",
      duration: "2 hours",
      payment: "€25",
      description: "Help needed with weekly grocery shopping and carrying groceries for elderly person.",
      tags: ["Shopping", "Assistance", "Regular"],
      verified: true
    },
    {
      id: 17,
      title: "Car Wash & Detailing",
      distance: "3.9 km away",
      duration: "3 hours",
      payment: "€55",
      description: "Looking for someone to wash and detail two cars. Supplies provided. Experience preferred.",
      tags: ["Cleaning", "Automotive", "Outdoor"],
      verified: false
    },
    {
      id: 18,
      title: "Moving Sale Helper",
      distance: "5.5 km away",
      duration: "6 hours",
      payment: "€85",
      description: "Need help organizing and running a moving sale. Tasks include setting up items, pricing, and handling transactions.",
      tags: ["Sales", "Moving", "Organization"],
      verified: true
    }
  ];

  useEffect(() => {
    setFilteredJobs(allJobs);
    setTotalJobs(allJobs.length);
  }, []);

  const handleFilterChange = (filters) => {
    let results = [...allJobs];
    
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Distance filter
    if (filters.distance !== 'all') {
      const [min, max] = filters.distance.split('-').map(num => 
        num.includes('+') ? Infinity : Number(num)
      );
      results = results.filter(job => {
        const jobDistance = parseFloat(job.distance);
        return jobDistance >= min && jobDistance < (max || Infinity);
      });
    }

    // Payment filter
    if (filters.payment !== 'all') {
      const [min, max] = filters.payment.split('-').map(num => 
        num.includes('+') ? Infinity : Number(num)
      );
      const jobPayment = job => Number(job.payment.replace('€', ''));
      results = results.filter(job => 
        jobPayment(job) >= min && jobPayment(job) < (max || Infinity)
      );
    }

    // Duration filter
    if (filters.duration !== 'all') {
      const [min, max] = filters.duration.split('-').map(num => 
        num.includes('+') ? Infinity : Number(num)
      );
      results = results.filter(job => {
        const jobHours = parseInt(job.duration);
        return jobHours >= min && jobHours < (max || Infinity);
      });
    }

    // Job type filter
    if (filters.type !== 'all') {
      results = results.filter(job =>
        job.tags.includes(filters.type)
      );
    }

    setFilteredJobs(results);
    setTotalJobs(results.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy-900 mb-3">
            Side Jobs Near You
          </h1>
          <p className="text-gray-600 text-lg">
            {totalJobs} opportunities available in your area
          </p>
        </div>

        <SearchSection onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
        </div>
      </div>
    </div>
  );
};

export default JobsPage;