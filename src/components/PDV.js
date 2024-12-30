import React, { useState, useEffect } from "react";

const PDV = () => {
  const [products, setProducts] = useState([]); // Produtos no cache
  const [search, setSearch] = useState(""); // Campo de busca
  const [quantity, setQuantity] = useState(1); // Campo de quantidade
  const [foundProduct, setFoundProduct] = useState(null); // Produto selecionado
  const [suggestions, setSuggestions] = useState([]); // Sugestões de busca
  const [selectedProducts, setSelectedProducts] = useState([]); // Produtos da venda

  // Carregar produtos do cache ao inicializar
  useEffect(() => {
    const cachedProducts = localStorage.getItem("products");
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    }
  }, []);

  // Atualizar sugestões conforme o usuário digita
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() !== "") {
      const matches = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  // Selecionar produto da lista de sugestões
  const handleSuggestionClick = (product) => {
    setFoundProduct(product);
    setSearch(product.name);
    setSuggestions([]);
  };

  // Adicionar produto à lista de vendas ao pressionar Enter
  const handleAddProduct = (e) => {
    if (e.key === "Enter" && foundProduct) {
      setSelectedProducts((prev) => [
        ...prev,
        { ...foundProduct, quantity: parseInt(quantity, 10) },
      ]);
      setFoundProduct(null);
      setSearch("");
      setQuantity(1);
      setSuggestions([]);
    }
  };

  // Remover produto da lista de venda
  const removeFromSale = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Finalizar venda e salvar no histórico
  const finalizeSale = () => {
    const saleData = {
      date: new Date().toISOString(),
      products: selectedProducts,
      total: selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      ),
    };

    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    salesHistory.push(saleData);
    localStorage.setItem("salesHistory", JSON.stringify(salesHistory));

    alert("Venda finalizada com sucesso!");
    setSelectedProducts([]);
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Lado esquerdo: Busca, quantidade e detalhes do produto */}
      <div className="w-1/2 p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">PDV - Busca de Produto</h1>

        <div className="relative flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Digite o nome do produto"
            className="flex-grow p-2 border border-gray-300 rounded"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleAddProduct}
          />
          <input
            type="number"
            min="1"
            className="w-20 p-2 border border-gray-300 rounded"
            placeholder="Qtd"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyDown={handleAddProduct}
          />
          {/* Sugestões de busca */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-2 z-10">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.name} - R$ {product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {foundProduct ? (
          <div className="mt-6 bg-blue-100 p-4 rounded shadow-md text-lg">
            <h2 className="font-semibold text-gray-700">{foundProduct.name}</h2>
            <p className="text-gray-600">Preço: R$ {foundProduct.price.toFixed(2)}</p>
          </div>
        ) : (
          <p className="text-gray-500">Nenhum produto selecionado</p>
        )}
      </div>

      {/* Lado direito: Lista de produtos adicionados */}
      <div className="w-1/2 p-6 bg-gray-200">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Produtos na Venda</h1>

        <div className="bg-white p-4 rounded shadow-md">
          {selectedProducts.length === 0 ? (
            <p className="text-gray-500">Nenhum produto adicionado</p>
          ) : (
            <div>
              <ul className="mb-4">
                {selectedProducts.map((product, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-gray-300"
                  >
                    <div>
                      <p className="text-gray-700 font-semibold">{product.name}</p>
                      <p className="text-gray-500">
                        Quantidade: {product.quantity} | Preço Unitário: R$ {product.price.toFixed(2)}
                      </p>
                      <p className="text-gray-700 font-bold">
                        Total: R$ {(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="bg-error text-white px-3 py-1 rounded hover:bg-error hover:opacity-60"
                      onClick={() => removeFromSale(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center font-bold text-gray-700">
                <p>Total de Itens: {selectedProducts.length}</p>
                <p>
                  Subtotal: R${" "}
                  {selectedProducts
                    .reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <button
                className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary hover:opacity-60"
                onClick={finalizeSale}
              >
                Finalizar Venda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDV;
