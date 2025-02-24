import React, { useState } from 'react';
import { Search, Truck, Home, ShoppingBag, Wrench, Dog, Camera, Book, Leaf, PartyPopper, Briefcase } from 'lucide-react';

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
        <select 
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Moving">Moving</option>
          <option value="Household">Household</option>
          <option value="Delivery">Delivery</option>
          <option value="Repairs">Repairs</option>
          <option value="Pets">Pets</option>
          <option value="Creative">Creative</option>
          <option value="Teaching">Teaching</option>
          <option value="Gardening">Gardening</option>
          <option value="Event">Events</option>
          <option value="General">General</option>
        </select>

        <select 
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
          value={filters.distance}
          onChange={(e) => handleFilterChange('distance', e.target.value)}
        >
          <option value="all">All Distances</option>
          <option value="0-5">Under 5km</option>
          <option value="5-10">5-10km</option>
          <option value="10-20">10-20km</option>
          <option value="20+">20km+</option>
        </select>

        <select 
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
          value={filters.payment}
          onChange={(e) => handleFilterChange('payment', e.target.value)}
        >
          <option value="all">All Payments</option>
          <option value="0-50">Under €50</option>
          <option value="50-100">€50-€100</option>
          <option value="100-200">€100-€200</option>
          <option value="200+">€200+</option>
        </select>

        <select 
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
          value={filters.duration}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
        >
          <option value="all">All Durations</option>
          <option value="1-2">1-2 hours</option>
          <option value="2-4">2-4 hours</option>
          <option value="4-6">4-6 hours</option>
          <option value="6+">6+ hours</option>
        </select>
      </div>
    </div>
  );
};

export default SearchSection;