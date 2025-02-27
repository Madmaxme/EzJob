import React from 'react';
import { Building, School, Users, Home, Store } from 'lucide-react';

const Partners = () => {
  return (
    <div className="w-full bg-pink-50 pb-12 pt-0 -mt-48">
      <div className="max-w-6xl mx-auto px-4">
        {/* Partners row with icons + text */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Each partner with icon + name */}
          <div className="flex items-center gap-2">
            <Building size={20} className="text-teal-500" />
            <span className="text-gray-600 font-medium">LocalChamber</span>
          </div>
          <div className="flex items-center gap-2">
            <School size={20} className="text-teal-500" />
            <span className="text-gray-600 font-medium">CommunityCollege</span>
          </div>
          <div className="flex items-center gap-2">
            <Store size={20} className="text-teal-500" />
            <span className="text-gray-600 font-medium">SmallBizAssoc</span>
          </div>
          <div className="flex items-center gap-2">
            <Home size={20} className="text-teal-500" />
            <span className="text-gray-600 font-medium">NeighborhoodHub</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-teal-500" />
            <span className="text-gray-600 font-medium">LocalCoop</span>
          </div>
        </div>
        
        {/* Text line below partners */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Local organizations worldwide trust EzJob to connect communities with flexible work.
        </p>
      </div>
    </div>
  );
};

export default Partners;