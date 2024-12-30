import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/widgets/Sidebar";
import Products from "./components/Products";
import CalculatePrice from "./components/CalculatePrice";
import Sales from "./components/Sales";
import Home from "./components/Home";
import ExportImport from "./components/ExportImport";
import PDVScreen from "./components/PDV";
import Insights from "./components/Insights";
import Settings from "./components/Settings";
import Services from "./components/Services";
import Customers from "./components/Custormers";
import OrderServiceList from "./components/OrderService";

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

            <Route path="/sales-free/calculate-price" element={<CalculatePrice />} />
            <Route path="/sales-free/products" element={<Products />} />
            <Route path="/sales-free/services" element={<Services />} />
            <Route path="/sales-free/customers" element={<Customers />} />
            <Route path="/sales-free/pdv" element={<PDVScreen />} />
            <Route path="/sales-free/sales" element={<Sales />} />
            <Route path="/sales-free/order-service" element={<OrderServiceList />} />
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