import React from 'react';
import { Briefcase, Users, Zap, BarChart2 } from 'lucide-react';

const Stats = () => {
  // Stats data
  const stats = [
    {
      id: 1,
      icon: <Briefcase size={32} />,
      value: '10K+',
      label: 'Active gig listings'
    },
    {
      id: 2,
      icon: <Users size={32} />,
      value: '8K+',
      label: 'Registered users'
    },
    {
      id: 3,
      icon: <Zap size={32} />,
      value: '24h',
      label: 'Average response time'
    },
    {
      id: 4,
      icon: <BarChart2 size={32} />,
      value: '95%',
      label: 'Success rate'
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-medium mb-16">
          Trusted by <span className="font-bold">thousands</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(stat => (
            <div key={stat.id}>
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;