import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TextInput from "./widgets/TextInput";

const Performance = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    setSalesData(salesHistory);
    setFilteredData(salesHistory);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = salesData.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate]);

  const salesByDate = filteredData.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const revenueByDate = filteredData.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {});

  const salesChartData = Object.entries(salesByDate).map(([date, count]) => ({
    date,
    count,
  }));

  const revenueChartData = Object.entries(revenueByDate).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Desempenho</h1>

      {/* Filtro por período */}
      <div className="flex gap-4 mb-6">
        <TextInput
          label="Data Inicial"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextInput
          label="Data Final"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Gráfico de quantidade de vendas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quantidade de Vendas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de receita total */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Receita Total</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Indicadores de Desempenho */}
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Indicadores de Desempenho</h2>
        <ul className="list-disc ml-4">
          <li>Total de Vendas: {filteredData.length}</li>
          <li>
            Receita Total: R${" "}
            {filteredData.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Performance;