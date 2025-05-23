import React from 'react';
import Report from '../components/Report';
import Navbar from '../components/Navbar';

const ReportsPage = ({ cars, services, payments }) => {
  return (
    <div>
        <Navbar />
      <h2 className="text-2xl w-screen font-semibold mb-6 text-gray-800">System Reports</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Report />
      </div>
    </div>
  );
};

export default ReportsPage;