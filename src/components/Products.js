import React, { useState, useEffect } from "react";
import ProductModal from "./modals/ProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
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
        className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-primary mb-4"
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
                    className="bg-warning text-onBackground px-2 py-1 rounded hover:bg-opacity-80 mr-2"
                    onClick={() => {
                      setEditProduct(product);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-error text-onBackground px-2 py-1 rounded hover:bg-opacity-80"
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

export default Products;
