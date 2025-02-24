import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-transparent text-brand p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-navy-900 flex items-center">
          <span className="text-blue-600">Ez</span>Job
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-900 font-bold hover:text-blue-600 transition duration-300">Home</Link>
          <Link to="/listing" className="text-gray-900 font-bold hover:text-blue-600 transition duration-300">Find Jobs</Link>
          <Link to="/post-job" className="text-gray-900 font-bold hover:text-blue-600 transition duration-300">Post a Job</Link>
          <Link to="/contact" className="text-gray-900 font-bold hover:text-blue-600 transition duration-300">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open menu</span>
          <div className="relative w-6 h-5">
            <span 
              className={`absolute h-0.5 w-6 bg-gray-900 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
              style={{ top: '0' }}
            />
            <span 
              className={`absolute h-0.5 bg-gray-900 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ top: '50%', width: '24px' }}
            />
            <span 
              className={`absolute h-0.5 w-6 bg-gray-900 transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
              style={{ bottom: '0' }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Slide-in Panel */}
      <div 
        className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-wide text-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            EzJob
          </Link>
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="24" 
              height="24" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
        
        <div className="py-6 px-5">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"></path>
              </svg>
              Home
            </Link>
            <Link 
              to="/listing" 
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Find Jobs
            </Link>
            <Link 
              to="/post-job" 
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Post a Job
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition duration-300 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;