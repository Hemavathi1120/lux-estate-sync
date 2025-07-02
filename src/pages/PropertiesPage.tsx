
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PropertyCard from '@/components/property/property-card';
import PropertyFilters from '@/components/property/property-filters';
import { useFirestore } from '@/hooks/useFirestore';
import { Property } from '@/types';
import { orderBy, where } from 'firebase/firestore';
import { Search, Filter, Grid, List, MapPin, SlidersHorizontal } from 'lucide-react';

const PropertiesPage = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

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

  const filteredProperties = properties.filter(property => {
    if (searchQuery) {
      return property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             property.location.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

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
          <p className="text-xl opacity-90 mb-8">Discover luxury homes in the world's most desirable locations</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by location, property name, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">
                {sortedProperties.length} properties found
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <section className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-6">
            <PropertyFilters onFiltersChange={handleFiltersChange} />
          </div>
        </section>
      )}

      {/* Properties Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : sortedProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          ) : (
            <motion.div 
              className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {sortedProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {viewMode === 'grid' ? (
                    <PropertyCard
                      property={property}
                      onFavorite={handleFavorite}
                      isFavorited={false}
                    />
                  ) : (
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className="w-1/3">
                          <img
                            src={`https://res.cloudinary.com/dobktsnix/image/upload/w_400,h_300,c_fill/${property.images[0]}`}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <CardContent className="w-2/3 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                            <span className="text-2xl font-bold text-blue-600">
                              ${property.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{property.location}</span>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4 text-sm text-gray-600">
                              <span>{property.bedrooms} beds</span>
                              <span>{property.bathrooms} baths</span>
                              <span>{property.squareFootage.toLocaleString()} sqft</span>
                            </div>
                            <Button size="sm">View Details</Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {sortedProperties.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8">Let our expert agents help you find your perfect property</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/agents">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Talk to an Agent
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Get Custom Search
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
