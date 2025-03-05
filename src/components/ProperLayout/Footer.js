import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0B26] text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <p className="text-2xl font-bold tracking-wide">
            <span className="text-blue-600">Ez</span>Job
          </p>
          <p className="text-gray-400 mt-2">Connecting side hustlers and local gigs with ease.</p>
        </div>

        {/* Social Media */}
        <div className="mt-8 flex justify-center space-x-6">
          <a 
            href="https://www.linkedin.com/company/ez_job/?viewAsMember=true" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-800 text-white hover:bg-blue-600 p-3 rounded-full transition-colors duration-200"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://www.instagram.com/ezjob.app?utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-800 text-white hover:bg-pink-600 p-3 rounded-full transition-colors duration-200"
          >
            <Instagram size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EzJob. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;