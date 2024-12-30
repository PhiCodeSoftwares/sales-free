import { useState } from "react";
import TextInput from "../widgets/TextInput";

const CustomerModal = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    customer || {
      id: Date.now(),
      name: "",
      birthDate: "",
      cep: "",
      state: "",
      city: "",
      country: "",
      address: "",
      complement: "",
      phone1: "",
      phone2: "",
      gender: "",
      occupation: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone1) {
      alert("Os campos Nome e Telefone 1 são obrigatórios.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          {customer ? "Editar Cliente" : "Adicionar Cliente"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Nome"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Data de Nascimento"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
            <TextInput
              label="CEP"
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />
            <TextInput
              label="Estado"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <TextInput
              label="Cidade"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <TextInput
              label="País"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <TextInput
              label="Endereço"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextInput
              label="Complemento"
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
            />
            <TextInput
              label="Telefone 1"
              type="text"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Telefone 2"
              type="text"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
            />
            <TextInput
              label="Gênero"
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextInput
              label="Ocupação"
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="bg-error text-white px-4 py-2 rounded hover:opacity-60"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:opacity-60"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
