import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import CalculatePrice from "./components/CalculatePrice";
import Sales from "./components/Sales";
import Home from "./components/Home";
import ExportImport from "./components/ExportImport";
import Sale from "./components/Sale";
import Insights from "./components/Insights";
import Settings from "./components/Settings";
import OrderService from "./components/OrderService";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <div className="flex-grow p-4">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/sales-free" element={<Home />} />
            <Route path="/sales-free/home" element={<Home />} />

            <Route path="/sales-free/products" element={<Products />} />
            <Route path="/sales-free/calculate-price" element={<CalculatePrice />} />
            <Route path="/sales-free/sale" element={<Sale />} />
            <Route path="/sales-free/sales" element={<Sales />} />
            <Route path="/sales-free/order-service" element={<OrderService />} />
            <Route path="/sales-free/insights" element={<Insights />} />
            <Route path="/sales-free/export-import" element={<ExportImport />} />
            <Route path="/sales-free/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;