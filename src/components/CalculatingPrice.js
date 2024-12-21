import React, { useState } from "react";

const CalculatePrice = () => {
  const [product, setProduct] = useState({
    name: "",
    purchasePrice: 0,
    taxes: 0,
    pricingType: "margin",
    pricingValue: 0,
    unit: "",
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleReset = () => {
    setProduct({
      name: "",
      purchasePrice: 0,
      taxes: 0,
      pricingType: "margin",
      pricingValue: 0,
      unit: "",
      stock: 0,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Calcular Preço do Produto</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome do Produto"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="purchasePrice"
            placeholder="Preço de Compra"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.purchasePrice}
            onChange={handleChange}
          />
          <input
            type="number"
            name="taxes"
            placeholder="Impostos"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.taxes}
            onChange={handleChange}
          />
          <select
            name="pricingType"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.pricingType}
            onChange={handleChange}
          >
            <option value="margin">Margem</option>
            <option value="markup">Markup</option>
          </select>
          <input
            type="number"
            name="pricingValue"
            placeholder="Valor do Tipo de Precificação"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.pricingValue}
            onChange={handleChange}
          />
          <input
            type="text"
            name="unit"
            placeholder="Unidade (kg, ml, etc.)"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.unit}
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Quantidade em Estoque"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.stock}
            onChange={handleChange}
          />
          <button
            type="button"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={handleReset}
          >
            Resetar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatePrice;