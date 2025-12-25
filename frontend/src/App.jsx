import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GuideDetails from "./GuideDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The Main List */}
        <Route path="/" element={<Home />} />
        
        {/* Route 2: The Detail View (e.g., /guide/123) */}
        <Route path="/guide/:id" element={<GuideDetails />} />
      </Routes>
    </Router>
  );
}

export default App;