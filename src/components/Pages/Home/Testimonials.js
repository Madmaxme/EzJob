import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  // Custom testimonials based on side hustle app focus
  const testimonials = [
    {
      id: 1,
      text: "EzJob helped me earn an extra €500 last month by dog walking and pet sitting in my neighborhood. Perfect for my student schedule!",
      name: "Maria K.",
      title: "University Student",
      initials: "MK",
      stars: 5
    },
    {
      id: 2,
      text: "I use my tech skills to help people set up their smart homes on weekends. EzJob connects me with local clients who pay well for my expertise.",
      name: "Thomas H.",
      title: "IT Professional",
      initials: "TH",
      stars: 5
    },
    {
      id: 3,
      text: "As a part-time photographer, I found several assistant gigs through EzJob. The local connections and transparent payment system make it so easy.",
      name: "Sophie L.",
      title: "Freelance Photographer",
      initials: "SL",
      stars: 4
    }
  ];

  // Render stars based on rating
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={20} 
        fill={index < count ? "currentColor" : "none"} 
        className="text-yellow-400" 
      />
    ));
  };

  return (
    <section className="py-24 bg-black relative">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10">
          <Quote size={80} className="text-pink-200" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Quote size={80} className="text-pink-200" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
            What our <span className="font-bold text-pink-300">Hustlers</span> say
          </h2>
          <div className="w-20 h-1 bg-pink-300 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`bg-gray-900 rounded-lg p-8 shadow-lg border-l-4 ${
                index === 0 ? 'border-blue-400' : index === 1 ? 'border-teal-400' : 'border-purple-400'
              }`}
            >
              <div className="flex text-yellow-400 mb-4">
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                  index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-teal-500' : 'bg-purple-500'
                }`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;