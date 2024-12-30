import { useState } from "react";
import OrderServiceModal from "./modals/OrderServiceModal";

const OrderServiceList = ({ orders, customers, services, products, onSave, onDelete }) => {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta ordem de serviço?")) {
      onDelete(id);
    }
  };

  const handleAddNew = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleSave = (order) => {
    onSave(order);
    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search)
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddNew}
        >
          Nova OS
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="border rounded w-full p-2"
          placeholder="Buscar por cliente ou ID"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Cliente</th>
            <th className="text-left px-4 py-2">Data da Solicitação</th>
            <th className="text-left px-4 py-2">Data da Execução</th>
            <th className="text-left px-4 py-2">Valor Total</th>
            <th className="text-center px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer.name}</td>
                <td className="px-4 py-2">{order.requestDateTime}</td>
                <td className="px-4 py-2">
                  {order.executionDateTime || "Não definida"}
                </td>
                <td className="px-4 py-2">R$ {parseFloat(order.totalValue).toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mx-1"
                    onClick={() => handleEdit(order)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mx-1"
                    onClick={() => handleDelete(order.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center px-4 py-2">
                Nenhuma ordem de serviço encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
