import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ProperLayout/Layout";
import Home from "./components/Pages/Home/Home";
import JobListing from "./components/Pages/Jobs/JobListing";
import JobTemplate from "./components/Pages/Jobs/JobTemplate";
import PostJobPage from "./components/Pages/Jobs/PostJob";
import AuthPage from './components/Pages/AuthPage';
import WaitlistPage from './components/Pages/Waitlist/WaitlistPage'
import { AppContextProvider } from './AppContext';

import "./index.css";

function App() {
  return (
    <AppContextProvider> {/* Wrap everything inside the context provider */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<JobListing />} />
            <Route path="/job/:id" element={<JobTemplate />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/post" element={<PostJobPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppContextProvider>
  );
}

export default App;
