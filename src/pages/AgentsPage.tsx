
import React from 'react';
import { Link } from 'react-router-dom';

const AgentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">LuxEstate</Link>
            <div className="flex items-center space-x-8">
              <Link to="/properties" className="text-gray-700 hover:text-gray-900">Properties</Link>
              <Link to="/agents" className="text-blue-600 font-medium">Agents</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Agents</h1>
        <p className="text-gray-600">Agent directory will be implemented here.</p>
      </div>
    </div>
  );
};

export default AgentsPage;
