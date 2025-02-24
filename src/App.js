import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ProperLayout/Layout";
import Home from "./components/Pages/Home";
import JobListing from "./components/Pages/Jobs/JobListing";
import JobTemplate from "./components/Pages/Jobs/JobTemplate"

import "./index.css";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<JobListing />} />
        <Route path="/job/:id" element={<JobTemplate />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
