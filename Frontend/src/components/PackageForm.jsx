import axios from "axios";
import React, { useState, useEffect } from "react";

const PackageForm = () => {
  const [service, setService] = useState({
    platenumber: "",
    entrytime: "",
    exittime: "",
  });
  
  const [ editingService, setEditingService] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:12345/api/records/create",
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
      platenumber: "",
      entrytime: "",
      exittime: "",
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        {editingService ? "Edit Service" : "Place Parking Record"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PackageNumber"
          >
            Plate Number
          </label>
          <input
            type="text"
            id="platenumber"
            name="platenumber"
            value={service.platenumber}
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
            Entry Time
          </label>
          <input
            type="date"
            id="entrytime"
            name="entrytime"
            value={service.entrytime}
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
            Exit Time
          </label>
          <input
            type="date"
            id="exittime"
            name="exittime"
            value={service.exittime}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingService ? "Update Package" : "Record parking"}
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

export default PackageForm;
