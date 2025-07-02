
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Phone, Mail } from 'lucide-react';
import HeroVideo from '@/components/ui/hero-video';
import PropertyCard from '@/components/property/property-card';
import MortgageCalculator from '@/components/mortgage/mortgage-calculator';
import { useFirestore } from '@/hooks/useFirestore';
import { Property } from '@/types';
import { orderBy, where, limit } from 'firebase/firestore';

const Index = () => {
  // Fetch featured properties from Firestore
  const { data: featuredProperties, loading } = useFirestore<Property>('properties', [
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(6)
  ]);

  const handleFavorite = (propertyId: string) => {
    console.log('Toggle favorite for property:', propertyId);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-6 py-3">
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-bold text-gray-900">LuxEstate</Link>
          <Link to="/properties" className="text-gray-700 hover:text-gray-900 transition-colors">Properties</Link>
          <Link to="/agents" className="text-gray-700 hover:text-gray-900 transition-colors">Agents</Link>
          <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</Link>
        </div>
      </nav>

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
          )}

          <div className="text-center mt-12">
            <Link to="/properties">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Search className="mr-2 h-5 w-5" />
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <MortgageCalculator />
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to find your dream property?</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-blue-600" />
              <span className="text-lg text-gray-700">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <span className="text-lg text-gray-700">info@luxestate.com</span>
            </div>
            <Link to="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">LuxEstate</h3>
            <p className="text-gray-400">Your gateway to luxury properties worldwide</p>
            <div className="mt-6 space-x-6">
              <Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link>
              <Link to="/agents" className="text-gray-400 hover:text-white transition-colors">Agents</Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
