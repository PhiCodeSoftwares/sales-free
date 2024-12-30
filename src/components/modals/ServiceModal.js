import { useState, useEffect } from "react";
import TextInput from "../widgets/TextInput";
import { calculatePrice, calculateProfitMargin } from "../../utils/calculateFunctions";

const ServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    service || {
      id: Date.now(),
      code: "",
      name: "",
      cost_price: 0,
      tax: 0,
      profit_margin: 0,
      price: 0,
    }
  );

  const [lastEditedField, setLastEditedField] = useState("");

  useEffect(() => {
    if (lastEditedField === "profit_margin") {
      // Recalcula o preço baseado na margem
      const calculatedPrice = calculatePrice({
        purchasePrice: parseFloat(formData.cost_price),
        taxes: parseFloat(formData.tax),
        profitValue: parseFloat(formData.profit_margin),
      });
      setFormData((prev) => ({ ...prev, price: calculatedPrice.toFixed(2) }));
    } else if (lastEditedField === "price") {
      // Recalcula a margem baseado no preço
      const costPrice = parseFloat(formData.cost_price) + parseFloat(formData.tax);
      const profitMargin = calculateProfitMargin(costPrice, parseFloat(formData.price));
      setFormData((prev) => ({ ...prev, profit_margin: profitMargin.toFixed(2) }));
    }
  }, [formData.cost_price, formData.tax, formData.profit_margin, formData.price, lastEditedField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "profit_margin" || name === "price") {
      setLastEditedField(name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      cost_price: parseFloat(formData.cost_price),
      tax: parseFloat(formData.tax),
      profit_margin: parseFloat(formData.profit_margin),
      price: parseFloat(formData.price),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {service ? "Editar Serviço" : "Adicionar Serviço"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label={"Código"}
            type={"text"}
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <TextInput
            label={"Nome"}
            type={"text"}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextInput
            label={"Preço de Custo"}
            type={"number"}
            name="cost_price"
            value={formData.cost_price}
            onChange={handleChange}
            required
          />

          <TextInput
            label={"Impostos"}
            type={"number"}
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            required
          />

          <TextInput
            label={"Margem de Lucro (%)"}
            type={"number"}
            name="profit_margin"
            value={formData.profit_margin}
            onChange={handleChange}
            required
          />

          <TextInput
            label={"Preço de Venda"}
            type={"number"}
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;