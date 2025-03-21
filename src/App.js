import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ProperLayout/Layout";
import Home from "./components/Pages/Home/Home";
import JobListing from "./components/Pages/Jobs/JobListing";
import JobTemplate from "./components/Pages/Jobs/JobTemplate";
import PostJobPage from "./components/Pages/Jobs/PostJob";
import AuthPage from './components/Pages/AuthPage';
import WaitlistPage from './components/Pages/Waitlist/WaitlistPage';
import SurveyAnalytics from './components/Pages/Waitlist/SurveyAnalytics';
import ProtectedRoute from './ProtectedRoute';
import { AppContextProvider } from './AppContext';


import "./index.css";

function App() {
  return (
    <AppContextProvider> {/* Wrap everything inside the context provider */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Protected job listing route */}
            <Route path="/listing" element={
              <ProtectedRoute>
                <JobListing />
              </ProtectedRoute>
            } />
            {/* Protected job detail route */}
            <Route path="/job/:id" element={
              <ProtectedRoute>
                <JobTemplate />
              </ProtectedRoute>
            } />
            <Route path="/auth" element={<AuthPage />} />
            {/* Protected job posting route */}
            <Route path="/post" element={
              <ProtectedRoute>
                <PostJobPage />
              </ProtectedRoute>
            } />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/analytics" element={<SurveyAnalytics />} />
          </Routes>
        </Layout>
      </Router>
    </AppContextProvider>
  );
}

export default App;