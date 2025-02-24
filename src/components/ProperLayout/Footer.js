import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-brand p-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold text-navy-900">EzJob</p>
        <p className="text-gray-600 text-sm">Connecting job seekers and employers with ease.</p>

        {/* Quick Links */}
        <div className="mt-4 space-x-4">
          <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Terms of Use
          </a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Contact
          </a>
        </div>

        {/* Social Media */}
        <div className="mt-4 flex justify-center space-x-6">
          <a 
            href="https://www.linkedin.com/company/ez_job/?viewAsMember=true" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://www.instagram.com/ezjob.app?utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
          >
            <Instagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} EzJob. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;