import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CarForm = ({ addCar, editingCar, setEditingCar }) => {
  const [car, setCar] = useState({
    PlateNumber: '',
    CarType: '',
    CarSize: 'medium',
    DriverName: '',
    PhoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:12345/car", car)
        setCar({
            PlateNumber: "",
            CarType: "",
            CarSize: "medium",
            DriverName: "",
            PhoneNumber: ""
        })
        alert(res.data.message)
    } catch (error){
        console.log("Error while trying to add new car. ",error)
    }
  };

  const handleCancel = () => {
    setEditingCar(null);
    setCar({
      PlateNumber: '',
      CarType: '',
      CarSize: 'medium',
      DriverName: '',
      PhoneNumber: ''
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        {editingCar ? 'Edit Car' : 'Add New Car'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PlateNumber">
            Plate Number
          </label>
          <input
            type="text"
            id="PlateNumber"
            name="PlateNumber"
            value={car.PlateNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CarType">
            Car Type
          </label>
          <input
            type="text"
            id="CarType"
            name="CarType"
            value={car.CarType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CarSize">
            Car Size
          </label>
          <select
            id="CarSize"
            name="CarSize"
            value={car.CarSize}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DriverName">
            Driver Name
          </label>
          <input
            type="text"
            id="DriverName"
            name="DriverName"
            value={car.DriverName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PhoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="PhoneNumber"
            name="PhoneNumber"
            value={car.PhoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingCar ? 'Update Car' : 'Add Car'}
          </button>
          {editingCar && (
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

export default CarForm;