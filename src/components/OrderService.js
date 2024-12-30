import React, { useState, useEffect } from "react";
import OrderServiceModal from "./modals/OrderServiceModal";

const ITEMS_PER_PAGE = 25;

const OrderServiceList = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const cachedOrders = localStorage.getItem("orders");
    const cachedCustomers = localStorage.getItem("customers");
    const cachedServices = localStorage.getItem("services");
    const cachedProducts = localStorage.getItem("products");

    if (cachedOrders) setOrders(JSON.parse(cachedOrders));
    if (cachedCustomers) setCustomers(JSON.parse(cachedCustomers));
    if (cachedServices) setServices(JSON.parse(cachedServices));
    if (cachedProducts) setProducts(JSON.parse(cachedProducts));

    console.log(cachedOrders);
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta ordem de serviço?")) {
      const updatedOrders = orders.filter((order) => order.id !== id);
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      
      
    }
  };

  const handleAddNew = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleSave = (order) => {
    console.log("Order recebido para salvar:", order);
  
    const updatedOrders = orders.some((o) => o.id === order.id)
      ? orders.map((o) => (o.id === order.id ? order : o)) // Atualiza a OS existente
      : [...orders, { ...order, id: Date.now() }]; // Adiciona uma nova OS
  
    console.log("Lista atualizada de orders:", updatedOrders);
  
    setOrders(updatedOrders); // Atualiza o estado
    localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Salva no localStorage
    setIsModalOpen(false); // Fecha o modal
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = order.customer?.name || ""; // Usa uma string vazia como fallback
    const searchTerm = search.toLowerCase();
    
    return customerName.toLowerCase().includes(searchTerm) || order.id.toString().includes(searchTerm);
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 bg-light text-dark">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Ordens de Serviço</h1>
        <button
          className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-success"
          onClick={handleAddNew}
        >
          Nova OS
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="border rounded w-full p-2 text-dark placeholder-gray"
          placeholder="Buscar por cliente ou ID"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="w-full border border-gray">
        <thead>
          <tr className="bg-secondary text-onSecondary">
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Cliente</th>
            <th className="text-left px-4 py-2">Data da Solicitação</th>
            <th className="text-left px-4 py-2">Data da Execução</th>
            <th className="text-left px-4 py-2">Valor Total</th>
            <th className="text-center px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer?.name}</td>
                <td className="px-4 py-2">{order.requestDateTime}</td>
                <td className="px-4 py-2">
                  {order.executionDateTime || "Não definida"}
                </td>
                <td className="px-4 py-2">R$ {parseFloat(order.totalValue).toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-warning text-onBackground px-2 py-1 rounded hover:bg-accent mx-1"
                    onClick={() => handleEdit(order)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-error text-white px-2 py-1 rounded hover:bg-dark mx-1"
                    onClick={() => handleDelete(order.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center px-4 py-2 text-muted">
                Nenhuma ordem de serviço encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-secondary text-onSecondary rounded hover:bg-primary disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-secondary text-onSecondary rounded hover:bg-primary disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      {isModalOpen && (
        <OrderServiceModal
          order={selectedOrder}
          customers={customers}
          services={services}
          products={products}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default OrderServiceList;
