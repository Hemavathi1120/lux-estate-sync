
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/property/property-card';
import PropertyFilters from '@/components/property/property-filters';
import { useFirestore } from '@/hooks/useFirestore';
import { Property } from '@/types';
import { orderBy } from 'firebase/firestore';

const PropertiesPage = () => {
  const [filters, setFilters] = useState({});
  const { data: properties, loading } = useFirestore<Property>('properties', [
    orderBy('createdAt', 'desc')
  ]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleFavorite = (propertyId: string) => {
    console.log('Toggle favorite for property:', propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">LuxEstate</Link>
            <div className="flex items-center space-x-8">
              <Link to="/properties" className="text-blue-600 font-medium">Properties</Link>
              <Link to="/agents" className="text-gray-700 hover:text-gray-900">Agents</Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-xl opacity-90">Discover luxury homes in the world's most desirable locations</p>
        </div>
      </section>

      {/* Filters and Properties */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <PropertyFilters onFiltersChange={handleFiltersChange} />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard
                    property={property}
                    onFavorite={handleFavorite}
                    isFavorited={false}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
