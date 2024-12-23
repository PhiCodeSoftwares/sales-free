import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import CalculatePrice from "./components/CalculatePrice";
import Sales from "./components/Sales";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/calculate-price" element={<CalculatePrice />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;