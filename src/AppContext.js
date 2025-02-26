// src/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from './firebase/firebase';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Provider component
export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  // Add redirectPath state to track where to redirect after logout
  const [redirectPath, setRedirectPath] = useState(null);

  // Sign up function
  const signup = async (email, password) => {
    setError('');
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Login function
  const login = async (email, password) => {
    setError('');
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Logout function
  const logout = (callback) => {
    setRedirectPath('/'); // Set redirect path to homepage
    return signOut(auth)
      .then(() => {
        // Call callback after successful logout if provided
        if (callback && typeof callback === 'function') {
          callback();
        }
      })
      .catch((error) => {
        setError('Failed to log out');
        console.error('Logout error:', error);
      });
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Context value
  const value = {
    currentUser,
    userData,
    loading,
    error,
    redirectPath, // Expose redirectPath to components
    signup,
    login,
    logout,
    // Add a utility function to update user data
    updateUserData: (data) => {
      setUserData(prev => ({...prev, ...data}))
    },
    // Reset redirect path after it's been used
    resetRedirect: () => setRedirectPath(null)
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};