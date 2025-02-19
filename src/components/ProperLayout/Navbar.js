import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-brand p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-navy-900">
          EzJob
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-900 font-bold hover:text-gray-600">Home</Link>
          <Link to="/jobs" className="text-gray-900 font-bold hover:text-gray-600">Find Jobs</Link>
          <Link to="/post-job" className="text-gray-900 font-bold hover:text-gray-600">Post a Job</Link>
          <Link to="/contact" className="text-gray-900 font-bold hover:text-gray-600">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;