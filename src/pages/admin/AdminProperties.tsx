import React, { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/hooks/useFirestore';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Property } from '@/types';
import { orderBy } from 'firebase/firestore';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Upload,
  Save,
  X,
  MapPin,
  Bed,
  Bath,
  Square
} from 'lucide-react';

const AdminProperties = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploading, setUploading] = useState(false);

  const { data: properties, loading, add, update, remove } = useFirestore<Property>('properties', [
    orderBy('createdAt', 'desc')
  ]);

  const [formData, setFormData<{
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    propertyType: 'house' | 'apartment' | 'condo' | 'villa' | 'penthouse';
    status: 'available' | 'sold' | 'pending';
    amenities: string[];
    coordinates: { lat: number; lng: number };
    featured: boolean;
    images: string[];
  }>({
    title: '',
    description: '',
    price: 0,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 1000,
    propertyType: 'house',
    status: 'available',
    amenities: [],
    coordinates: { lat: 0, lng: 0 },
    featured: false,
    images: []
  });

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    const uploadedImages = [];
    
    for (let i = 0; i < files.length; i++) {
      try {
        const publicId = await uploadToCloudinary(files[i], 'properties');
        uploadedImages.push(publicId);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedImages]
    }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      agentId: 'default-agent', // In real app, get from current user
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (editingProperty) {
      await update(editingProperty.id, propertyData);
      setEditingProperty(null);
    } else {
      await add(propertyData);
    }

    setFormData({
      title: '',
      description: '',
      price: 0,
      location: '',
      bedrooms: 1,
      bathrooms: 1,
      squareFootage: 1000,
      propertyType: 'house',
      status: 'available',
      amenities: [],
      coordinates: { lat: 0, lng: 0 },
      featured: false,
      images: []
    });
    setShowAddForm(false);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFootage: property.squareFootage,
      propertyType: property.propertyType,
      status: property.status,
      amenities: property.amenities,
      coordinates: property.coordinates,
      featured: property.featured,
      images: property.images
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await remove(id);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Property Management</h2>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Properties Table */}
        <Card>
          <CardHeader>
            <CardTitle>Properties ({filteredProperties.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="bg-gray-300 h-20 w-32 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <img
                      src={`https://res.cloudinary.com/dobktsnix/image/upload/w_150,h_100,c_fill/${property.images[0]}`}
                      alt={property.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                          {property.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="mr-4">{property.location}</span>
                        <Bed className="h-4 w-4 mr-1" />
                        <span className="mr-2">{property.bedrooms}</span>
                        <Bath className="h-4 w-4 mr-1" />
                        <span className="mr-2">{property.bathrooms}</span>
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.squareFootage} sqft</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          ${property.price.toLocaleString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            {property.views || 0}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Property Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingProperty ? 'Edit Property' : 'Add New Property'}
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProperty(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({...formData, propertyType: e.target.value as 'house' | 'apartment' | 'condo' | 'villa' | 'penthouse'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Square Footage
                      </label>
                      <input
                        type="number"
                        value={formData.squareFootage}
                        onChange={(e) => setFormData({...formData, squareFootage: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'available' | 'sold' | 'pending'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Click to upload images</p>
                      </label>
                      {uploading && (
                        <p className="text-blue-600 mt-2">Uploading images...</p>
                      )}
                      {formData.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {formData.images.map((image, index) => (
                            <img
                              key={index}
                              src={`https://res.cloudinary.com/dobktsnix/image/upload/w_150,h_100,c_fill/${image}`}
                              alt={`Property ${index + 1}`}
                              className="w-full h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="mr-2"
                      />
                      Featured Property
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProperty(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="mr-2 h-4 w-4" />
                      {editingProperty ? 'Update Property' : 'Add Property'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
