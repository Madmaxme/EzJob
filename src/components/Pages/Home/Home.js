import React from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import FeaturedGigs from './FeaturedGigs';
import Testimonials from './Testimonials';
import Stats from './Stats';
import CTA from './CTA';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import Partners from './Partners';
import Waitlist from './Waitlist';

const Home = () => {
  return (
    <div className="w-full">
      <div className="bg-pink-50">
        <Hero />
        <Partners />
        <Waitlist />
        <HowItWorks />
        <FeaturedGigs />
        <Testimonials />
        <Stats />
        <FrequentlyAskedQuestions />
        <CTA />
      </div>
    </div>
  );
};

export default Home;