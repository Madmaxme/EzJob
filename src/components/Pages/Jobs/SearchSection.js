import React, { useState } from 'react';
import { Search, Truck, Home, ShoppingBag, Wrench, Dog, Camera, Book, Leaf, PartyPopper, Briefcase, ChevronDown } from 'lucide-react';

export const categoryIcons = {
  Moving: Truck,
  Household: Home,
  Delivery: ShoppingBag,
  Repairs: Wrench,
  Pets: Dog,
  Creative: Camera,
  Teaching: Book,
  Gardening: Leaf,
  Event: PartyPopper,
  General: Briefcase
};

export const categoryMapping = {
  'Moving': ['Moving', 'Furniture', 'Heavy Lifting'],
  'Household': ['Household', 'Cleaning', 'Indoor'],
  'Delivery': ['Delivery', 'Food'],
  'Repairs': ['Repairs', 'Plumbing'],
  'Pets': ['Pets', 'Dog'],
  'Creative': ['Photography', 'Creative'],
  'Teaching': ['Teaching', 'Language'],
  'Gardening': ['Gardening', 'Outdoor'],
  'Event': ['Event', 'Party'],
};

export const getJobCategory = (tags) => {
  for (const [category, categoryTags] of Object.entries(categoryMapping)) {
    if (tags.some(tag => categoryTags.includes(tag))) {
      return category;
    }
  }
  return 'General';
};

const SearchSection = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    distance: 'all',
    payment: 'all',
    duration: 'all',
    type: 'all',
    category: 'all'
  });

  // Single state to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters('search', value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    updateFilters(filterType, value);
  };

  const updateFilters = (type, value) => {
    const updatedFilters = {
      searchTerm: type === 'search' ? value : searchTerm,
      ...filters,
      [type]: value
    };
    onFilterChange(updatedFilters);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm flex items-center p-3 mb-6 border border-gray-100">
        <Search className="text-gray-400 w-5 h-5 ml-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for side jobs near you..."
          className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
        />
        <button 
          onClick={() => updateFilters('search', searchTerm)}
          className="bg-navy-900 text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Dropdown */}
        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() => toggleDropdown('category')}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 w-40 text-left flex items-center justify-between whitespace-nowrap"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                {filters.category === 'all' ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  categoryIcons[filters.category] && React.createElement(categoryIcons[filters.category], { className: "w-4 h-4" })
                )}
              </div>
              <span className="truncate">{filters.category === 'all' ? 'All Categories' : filters.category}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${openDropdown === 'category' ? 'transform rotate-180' : ''}`} />
          </button>

          {openDropdown === 'category' && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              <div 
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  handleFilterChange('category', 'all');
                  setOpenDropdown(null);
                }}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span>All Categories</span>
              </div>
              {Object.entries(categoryIcons).map(([category, Icon]) => (
                <div
                  key={category}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleFilterChange('category', category);
                    setOpenDropdown(null);
                  }}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Distance Dropdown */}
        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() => toggleDropdown('distance')}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 w-40 text-left flex items-center justify-between"
          >
            <span>{filters.distance === 'all' ? 'All Distances' : `Under ${filters.distance.split('-')[1] || '20+'}km`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'distance' ? 'transform rotate-180' : ''}`} />
          </button>

          {openDropdown === 'distance' && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {[
                { value: 'all', label: 'All Distances' },
                { value: '0-5', label: 'Under 5km' },
                { value: '5-10', label: '5-10km' },
                { value: '10-20', label: '10-20km' },
                { value: '20+', label: '20km+' }
              ].map(option => (
                <div 
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleFilterChange('distance', option.value);
                    setOpenDropdown(null);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Dropdown */}
        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() => toggleDropdown('payment')}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 w-40 text-left flex items-center justify-between"
          >
            <span>{filters.payment === 'all' ? 'All Payments' : `Under €${filters.payment.split('-')[1] || '200+'}`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'payment' ? 'transform rotate-180' : ''}`} />
          </button>

          {openDropdown === 'payment' && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {[
                { value: 'all', label: 'All Payments' },
                { value: '0-50', label: 'Under €50' },
                { value: '50-100', label: '€50-€100' },
                { value: '100-200', label: '€100-€200' },
                { value: '200+', label: '€200+' }
              ].map(option => (
                <div 
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleFilterChange('payment', option.value);
                    setOpenDropdown(null);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Duration Dropdown */}
        <div className="relative dropdown-container">
          <button
            type="button"
            onClick={() => toggleDropdown('duration')}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 w-40 text-left flex items-center justify-between"
          >
            <span>{filters.duration === 'all' ? 'All Durations' : `${filters.duration} hours`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'duration' ? 'transform rotate-180' : ''}`} />
          </button>

          {openDropdown === 'duration' && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {[
                { value: 'all', label: 'All Durations' },
                { value: '1-2', label: '1-2 hours' },
                { value: '2-4', label: '2-4 hours' },
                { value: '4-6', label: '4-6 hours' },
                { value: '6+', label: '6+ hours' }
              ].map(option => (
                <div 
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleFilterChange('duration', option.value);
                    setOpenDropdown(null);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;