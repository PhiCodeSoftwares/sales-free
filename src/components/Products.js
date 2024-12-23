// Products.js
import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    // Load products from local storage on component mount
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const saveProductsToStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleAddProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    saveProductsToStorage(updatedProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Produtos</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => {
          setShowModal(true);
          setEditProduct(null);
        }}
      >
        Adicionar Produto
      </button>
      <div className="bg-white rounded shadow p-4">
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Estoque</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">R$ {product.price.toFixed(2)}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                    onClick={() => {
                      setEditProduct(product);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            disabled={currentPage === Math.ceil(products.length / ITEMS_PER_PAGE)}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => setShowModal(false)}
          onSave={(newProduct) => {
            if (editProduct) {
              handleUpdateProduct(newProduct);
            } else {
              handleAddProduct(newProduct);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    product || {
      id: Date.now(),
      name: "",
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estoque</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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

export default Products;
