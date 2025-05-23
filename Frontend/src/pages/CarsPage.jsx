import React, { useState } from 'react';
import CarForm from '../components/CarForm';
import CarList from '../components/CarList';
import Navbar from '../components/Navbar';

const CarsPage = () => {

  return (
    <div>
        <Navbar />
      <h2 className="text-2xl w-screen font-semibold mb-6 text-gray-800">Car Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CarForm  
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CarList 
          />
        </div>
      </div>
    </div>
  );
};

export default CarsPage;