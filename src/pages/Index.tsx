
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroVideo from '@/components/ui/hero-video';
import PropertyCard from '@/components/property/property-card';
import PropertyFilters from '@/components/property/property-filters';
import MortgageCalculator from '@/components/mortgage/mortgage-calculator';
import AdminLayout from '@/components/admin/admin-layout';
import { useFirestore } from '@/hooks/useFirestore';
import { Property } from '@/types';
import { orderBy, where, limit } from 'firebase/firestore';

const Index = () => {
  const [activeView, setActiveView] = useState('user');
  const [filters, setFilters] = useState({});
  
  // Fetch properties from Firestore
  const { data: properties, loading } = useFirestore<Property>('properties', [
    orderBy('createdAt', 'desc'),
    limit(12)
  ]);

  const { data: featuredProperties } = useFirestore<Property>('properties', [
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(6)
  ]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Here you would implement the actual filtering logic
    console.log('Filters updated:', newFilters);
  };

  const handleFavorite = (propertyId: string) => {
    // Implement favorite functionality
    console.log('Toggle favorite for property:', propertyId);
  };

  return (
    <div className="min-h-screen">
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm shadow-lg">
          <TabsTrigger value="user">User Interface</TabsTrigger>
          <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="mt-0">
          {/* User Interface */}
          <div className="space-y-0">
            {/* Hero Section */}
            <HeroVideo />

            {/* Featured Properties Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Featured Properties
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover our handpicked selection of exceptional properties
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <PropertyCard
                        property={property}
                        onFavorite={handleFavorite}
                        isFavorited={false}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* All Properties Section */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    All Properties
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Explore our complete collection of luxury properties
                  </p>
                </motion.div>

                <PropertyFilters onFiltersChange={handleFiltersChange} />

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                        <div className="bg-gray-300 h-4 rounded mb-2"></div>
                        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <PropertyCard
                          property={property}
                          onFavorite={handleFavorite}
                          isFavorited={false}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Mortgage Calculator Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
              <MortgageCalculator />
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Premium Real Estate</h3>
                  <p className="text-gray-400">
                    Your gateway to luxury properties worldwide
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </TabsContent>

        <TabsContent value="admin" className="mt-0">
          {/* Admin Dashboard */}
          <AdminLayout>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V15a3 3 0 003 3h10a3 3 0 003-3v-2.586l.293.293a1 1 0 001.414-1.414l-9-9z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Listings</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {properties.filter(p => p.status === 'available').length}
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">New Inquiries</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {properties.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
                <div className="space-y-4">
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <img
                          src={`https://res.cloudinary.com/dobktsnix/image/upload/w_100,h_75,c_fill/${property.images[0]}`}
                          alt={property.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{property.title}</h4>
                          <p className="text-sm text-gray-600">{property.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${property.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">{property.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AdminLayout>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
