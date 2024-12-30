import { useState, useEffect } from "react";
import TextInput from "../widgets/TextInput";
import SelectInput from "../widgets/SelectInput";

const OrderServiceModal = ({ order, customers, services, products, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    order || {
      id: Date.now(),
      requestDateTime: new Date().toISOString().slice(0, 16), // Padrão ISO para datetime-local
      executionDateTime: "",
      observations: "",
      postOrderObservations: "",
      customer: "",
      selectedServices: [],
      selectedProducts: [],
      totalValue: 0,
    }
  );

  const [serviceInput, setServiceInput] = useState({ service: "", quantity: 1 });
  const [productInput, setProductInput] = useState({ product: "", quantity: 1 });

  // Recalcular o valor total ao adicionar/remover produtos ou serviços
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddService = () => {
    const service = services.find((s) => s.id === parseInt(serviceInput.service));
    if (service) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: [...prev.selectedServices, { service, quantity: serviceInput.quantity }],
      }));
      setServiceInput({ service: "", quantity: 1 });
    }
  };

  const handleAddProduct = () => {
    const product = products.find((p) => p.id === parseInt(productInput.product));
    if (product) {
      setFormData((prev) => ({
        ...prev,
        selectedProducts: [...prev.selectedProducts, { product, quantity: productInput.quantity }],
      }));
      setProductInput({ product: "", quantity: 1 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer) {
      alert("Selecione um cliente.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">
          {order ? "Editar Ordem de Serviço" : "Nova Ordem de Serviço"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dados da Ordem de Serviço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Data/Hora da Solicitação"
              type="datetime-local"
              name="requestDateTime"
              value={formData.requestDateTime}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Data/Hora da Execução"
              type="datetime-local"
              name="executionDateTime"
              value={formData.executionDateTime}
              onChange={handleChange}
            />
            <SelectInput
              label="Cliente"
              name="customer"
              value={formData.customer}
              options={customers.map((c) => ({ value: c.id, label: c.name }))}
              onChange={handleChange}
              required
            />
          </div>

          {/* Adicionar Serviços */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label="Serviço"
                name="service"
                value={serviceInput.service}
                options={services.map((s) => ({ value: s.id, label: s.name }))}
                onChange={(e) =>
                  setServiceInput((prev) => ({ ...prev, service: e.target.value }))
                }
              />
              <TextInput
                label="Quantidade"
                type="number"
                name="quantity"
                value={serviceInput.quantity}
                onChange={(e) =>
                  setServiceInput((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))
                }
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAddService}
              >
                Adicionar Serviço
              </button>
            </div>
            <div>
              {formData.selectedServices.length > 0 && (
                <table className="w-full mt-4 border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th>Serviço</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.selectedServices.map((item, index) => (
                      <tr key={index}>
                        <td>{item.service.name}</td>
                        <td>R$ {item.service.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Adicionar Produtos */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Produtos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectInput
                label="Produto"
                name="product"
                value={productInput.product}
                options={products.map((p) => ({ value: p.id, label: p.name }))}
                onChange={(e) =>
                  setProductInput((prev) => ({ ...prev, product: e.target.value }))
                }
              />
              <TextInput
                label="Quantidade"
                type="number"
                name="quantity"
                value={productInput.quantity}
                onChange={(e) =>
                  setProductInput((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))
                }
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleAddProduct}
              >
                Adicionar Produto
              </button>
            </div>
            <div>
              {formData.selectedProducts.length > 0 && (
                <table className="w-full mt-4 border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th>Produto</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.selectedProducts.map((item, index) => (
                      <tr key={index}>
                        <td>{item.product.name}</td>
                        <td>R$ {item.product.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Observações */}
          <TextInput
            label="Observações"
            type="text"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
          />
          <TextInput
            label="Observações Pós Ordem"
            type="text"
            name="postOrderObservations"
            value={formData.postOrderObservations}
            onChange={handleChange}
          />

          {/* Valor Total e Botões */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Total: R$ {formData.totalValue}</span>
            <div className="flex space-x-2">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderServiceModal;