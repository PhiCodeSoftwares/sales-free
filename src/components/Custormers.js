import React, { useState, useEffect } from "react";
import CustomerModal from "./modals/CustomerModal";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    const cachedCustomers = localStorage.getItem("customers");
    if (cachedCustomers) {
      setCustomers(JSON.parse(cachedCustomers));
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }, [customers, isInitialLoad]);

  const saveCustomersToStorage = (updatedCustomers) => {
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
  };

  const handleAddCustomer = (customer) => {
    const updatedCustomers = [...customers, customer];
    setCustomers(updatedCustomers);
    saveCustomersToStorage(updatedCustomers);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    saveCustomersToStorage(updatedCustomers);
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
    saveCustomersToStorage(updatedCustomers);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedCustomers = customers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Clientes</h1>
      <button
        className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-primary mb-4"
        onClick={() => {
          setShowModal(true);
          setEditCustomer(null);
        }}
      >
        Adicionar Cliente
      </button>

      <div className="bg-white rounded shadow p-4">
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Telefone 1</th>
              <th className="px-4 py-2">Cidade</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedCustomers.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.phone1}</td>
                <td className="px-4 py-2">{customer.city}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-warning text-onBackground px-2 py-1 rounded hover:bg-opacity-80 mr-2"
                    onClick={() => {
                      setEditCustomer(customer);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-error text-onBackground px-2 py-1 rounded hover:bg-opacity-80"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            disabled={currentPage === Math.ceil(customers.length / ITEMS_PER_PAGE)}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>

      {showModal && (
        <CustomerModal
          customer={editCustomer}
          onClose={() => setShowModal(false)}
          onSave={(newCustomer) => {
            if (editCustomer) {
              handleUpdateCustomer(newCustomer);
            } else {
              handleAddCustomer(newCustomer);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Customers;
