import axios from "axios";
import React, { useState, useEffect } from "react";

const ServiceForm = () => {
  const [service, setService] = useState({
    DriverName: "",
    PhoneNumber: "",
    PlateNumber: "",
    SlotStatus: "available"
  });
  const [editingService, setEditingService] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(service.DriverName, service.PhoneNumber, service.PlateNumber, service.SlotStatus)
    try {
      const res = await axios.post(
        "http://localhost:12345/api/slots/create",
        service
      );
      console.log(res.data.message);
    } catch (error) {
      console.log("Error while trying to send service data to server. ", error);
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    setService({
      PackageNumber: "",
      PlateNumber: "",
      ServiceDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        {editingService ? "Edit Parking" : "Serve Parking"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PackageNumber"
          >
            Driver Name
          </label>
          <input
            type="text"
            id="DriverName"
            name="DriverName"
            value={service.DriverName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PackageNumber"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="PhoneNumber"
            name="PhoneNumber"
            value={service.PhoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PlateNumber"
          >
            Plate Number
          </label>
          <input
            type="text"
            id="PlateNumber"
            name="PlateNumber"
            value={service.PlateNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="CarSize"
          >
            Slot Status
          </label>
          <select
            id="SlotStatus"
            name="SlotStatus"
            value={service.SlotStatus}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="occupied">Occupied</option>
            <option value="available">Available</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingService ? "Update Service" : "Add Service"}
          </button>
          {editingService && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
