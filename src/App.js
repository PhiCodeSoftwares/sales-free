import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CalculatePrice from "./components/CalculatingPrice";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculate-price" element={<CalculatePrice />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;