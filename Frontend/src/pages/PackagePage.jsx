import React, { useState } from 'react';
import ServiceForm from '../components/ServiceForm';
import ServiceList from '../components/ServiceList';
import PackageForm from '../components/PackageForm';
import PackageList from '../components/PackageList';
import Navbar from '../components/Navbar';

const PackagePage = () => {

  return (
    <div>
        <Navbar />
      <h2 className="text-2xl w-screen font-semibold mb-6 text-gray-800">Service Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PackageForm />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PackageList />
        </div>
      </div>
    </div>
  );
};

export default PackagePage;