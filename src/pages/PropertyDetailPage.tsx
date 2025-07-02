
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/hooks/useFirestore';
import { Property, Agent, Inquiry } from '@/types';
import { where, orderBy } from 'firebase/firestore';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Phone, 
  Mail, 
  Heart, 
  Share2, 
  Camera,
  Play,
  Car,
  Wifi,
  Waves,
  TreePine,
  Dumbbell,
  Shield
} from 'lucide-react';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: ''
  });

  // In a real app, you'd fetch the specific property by ID
  const { data: properties } = useFirestore<Property>('properties', [
    orderBy('createdAt', 'desc')
  ]);
  
  const property = properties[0]; // Mock for demo - in real app, filter by ID
  
  const { data: agents } = useFirestore<Agent>('agents', [
    where('isActive', '==', true)
  ]);
  
  const agent = agents[0]; // Mock for demo - in real app, filter by agentId

  const { add: addInquiry } = useFirestore<Inquiry>('inquiries');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    await addInquiry({
      propertyId: property.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      preferredDate: formData.preferredDate ? new Date(formData.preferredDate) : undefined,
      status: 'new',
      createdAt: new Date()
    });

    setShowContactForm(false);
    setFormData({ name: '', email: '', phone: '', message: '', preferredDate: '' });
    alert('Your inquiry has been sent successfully!');
  };

  const amenityIcons = {
    'Parking': Car,
    'WiFi': Wifi,
    'Pool': Waves,
    'Garden': TreePine,
    'Gym': Dumbbell,
    'Security': Shield
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/properties" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Image Gallery */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96 lg:h-[500px]">
            <div className="lg:col-span-2 relative">
              <img
                src={`https://res.cloudinary.com/dobktsnix/image/upload/w_800,h_600,c_fill/${property.images[selectedImageIndex]}`}
                alt={property.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                <Badge className="bg-blue-600 text-white">
                  <Camera className="h-3 w-3 mr-1" />
                  {property.images.length} Photos
                </Badge>
                {property.videoTour && (
                  <Badge className="bg-green-600 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    Video Tour
                  </Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={`https://res.cloudinary.com/dobktsnix/image/upload/w_400,h_300,c_fill/${image}`}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${property.price.toLocaleString()}
                  </div>
                  <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t">
                <div className="text-center">
                  <Bed className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold text-gray-900">{property.squareFootage.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Shield;
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive map would be displayed here</p>
                    <p className="text-sm text-gray-500">Coordinates: {property.coordinates.lat}, {property.coordinates.lng}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            {agent && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={agent.profileImage}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.specialties[0]}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {agent.rating} ({agent.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      {agent.phone}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      {agent.email}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
              </CardHeader>
              <CardContent>
                {!showContactForm ? (
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      onClick={() => setShowContactForm(true)}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule a Tour
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      placeholder="Preferred Tour Date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <div className="flex space-x-2">
                      <Button type="submit" className="flex-1">Send Inquiry</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Home Price:</span>
                    <span className="font-semibold">${property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Down Payment (20%):</span>
                    <span className="font-semibold">${(property.price * 0.2).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">${(property.price * 0.8).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span>Est. Monthly Payment:</span>
                      <span className="font-bold text-blue-600">
                        ${Math.round((property.price * 0.8 * 0.005)).toLocaleString()}/mo
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Get Pre-Approved
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
