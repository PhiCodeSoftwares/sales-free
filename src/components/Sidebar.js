import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"

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
        } md:translate-x-0 transition-transform duration-300 bg-background text-onBackground w-64 p-4 z-50 md:static md:flex-shrink-0`}
      >
        {/* Botão de fechar (apenas para mobile) */}
        <button
          className="block md:hidden p-2 text-[] mb-4"
          onClick={() => setIsOpen(false)}
        >
          Fechar
        </button>

        <div className="w-full flex justify-center items-center">
          <img className="w-32 h-32" src={logo} alt="logo" />
        </div>

        <ul className="space-y-4">
            <li className="font-semibold">
                <Link to="/sales-free/home" onClick={() => setIsOpen(false)}>
                    Home
                </Link>
            </li>

            <li className="font-semibold">
              <Link to="/sales-free/calculate-price" onClick={() => setIsOpen(false)}>
                    Calculadora de Preço
                </Link>
            </li>
            
            <li className="font-semibold">Produtos</li>
            <ul className="ml-4 space-y-2">
                <li>
                <Link to="/sales-free/products" onClick={() => setIsOpen(false)}>
                    Produtos
                </Link>
                </li>
            </ul>
            
            <li className="font-semibold">Serviços</li>
            <ul className="ml-4 space-y-2">
                <li>
                <Link to="/sales-free/services" onClick={() => setIsOpen(false)}>
                    Serviços
                </Link>
                </li>
            </ul>

              <li className="font-semibold">Vendas</li>
                <ul className="ml-4 space-y-2">
                    <li>
                      <Link to="/sales-free/pdv" onClick={() => setIsOpen(false)}>
                          Vender agora
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/sales" onClick={() => setIsOpen(false)}>
                          Minhas vendas
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/order-service" onClick={() => setIsOpen(false)}>
                          Ordem de Serviço
                      </Link>
                    </li>
                </ul>
              <li className="font-semibold">Insights</li>
                <ul className="ml-4 space-y-2">
                    <li>
                      <Link to="/sales-free/insights" onClick={() => setIsOpen(false)}>
                          Visão geral
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/insights" onClick={() => setIsOpen(false)}>
                          Desempenho
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/insights" onClick={() => setIsOpen(false)}>
                          Comportamento dos Clientes
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/insights" onClick={() => setIsOpen(false)}>
                        Receita e Lucratividade
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/insights" onClick={() => setIsOpen(false)}>
                        Análise de Tendências
                      </Link>
                    </li>
                    <li>
                      <Link to="/sales-free/insights" onClick={() => setIsOpen(false)}>
                        Relatórios
                      </Link>
                    </li>
                </ul>
            
              <li className="font-semibold">Configurações</li>
                <ul className="ml-4 space-y-2">
                    <li>
                    <Link to="/sales-free/settings" onClick={() => setIsOpen(false)}>
                      Exportar e Importar
                    </Link>
                    </li>
                    <li>
                    <Link to="/sales-free/settings" onClick={() => setIsOpen(false)}>
                        Tipo de acesso
                    </Link>
                    </li>
                </ul>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
