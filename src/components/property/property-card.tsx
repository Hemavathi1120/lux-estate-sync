
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Bed, Bath, Square, Eye } from 'lucide-react';
import { Property } from '@/types';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onFavorite, 
  isFavorited = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={getOptimizedImageUrl(property.images[0], 600, 450)}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={property.status === 'available' ? 'default' : 'secondary'}
              className={`${
                property.status === 'available' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-orange-500 hover:bg-orange-600'
              } text-white border-0`}
            >
              {property.status.toUpperCase()}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 transition-colors duration-200"
            onClick={() => onFavorite?.(property.id)}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-4 right-16">
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black border-0">
                FEATURED
              </Badge>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
              <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{property.squareFootage.toLocaleString()} sqft</span>
                </div>
              </div>
              <div className="flex items-center text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                <span>{property.views}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </p>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
