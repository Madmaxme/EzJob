// src/components/Pages/AuthPage.js
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AuthPage = () => {
  // State for form display (login or signup)
  const [isLogin, setIsLogin] = useState(false);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Get auth methods from context
  const { signup, login, error, updateUserData, currentUser, userData, resetRedirect } = useAppContext();
  const navigate = useNavigate();
  
  // Check if user is already logged in and redirect accordingly
  useEffect(() => {
    if (currentUser) {
      // Check if there's a saved redirect path from ProtectedRoute
      if (userData.redirectAfterLogin) {
        // Get the redirect path
        const redirectPath = userData.redirectAfterLogin;
        // Reset the redirect path so it's not used again
        resetRedirect();
        // Navigate to the saved path
        navigate(redirectPath);
      } else {
        // Default redirect if no saved path
        navigate('/listing');
      }
    }
  }, [currentUser, navigate, userData, resetRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);
    
    try {
      if (isLogin) {
        // Handle login
        const result = await login(email, password);
        if (result) {
          // Update any additional user data if needed
          updateUserData({
            lastLoginAt: new Date().toISOString()
          });
          // Navigation will be handled by the useEffect when currentUser updates
        }
      } else {
        // Handle signup - with validation
        if (password !== confirmPassword) {
          setFormError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (password.length < 6) {
          setFormError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        
        const result = await signup(email, password, name);
        if (result) {
          // Additional user profile data is already being set in the context
          // But you can update more specific data here if needed
          updateUserData({
            displayName: name,
            isNewUser: true
          });
          // Navigation will be handled by the useEffect when currentUser updates
        }
      }
    } catch (err) {
      setFormError(isLogin ? 'Failed to log in' : 'Failed to create an account');
    }
    
    setLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormError('');
  };

  return (
    <div className="min-h-screen w-full bg-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-navy-900">
            {isLogin ? (
              <span>Welcome <span className="bg-teal-100 px-4 py-1 rounded-md">back</span></span>
            ) : (
              <span>Join <span className="bg-teal-100 px-4 py-1 rounded-md">Ez</span> today</span>
            )}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name field - only for signup */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            {/* Email field */}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {/* Confirm Password - only for signup */}
            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Error messages */}
          {(formError || error) && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {formError || error}
            </div>
          )}

          {/* Remember me and forgot password - login only */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  type="button"
                  onClick={() => alert('Password reset functionality would go here')}
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-lg text-white bg-[#0A0B26] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span className="flex items-center">
                  {isLogin ? 'Sign in' : 'Create account'}
                  <ArrowRight size={20} className="ml-2" />
                </span>
              )}
            </button>
          </div>
          
          {/* Toggle between login and signup */}
          <div className="text-sm text-center pt-4">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button 
              type="button"
              onClick={toggleForm}
              className="ml-2 font-medium text-teal-600 hover:text-teal-500"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;