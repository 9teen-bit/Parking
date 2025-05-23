import React from "react";
import {
  Link
} from "react-router-dom";


// Navbar Component
const Navbar = () => {
  const navItems = [
    { path: "/parking", label: "Parking", icon: "fas fa-concierge-bell" },
    { path: "/packages", label: "Parking Records", icon: "fas fa-box" },
    { path: "/payments", label: "Payments", icon: "fas fa-money-bill-wave" },
    { path: "/reports", label: "Reports", icon: "fas fa-chart-bar" },
    { path: "/login", label: "Logout", icon: "fas fa-chart-bar" },
  ];

  return (
    <nav className="bg-blue-600 fixed left-0 top-0 w-screen text-white shadow-lg">
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">SmartPark</h1>
          <div className="flex space-x-4 text-white">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white px-3 py-2 rounded-md hover:bg-blue-700"
              >
                <i className={`${item.icon} mr-2`}></i>
                <span className="text-white">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar