import React, { useState, useEffect } from "react";
import TextInput from "../widgets/TextInput";

const OrderServiceModal = ({ order, customers, services, products, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    order || {
      id: Date.now(),
      requestDateTime: new Date().toISOString().slice(0, 16),
      executionDateTime: "",
      observations: "",
      postOrderObservations: "",
      customer: "",
      selectedServices: [],
      selectedProducts: [],
      totalValue: 0,
    }
  );
  const [customerSearch, setCustomerSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const servicesTotal = formData.selectedServices.reduce(
      (total, item) => total + item.service.price * item.quantity,
      0
    );
    const productsTotal = formData.selectedProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setFormData((prev) => ({
      ...prev,
      totalValue: (servicesTotal + productsTotal).toFixed(2),
    }));
  }, [formData.selectedServices, formData.selectedProducts]);

  useEffect(() => {
    setFilteredCustomers(
      customerSearch.trim()
        ? customers.filter((customer) =>
            customer.name.toLowerCase().includes(customerSearch.toLowerCase())
          )
        : []
    );
  }, [customerSearch, customers]);

  useEffect(() => {
    setFilteredServices(
      serviceSearch.trim()
        ? services.filter((service) =>
            service.name.toLowerCase().includes(serviceSearch.toLowerCase())
          )
        : []
    );
  }, [serviceSearch, services]);

  useEffect(() => {
    setFilteredProducts(
      productSearch.trim()
        ? products.filter((product) =>
            product.name.toLowerCase().includes(productSearch.toLowerCase())
          )
        : []
    );
  }, [productSearch, products]);

  const handleCustomerSelect = (customer) => {
    setCustomerSearch(customer.name);
    setFormData((prev) => ({ ...prev, customer: customer.name }));
    setFilteredCustomers([]);
  };

  const handleAddService = (service) => {
    const updatedServices = [...formData.selectedServices];
    const existingIndex = updatedServices.findIndex((item) => item.service.id === service.id);
    if (existingIndex >= 0) {
      updatedServices[existingIndex].quantity += quantity;
    } else {
      updatedServices.push({ service, quantity });
    }
    setFormData((prev) => ({ ...prev, selectedServices: updatedServices }));
    setServiceModalOpen(false);
  };

  const handleAddProduct = (product) => {
    const updatedProducts = [...formData.selectedProducts];
    const existingIndex = updatedProducts.findIndex((item) => item.product.id === product.id);
    if (existingIndex >= 0) {
      updatedProducts[existingIndex].quantity += quantity;
    } else {
      updatedProducts.push({ product, quantity });
    }
    setFormData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
    setProductModalOpen(false);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...formData.selectedServices];
    updatedServices.splice(index, 1);
    setFormData((prev) => ({ ...prev, selectedServices: updatedServices }));
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...formData.selectedProducts];
    updatedProducts.splice(index, 1);
    setFormData((prev) => ({ ...prev, selectedProducts: updatedProducts }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer) {
      alert("Selecione um cliente.");
      return;
    }

    console.log("MODAL = ", formData);

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-dark p-6 rounded shadow-md w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          {order ? "Editar Ordem de Serviço" : "Nova Ordem de Serviço"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Data/Hora da Solicitação"
              type="datetime-local"
              name="requestDateTime"
              value={formData.requestDateTime}
              onChange={(e) =>
                setFormData({ ...formData, requestDateTime: e.target.value })
              }
              required
            />
            <TextInput
              label="Data/Hora da Execução"
              type="datetime-local"
              name="executionDateTime"
              value={formData.executionDateTime}
              onChange={(e) =>
                setFormData({ ...formData, executionDateTime: e.target.value })
              }
            />
            <div className="relative">
              <TextInput
                label="Cliente"
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Digite o nome do cliente"
                required
              />
              {filteredCustomers.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto">
                  {filteredCustomers.map((customer) => (
                    <li
                      key={customer.id}
                      className="p-2 hover:bg-primary hover:text-onPrimary cursor-pointer"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      {customer.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Serviços */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Serviços</h3>
            <button
              type="button"
              className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-success"
              onClick={() => setServiceModalOpen(true)}
            >
              Procurar Serviço
            </button>
            {formData.selectedServices.length > 0 ? (
              <ul className="space-y-2">
                {formData.selectedServices.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {item.service.name} - {item.quantity}x
                    </span>
                    <span>R$ {(item.service.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="bg-error text-onPrimary px-2 py-1 rounded hover:bg-dark"
                      onClick={() => handleRemoveService(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary">Nenhum serviço adicionado</p>
            )}
          </div>

          {/* Produtos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Produtos</h3>
            <button
              type="button"
              className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-success"
              onClick={() => setProductModalOpen(true)}
            >
              Procurar Produto
            </button>
            {formData.selectedProducts.length > 0 ? (
              <ul className="space-y-2">
                {formData.selectedProducts.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {item.product.name} - {item.quantity}x
                    </span>
                    <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                    <button
                      className="bg-error text-onPrimary px-2 py-1 rounded hover:bg-dark"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary">Nenhum produto adicionado</p>
            )}
          </div>

          <TextInput
            label="Observações"
            type="text"
            name="observations"
            value={formData.observations}
            onChange={(e) =>
              setFormData({ ...formData, observations: e.target.value })
            }
          />
          <TextInput
            label="Observações Pós Ordem"
            type="text"
            name="postOrderObservations"
            value={formData.postOrderObservations}
            onChange={(e) =>
              setFormData({ ...formData, postOrderObservations: e.target.value })
            }
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-primary">
              Total: R$ {formData.totalValue}
            </span>
            <div className="flex space-x-2">
              <button
                type="button"
                className="bg-error text-white px-4 py-2 rounded hover:bg-dark"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-success"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>

      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-4">Procurar Serviço</h3>
            <TextInput
              label="Buscar Serviço"
              type="text"
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
            />
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{service.name} - R$ {service.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-2">
                      <TextInput
                        label="Quantidade"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                      <button
                        className="bg-primary text-onPrimary px-2 py-1 rounded"
                        onClick={() => handleAddService(service)}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-secondary">Nenhum serviço encontrado</p>
              )}
            </div>
            <button
              className="mt-4 bg-error text-white px-4 py-2 rounded"
              onClick={() => setServiceModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-4">Procurar Produto</h3>
            <TextInput
              label="Buscar Produto"
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <div className="mt-4 max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span>{product.name} - R$ {product.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-2">
                      <TextInput
                        label="Quantidade"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                      <button
                        className="bg-primary text-onPrimary px-2 py-1 rounded"
                        onClick={() => handleAddProduct(product)}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-secondary">Nenhum produto encontrado</p>
              )}
            </div>
            <button
              className="mt-4 bg-error text-white px-4 py-2 rounded"
              onClick={() => setProductModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderServiceModal;
