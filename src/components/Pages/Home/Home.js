import React from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import FeaturedGigs from './FeaturedGigs';
import Testimonials from './Testimonials';
import Stats from './Stats';
import CTA from './CTA';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

const Home = () => {
  return (
    <div className="w-full">
      {/* Section 1: Hero with pink background */}
      <div className="bg-pink-50">
        <Hero />
      </div>
      
      {/* Section 2: How It Works with gradient background */}
      <HowItWorks />
      
      {/* Section 3: Featured Gigs with white background */}
      <FeaturedGigs />
      
      {/* Section 4: Testimonials with black background */}
      <Testimonials />
      
      {/* Section 5: Stats with black background */}
      <Stats />

      <FrequentlyAskedQuestions />
      
      {/* Section 6: CTA with gradient background */}
      <CTA />
    </div>
  );
};

export default Home;