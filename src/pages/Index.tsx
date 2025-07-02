
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Phone, Mail, MapPin, Star, ArrowRight, Play } from 'lucide-react';
import HeroVideo from '@/components/ui/hero-video';
import PropertyCard from '@/components/property/property-card';
import MortgageCalculator from '@/components/mortgage/mortgage-calculator';
import { useFirestore } from '@/hooks/useFirestore';
import { Property, Agent } from '@/types';
import { orderBy, where, limit } from 'firebase/firestore';

const Index = () => {
  const { data: featuredProperties, loading: propertiesLoading } = useFirestore<Property>('properties', [
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(6)
  ]);

  const { data: topAgents, loading: agentsLoading } = useFirestore<Agent>('agents', [
    where('isActive', '==', true),
    orderBy('rating', 'desc'),
    limit(3)
  ]);

  const handleFavorite = (propertyId: string) => {
    console.log('Toggle favorite for property:', propertyId);
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Owner",
      content: "LuxEstate helped me find my dream home. The service was exceptional and the team was very professional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Real Estate Investor",
      content: "Outstanding platform with excellent property listings. The mortgage calculator was very helpful.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      content: "The agents were knowledgeable and guided me through the entire process. Highly recommended!",
      rating: 5
    }
  ];

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

      {/* Quick Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 -mt-20 relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your Perfect Property</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Villa</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Price Range</option>
                  <option>$0 - $500K</option>
                  <option>$500K - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M+</option>
                </select>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional properties
            </p>
          </motion.div>

          {propertiesLoading ? (
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

      {/* Top Agents Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Top Agents</h2>
            <p className="text-xl text-gray-600">Expert professionals ready to help you</p>
          </div>

          {agentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse text-center">
                  <div className="bg-gray-300 h-32 w-32 rounded-full mx-auto mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center bg-gray-50 rounded-lg p-6"
                >
                  <img
                    src={agent.profileImage}
                    alt={agent.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{agent.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < agent.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({agent.reviewCount} reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-4">{agent.bio.substring(0, 100)}...</p>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/agents">
              <Button variant="outline" size="lg">
                View All Agents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <MortgageCalculator />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real stories from satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">Ready to find your dream property?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Phone className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">info@luxestate.com</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Luxury Ave, Premium City</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">LuxEstate</h3>
              <p className="text-gray-400 mb-4">Your gateway to luxury properties worldwide</p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                <div className="w-8 h-8 bg-pink-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link></li>
                <li><Link to="/agents" className="text-gray-400 hover:text-white transition-colors">Agents</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Property Sales</span></li>
                <li><span className="text-gray-400">Property Management</span></li>
                <li><span className="text-gray-400">Investment Consulting</span></li>
                <li><span className="text-gray-400">Market Analysis</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">info@luxestate.com</li>
                <li className="text-gray-400">123 Luxury Ave, Premium City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 LuxEstate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
