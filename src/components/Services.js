import React, { useState, useEffect } from "react";
import ServiceModal from "./modals/ServiceModal";

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    const cachedServices = localStorage.getItem("services");
    if (cachedServices) {
      setServices(JSON.parse(cachedServices));
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("services", JSON.stringify(services));
    }
  }, [services, isInitialLoad]);

  const saveServicesToStorage = (updatedServices) => {
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const handleAddService = (service) => {
    const updatedServices = [...services, service];
    setServices(updatedServices);
    saveServicesToStorage(updatedServices);
  };

  const handleUpdateService = (updatedService) => {
    const updatedServices = services.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );
    setServices(updatedServices);
    saveServicesToStorage(updatedServices);
  };

  const handleDeleteService = (serviceId) => {
    const updatedServices = services.filter((service) => service.id !== serviceId);
    setServices(updatedServices);
    saveServicesToStorage(updatedServices);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedServices = services.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Serviços</h1>
      <button
        className="bg-primary text-onPrimary px-4 py-2 rounded hover:bg-primary mb-4"
        onClick={() => {
          setShowModal(true);
          setEditService(null);
        }}
      >
        Adicionar Serviço
      </button>

      <div className="bg-white rounded shadow p-4">
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedServices.map((service) => (
              <tr key={service.id} className="border-t">
                <td className="px-4 py-2">{service.name}</td>
                <td className="px-4 py-2">R$ {service.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-warning text-onBackground px-2 py-1 rounded hover:bg-opacity-80 mr-2"
                    onClick={() => {
                      setEditService(service);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-error text-onBackground px-2 py-1 rounded hover:bg-opacity-80"
                    onClick={() => handleDeleteService(service.id)}
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
            disabled={currentPage === Math.ceil(services.length / ITEMS_PER_PAGE)}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>

      {showModal && (
        <ServiceModal
          service={editService}
          onClose={() => setShowModal(false)}
          onSave={(newService) => {
            if (editService) {
              handleUpdateService(newService);
            } else {
              handleAddService(newService);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Services;
