import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  
  const isAtAdminRoot = location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="flex min-h-screen bg-gray-100">

  
      <aside className="w-1/4 bg-green-500 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>

        <ul className="space-y-4">

          <li className="p-2 rounded hover:bg-green-600">
            <Link to="/admin/latest/show/:id">Latest Products</Link>
          </li>

          <li className="p-2 rounded hover:bg-green-600">
            <Link to="/admin/collection/showc">Collections</Link>
          </li>

          <li className="p-2 rounded hover:bg-green-600">
            <Link to="/admin/careers/showk">Careers / Vacancies</Link>
          </li>

          <li className="p-2 rounded hover:bg-green-600">
            <Link to="/newsletterlist">Newsletter</Link>
          </li>

        </ul>
      </aside>

      
      <main className="w-3/4 p-8">
        
        <h1 className="text-2xl text-orange-500 text-center">Welcome To Your Admin Dashboard Sir/Madam</h1>
        <p className="mb-4 text-green-300 text-lg text-center">Power is In Your Hands Dear Admin</p>

        
  
      </main>

    </div>
  );
};

export default Dashboard;
