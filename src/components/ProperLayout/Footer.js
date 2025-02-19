const Footer = () => {
  return (
    <footer className="bg-transparent text-brand p-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold text-navy-900">EzJob</p>
        <p className="text-gray-600 text-sm">Connecting job seekers and employers with ease.</p>

        {/* Quick Links */}
        <div className="mt-4 space-x-4">
          <a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
          <a href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Use</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </div>

        {/* Social Media */}
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">Facebook</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Twitter</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm mt-4">© {new Date().getFullYear()} EzJob. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;