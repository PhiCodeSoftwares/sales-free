import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import TextInput from "./widgets/TextInput";

const Overview = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    setSalesData(salesHistory);
    setFilteredData(salesHistory);
    calculateMetrics(salesHistory);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = salesData.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
      });
      setFilteredData(filtered);
      calculateMetrics(filtered);
    }
  }, [startDate, endDate]);

  const calculateMetrics = (data) => {
    const totalRevenue = data.reduce((sum, sale) => sum + sale.total, 0);
    const totalSales = data.length;
    const ticketAverage = totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : 0;

    const productMap = {};
    const serviceMap = {};

    data.forEach((sale) => {
      sale.products.forEach((product) => {
        if (!productMap[product.name]) {
          productMap[product.name] = product.quantity;
        } else {
          productMap[product.name] += product.quantity;
        }
      });

      (sale.services || []).forEach((service) => {
        if (!serviceMap[service.name]) {
          serviceMap[service.name] = service.quantity;
        } else {
          serviceMap[service.name] += service.quantity;
        }
      });
    });

    const sortedProducts = Object.entries(productMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }));

    const sortedServices = Object.entries(serviceMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }));

    const serviceRevenue = data.reduce((sum, sale) => {
      return (
        sum +
        (sale.services || []).reduce((serviceSum, service) => serviceSum + service.price * service.quantity, 0)
      );
    }, 0);

    setMetrics({
      totalRevenue,
      totalSales,
      ticketAverage,
      topProducts: sortedProducts,
      topServices: sortedServices,
      serviceRevenue,
      totalClients: new Set(data.map((sale) => sale.customer?.id)).size,
      totalProducts: JSON.parse(localStorage.getItem("products") || "[]").length,
    });
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

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

      {/* Seção de Produtos */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Produtos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Receita Total</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: "Receita", value: metrics.totalRevenue }]}> 
                <Bar dataKey="value" fill="#8884d8" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Ticket Médio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: "Ticket Médio", value: metrics.ticketAverage }]}> 
                <Bar dataKey="value" fill="#82ca9d" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Produtos Mais Vendidos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metrics.topProducts}
                  dataKey="quantity"
                  nameKey="name"
                  fill="#8884d8"
                  label={(entry) => entry.name}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seção de Serviços */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Serviços</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Receita de Serviços</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{ name: "Receita", value: metrics.serviceRevenue }]}> 
                <Bar dataKey="value" fill="#8884d8" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold mb-4">Serviços Mais Realizados</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metrics.topServices}
                  dataKey="quantity"
                  nameKey="name"
                  fill="#82ca9d"
                  label={(entry) => entry.name}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="mt-8 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Métricas Gerais</h2>
        <ul className="list-disc ml-4">
          <li>Número de Clientes: {metrics.totalClients}</li>
          <li>Número de Produtos Cadastrados: {metrics.totalProducts}</li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
