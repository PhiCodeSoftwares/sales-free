import React, { useState, useEffect } from "react";

const PDV = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [foundProduct, setFoundProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const cachedProducts = localStorage.getItem("products");
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() !== "") {
      const matches = products.filter((p) =>
        p.code?.toLowerCase().includes(value.toLowerCase()) ||
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);

      // Se encontrar exatamente um produto pelo código, seleciona automaticamente
      const exactMatch = products.find(p => p.code === value);
      if (exactMatch) {
        handleSuggestionClick(exactMatch);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    if (product.stock <= 0) {
      setAlertMessage("Produto sem estoque disponível!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    setFoundProduct(product);
    setSearch(product.name);
    setSuggestions([]);
  };

  const handleAddProduct = (e) => {
    if (e.key === "Enter" && foundProduct) {
      const requestedQuantity = parseInt(quantity, 10);
      
      // Verifica se já existe o produto na lista
      const existingProductIndex = selectedProducts.findIndex(p => p.id === foundProduct.id);
      
      if (existingProductIndex !== -1) {
        const totalQuantity = selectedProducts[existingProductIndex].quantity + requestedQuantity;
        if (totalQuantity > foundProduct.stock) {
          setAlertMessage(`Estoque insuficiente! Disponível: ${foundProduct.stock}`);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }
        
        const updatedProducts = [...selectedProducts];
        updatedProducts[existingProductIndex].quantity = totalQuantity;
        setSelectedProducts(updatedProducts);
      } else {
        if (requestedQuantity > foundProduct.stock) {
          setAlertMessage(`Estoque insuficiente! Disponível: ${foundProduct.stock}`);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }
        
        setSelectedProducts((prev) => [
          ...prev,
          { ...foundProduct, quantity: requestedQuantity },
        ]);
      }

      setFoundProduct(null);
      setSearch("");
      setQuantity(1);
      setSuggestions([]);
    }
  };

  const removeFromSale = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStock = () => {
    const updatedProducts = products.map(product => {
      const soldProduct = selectedProducts.find(p => p.id === product.id);
      if (soldProduct) {
        return {
          ...product,
          stock: product.stock - soldProduct.quantity
        };
      }
      return product;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const finalizeSale = () => {
    const saleData = {
      id: Date.now(),
      date: new Date().toISOString(),
      products: selectedProducts,
      total: selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      ),
    };

    // Atualiza histórico de vendas
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    salesHistory.push(saleData);
    localStorage.setItem("salesHistory", JSON.stringify(salesHistory));

    // Atualiza estoque
    updateStock();

    setShowConfirmDialog(false);
    setSelectedProducts([]);
    alert("Venda finalizada com sucesso!");
  };

   // Componente de Modal simplificado com as cores atualizadas
   const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full text-onBackground">
          <h2 className="text-xl font-bold mb-4">Confirmar Venda</h2>
          <p className="mb-6">Tem certeza que deseja finalizar esta venda? O estoque será atualizado automaticamente.</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-secondary text-onSecondary rounded hover:opacity-90"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-primary text-onPrimary rounded hover:opacity-90"
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full h-screen bg-background">
      <div className="w-1/2 p-6 bg-background shadow-lg text-onBackground">
        <h1 className="text-2xl font-bold mb-4">PDV - Busca de Produto</h1>

        <div className="relative flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Digite o código ou nome do produto"
            className="flex-grow p-2 border border-secondary rounded bg-background text-onBackground"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleAddProduct}
            autoFocus
          />
          <input
            type="number"
            min="1"
            className="w-20 p-2 border border-secondary rounded bg-background text-onBackground"
            placeholder="Qtd"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onKeyDown={handleAddProduct}
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-background border border-secondary rounded shadow-md mt-2 z-10">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-primary hover:text-onPrimary cursor-pointer border-b border-secondary"
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.code && <span className="font-mono">{product.code} - </span>}
                  {product.name} - R$ {product.price.toFixed(2)}
                  <span className="text-sm text-secondary ml-2">(Estoque: {product.stock})</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {foundProduct && (
          <div className="mt-6 bg-primary bg-opacity-20 p-4 rounded shadow-md text-lg">
            <h2 className="font-semibold">
              {foundProduct.code && <span className="font-mono">{foundProduct.code} - </span>}
              {foundProduct.name}
            </h2>
            <p className="text-secondary">Preço: R$ {foundProduct.price.toFixed(2)}</p>
            <p className="text-secondary">Estoque disponível: {foundProduct.stock}</p>
          </div>
        )}

        {showAlert && (
          <div className="mt-4 p-4 bg-error bg-opacity-20 border-l-4 border-error text-onBackground">
            {alertMessage}
          </div>
        )}
      </div>

      <div className="w-1/2 p-6 bg-background bg-opacity-95">
        <h1 className="text-2xl font-bold text-onBackground mb-4">Produtos na Venda</h1>

        <div className="bg-background p-4 rounded shadow-md border border-secondary">
          {selectedProducts.length === 0 ? (
            <p className="text-secondary">Nenhum produto adicionado</p>
          ) : (
            <div>
              <ul className="mb-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {selectedProducts.map((product, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-secondary"
                  >
                    <div>
                      <p className="font-semibold">
                        {product.code && <span className="font-mono">{product.code} - </span>}
                        {product.name}
                      </p>
                      <p className="text-secondary">
                        Quantidade: {product.quantity} | Preço Unitário: R$ {product.price.toFixed(2)}
                      </p>
                      <p className="font-bold">
                        Total: R$ {(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="bg-error text-onPrimary px-3 py-1 rounded hover:opacity-90"
                      onClick={() => removeFromSale(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center font-bold border-t border-secondary pt-4">
                <p>Total de Itens: {selectedProducts.length}</p>
                <p>
                  Total: R${" "}
                  {selectedProducts
                    .reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <button
                className="mt-4 w-full bg-primary text-onPrimary py-2 rounded hover:opacity-90"
                onClick={() => setShowConfirmDialog(true)}
              >
                Finalizar Venda (F5)
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={finalizeSale}
      />
    </div>
  );
};

export default PDV;