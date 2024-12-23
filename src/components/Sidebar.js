import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Botão do menu hambúrguer (apenas para mobile) */}
      <button
        className="block md:hidden p-2 text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-full md:relative inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 bg-orange-700 text-white w-64 p-4 z-50 md:static md:flex-shrink-0`}
      >
        {/* Botão de fechar (apenas para mobile) */}
        <button
          className="block md:hidden p-2 text-white mb-4"
          onClick={() => setIsOpen(false)}
        >
          Fechar
        </button>
        <ul className="space-y-4">
            <li className="font-semibold">
                <Link to="/" onClick={() => setIsOpen(false)}>
                    Home
                </Link>
            </li>
            <li className="font-semibold">Produtos</li>
            <ul className="ml-4 space-y-2">
                <li>
                <Link to="/calculate-price" onClick={() => setIsOpen(false)}>
                    Calcular Preço
                </Link>
                </li>
                <li>
                <Link to="/products" onClick={() => setIsOpen(false)}>
                    Produtos
                </Link>
                </li>
            </ul>
            <li className="font-semibold">Vendas</li>
                <ul className="ml-4 space-y-2">
                    <li>
                    <Link to="/sales" onClick={() => setIsOpen(false)}>
                        Vender agora
                    </Link>
                    </li>
                    <li>
                    <Link to="/sales" onClick={() => setIsOpen(false)}>
                        Minhas vendas
                    </Link>
                    </li>
                </ul>
            <li className="font-semibold">
                <Link to="/export-import" onClick={() => setIsOpen(false)}>
                Exportar e Importar
                </Link>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
