import React, { useState } from 'react';
import ServiceForm from '../components/ServiceForm';
import ServiceList from '../components/ServiceList';
import Navbar from '../components/Navbar';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  const addService = (service) => {
    if (editingService) {
      setServices(services.map(s => s.RecordNumber === editingService.RecordNumber ? service : s));
      setEditingService(null);
    } else {
      setServices([...services, { ...service, RecordNumber: Date.now().toString() }]);
    }
  };

  const deleteService = (recordNumber) => {
    setServices(services.filter(service => service.RecordNumber !== recordNumber));
  };

  return (
    <div><Navbar />
      <h2 className="text-2xl w-screen font-semibold mb-6 text-gray-800">Service Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ServiceForm 
            addService={addService} 
            editingService={editingService} 
            setEditingService={setEditingService} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ServiceList 
            services={services} 
            deleteService={deleteService} 
            setEditingService={setEditingService} 
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;