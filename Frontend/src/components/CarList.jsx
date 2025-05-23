import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CarList = () => {

    const [cars, setCars] = useState([])

    const fecthCars = async () =>{
        try{

            const res = await axios.get("http://localhost:12345/car/get")
            console.log(res.data)
            setCars(res.data)
        } catch (error){
            console.log("Error while fetching cars. ", error)
        }

    }

    useEffect(() => {
        fecthCars()
    },[])

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-700">Registered Cars</h3>
      {cars.length === 0 ? (
        <p className="text-gray-500">No cars registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Plate</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Size</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Driver</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="hidden py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-900">{car.PlateNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-900">{car.CarType}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-900 capitalize">{car.CarSize}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-900">{car.DriverName}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-900">{car.PhoneNumber}</td>
                  <td className="hidden py-2 px-4 border-b border-gray-200 text-gray-900">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
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

export default CarList;