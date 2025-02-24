import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/ProperLayout/Layout";
import Home from "./components/Pages/Home";
import JobsPage from "./components/Pages/Jobs/JobsPage";

import "./index.css";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
