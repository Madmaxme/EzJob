import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext"; // Import AppContext

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, redirectPath, resetRedirect } = useAppContext();
  const navigate = useNavigate();

  // Define navigation links
  const navLinks = [
    { title: "Home", path: "/", requiresAuth: false },
    { title: "Find Jobs", path: "/listing", requiresAuth: true },
    { title: "Post a Job", path: "/post", requiresAuth: true },
    { title: "Join our Waitlist", path: "/waitlist", requiresAuth: false },
    { title: "Contact", path: "/contact", requiresAuth: false },

    // Add new links here - format: { title: "Link Name", path: "/path", requiresAuth: true/false }
  ];

  // Handle logout and navigation
  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  };

  // Check for redirectPath from context and navigate if needed
  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      resetRedirect();
    }
  }, [redirectPath, navigate, resetRedirect]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-wide text-navy-900">
          <span className="text-blue-500">Ez</span>Job
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex space-x-8 flex-grow justify-center">
          {navLinks.map((link, index) => (
            // Only show links that don't require auth, or if user is authenticated
            (!link.requiresAuth || currentUser) && (
              <Link 
                key={index} 
                to={link.path} 
                className="text-gray-900 font-semibold hover:text-black transition"
              >
                {link.title}
              </Link>
            )
          ))}
        </div>

        {/* Authentication Buttons - Aligned to the Right */}
        <div className="hidden md:flex">
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="text-black border border-black px-5 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-black border border-black px-5 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center p-2 rounded-full hover:bg-gray-100 transition focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <span className="sr-only">Open menu</span>
          <div className="relative w-6 h-5">
            <span className={`absolute h-0.5 w-6 bg-gray-900 transform transition ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`absolute h-0.5 bg-gray-900 transform transition ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-6 bg-gray-900 transform transition ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)} />

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-2xl transition-transform z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-navy-900">
            <span className="text-black">Ez</span>Job
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="py-6 px-5 flex flex-col space-y-6">
          {navLinks.map((link, index) => (
            // Only show links that don't require auth, or if user is authenticated
            (!link.requiresAuth || currentUser) && (
              <Link 
                key={index} 
                to={link.path} 
                className="text-lg font-bold text-gray-900 hover:text-black transition" 
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            )
          ))}

          {/* Mobile Authentication Button */}
          {currentUser ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-black border border-black px-5 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-black border border-black px-5 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;