import React from 'react';

const ServiceList = ({ services, deleteService, setEditingService }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">Service Records</h3>
      {services.length === 0 ? (
        <p className="text-gray-500">No services recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Record #</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Package</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Plate</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b border-gray-200">{service.RecordNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{service.PackageNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{service.PlateNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{service.ServiceDate}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => setEditingService(service)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteService(service.RecordNumber)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceList;