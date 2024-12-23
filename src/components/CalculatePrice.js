import React, { useState, useEffect } from "react";
import { calculatePrice } from "../utils/calculateFunctions";

const CalculatePrice = () => {
  const [product, setProduct] = useState({
    name: "",
    purchasePrice: 0,
    taxes: 0,
    profitValue: 0,
    unit: "",
    stock: 0,
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    try {
      const calculatedPrice = calculatePrice(product);
      if (calculatedPrice < 0) {
        throw new Error("Preço negativo detectado. Verifique os valores digitados.");
      }
      setPrice(calculatedPrice);
    } catch (error) {
      setPrice("Erro: " + error.message);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Calcular Preço do Produto</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-lg mb-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.name}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-gray-700">Preço de Compra</label>
          <input
            type="number"
            name="purchasePrice"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.purchasePrice}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-gray-700">Impostos</label>
          <input
            type="number"
            name="taxes"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.taxes}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-gray-700">Margem de Lucro</label>
          <input
            type="number"
            name="profitValue"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.profitValue}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-gray-700">Unidade (kg, ml, etc.)</label>
          <input
            type="text"
            name="unit"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.unit}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
          <input
            type="number"
            name="stock"
            className="w-full p-2 border border-gray-300 rounded"
            value={product.stock}
            onChange={handleChange}
          />

          <div className="mt-4">
            <p className="text-gray-800 font-semibold">Valor do Produto: {typeof price === "string" ? price : `R$ ${price.toFixed(2)}`}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalculatePrice;