
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  propertyType: 'house' | 'apartment' | 'condo' | 'villa' | 'penthouse';
  status: 'available' | 'sold' | 'pending';
  images: string[];
  videoTour?: string;
  virtualTour?: string;
  amenities: string[];
  agentId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  views: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  profileImage: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredDate?: Date;
  status: 'new' | 'in-progress' | 'closed';
  assignedAgent?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  inquiries: string[];
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  slug: string;
}
