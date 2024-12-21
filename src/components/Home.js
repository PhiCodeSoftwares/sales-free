import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo à Aplicação</h1>
      <p className="text-lg text-gray-600 mb-6">
        Aqui você pode calcular preços de produtos com base em impostos e
        margens de lucro.
      </p>
      <Link
        to="/calculate-price"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Calcular Preços
      </Link>
    </div>
  );
};

export default Home;