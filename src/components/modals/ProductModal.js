import { useState } from "react";
import TextInput from "../widgets/TextInput";

const ProductModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState(
      product || {
        id: Date.now(),
        code: "",
        name: "",
        cost_price: 0,
        tax: 0,
        profit_margin: 0,
        price: 0,
        stock: 0,
      }
    );
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) });
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            {product ? "Editar Produto" : "Adicionar Produto"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                label={"Código"}
                type={"text"}
                value={formData.name}
                onChange={handleChange}
                required />

            <TextInput
                label={"Nome"}
                type={"text"}
                value={formData.name}
                onChange={handleChange}
                required />
            
            <TextInput
                label={"Preço de custo"}
                type={"text"}
                value={formData.price}
                onChange={handleChange}
                required />
            
            <TextInput
                label={"Impostos"}
                type={"text"}
                value={formData.tax}
                onChange={handleChange}
                required />

            <TextInput
                label={"Margem de Lucro"}
                type={"text"}
                value={formData.profit_margin}
                onChange={handleChange}
                required />

            <TextInput
                label={"Estoque"}
                type={"text"}
                value={formData.stock}
                onChange={handleChange}
                required />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray text-white px-4 py-2 rounded hover:bg-opacity-80"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default ProductModal;