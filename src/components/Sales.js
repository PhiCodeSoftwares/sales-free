import React, { useState, useEffect } from "react";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(5); // Número de vendas por página
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
    setSales(salesHistory);
    setFilteredSales(salesHistory);
  }, []);

  const filterSalesByDate = () => {
    if (!startDate || !endDate) {
      setFilteredSales(sales);
      return;
    }

    const filtered = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        saleDate >= new Date(startDate) &&
        saleDate <= new Date(endDate)
      );
    });

    setFilteredSales(filtered);
    setCurrentPage(1); // Reseta para a primeira página após o filtro
  };

  const handleSaleClick = (sale) => {
    setSelectedSale(sale);
    setShowModal(true);
  };

  const deleteSale = (saleId) => {
    const updatedSales = sales.filter((sale) => sale.id !== saleId);
    setSales(updatedSales);
    setFilteredSales(updatedSales);
    localStorage.setItem("salesHistory", JSON.stringify(updatedSales));
    setShowModal(false);
  };

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const totalPages = Math.ceil(filteredSales.length / salesPerPage);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full h-screen bg-background p-6 text-onBackground">
      <h1 className="text-2xl font-bold mb-4">Histórico de Vendas</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="p-2 border border-secondary rounded bg-background text-onBackground"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border border-secondary rounded bg-background text-onBackground"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-primary text-onPrimary rounded hover:opacity-90"
          onClick={filterSalesByDate}
        >
          Filtrar
        </button>
      </div>

      {/* Lista de Vendas */}
      <div className="bg-background p-4 rounded shadow-md border border-secondary">
        {currentSales.length === 0 ? (
          <p className="text-secondary">Nenhuma venda encontrada</p>
        ) : (
          <ul>
            {currentSales.map((sale) => (
              <li
                key={sale.id}
                className="flex justify-between items-center p-2 border-b border-secondary cursor-pointer hover:bg-primary hover:text-onPrimary"
                onClick={() => handleSaleClick(sale)}
              >
                <div>
                  <p>ID da Venda: {sale.id}</p>
                  <p>Data: {new Date(sale.date).toLocaleString()}</p>
                  <p>Total: R$ {sale.total.toFixed(2)}</p>
                </div>
                <button className="px-3 py-1 bg-secondary text-onSecondary rounded">
                  Ver Detalhes
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Paginação */}
      {filteredSales.length > salesPerPage && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            className="px-3 py-1 bg-secondary text-onSecondary rounded hover:opacity-90"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 ${
                currentPage === i + 1
                  ? "bg-primary text-onPrimary"
                  : "bg-secondary text-onSecondary"
              } rounded hover:opacity-90`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-secondary text-onSecondary rounded hover:opacity-90"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      )}

      {/* Modal de Detalhes da Venda */}
      {showModal && selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full text-onBackground">
            <h2 className="text-xl font-bold mb-4">Detalhes da Venda</h2>
            <p>ID da Venda: {selectedSale.id}</p>
            <p>Data: {new Date(selectedSale.date).toLocaleString()}</p>
            <p>Total: R$ {selectedSale.total.toFixed(2)}</p>
            <ul className="my-4">
              {selectedSale.products.map((product, index) => (
                <li
                  key={index}
                  className="p-2 border-b border-secondary text-sm"
                >
                  {product.name} - Quantidade: {product.quantity} - Preço: R${" "}
                  {product.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-error text-onPrimary rounded hover:opacity-90"
                onClick={() => deleteSale(selectedSale.id)}
              >
                Excluir Venda
              </button>
              <button
                className="px-4 py-2 bg-secondary text-onSecondary rounded hover:opacity-90"
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
