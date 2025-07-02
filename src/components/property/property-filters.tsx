
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    propertyType: '',
    priceRange: [0, 10000000],
    bedrooms: '',
    bathrooms: '',
    status: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      location: '',
      propertyType: '',
      priceRange: [0, 10000000],
      bedrooms: '',
      bathrooms: '',
      status: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="mb-8 border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        {/* Quick Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search properties, locations, or keywords..."
              value={filters.search}
              onChange={(e) => updateFilters('search', e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 h-12 px-6"
          >
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex items-center gap-2 h-12 px-6 text-gray-600 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={filters.location} onValueChange={(value) => updateFilters('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                  <SelectItem value="beverly-hills">Beverly Hills, CA</SelectItem>
                  <SelectItem value="miami">Miami, FL</SelectItem>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="chicago">Chicago, IL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={filters.propertyType} onValueChange={(value) => updateFilters('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={filters.bedrooms} onValueChange={(value) => updateFilters('bedrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+ Bedroom</SelectItem>
                  <SelectItem value="2">2+ Bedrooms</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select value={filters.bathrooms} onValueChange={(value) => updateFilters('bathrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+ Bathroom</SelectItem>
                  <SelectItem value="2">2+ Bathrooms</SelectItem>
                  <SelectItem value="3">3+ Bathrooms</SelectItem>
                  <SelectItem value="4">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 md:col-span-2">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters('priceRange', value)}
                  max={10000000}
                  min={0}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{formatPrice(filters.priceRange[0])}</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => updateFilters('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
