
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Users, 
  Award, 
  Target, 
  Heart, 
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Properties Sold', icon: Home },
    { number: '1000+', label: 'Happy Clients', icon: Users },
    { number: '15+', label: 'Years Experience', icon: Calendar },
    { number: '50+', label: 'Awards Won', icon: Award }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from property selection to client relationships.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Honesty and transparency are at the core of everything we do. We build trust through reliable service.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your dreams and needs are our priority. We tailor our services to match your unique requirements.'
    },
    {
      icon: Star,
      title: 'Innovation',
      description: 'We leverage the latest technology and market insights to provide cutting-edge real estate solutions.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=400&h=400&fit=crop&crop=face',
      bio: '15+ years in luxury real estate'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Expert in residential properties'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Digital marketing specialist'
    },
    {
      name: 'David Thompson',
      role: 'Property Consultant',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      bio: 'Commercial real estate expert'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">LuxEstate</Link>
            <div className="flex items-center space-x-8">
              <Link to="/properties" className="text-gray-700 hover:text-gray-900">Properties</Link>
              <Link to="/agents" className="text-gray-700 hover:text-gray-900">Agents</Link>
              <Link to="/about" className="text-blue-600 font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About LuxEstate</h1>
            <p className="text-xl mb-8 text-blue-100">
              Your trusted partner in luxury real estate since 2008. We transform dreams into addresses.
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Award-Winning Real Estate Agency
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600">Building dreams, creating legacies</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                  alt="LuxEstate office" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">From Vision to Reality</h3>
                <p className="text-gray-600 mb-6">
                  Founded in 2008 by Sarah Johnson, LuxEstate began with a simple vision: to redefine 
                  the luxury real estate experience. What started as a small boutique agency has grown 
                  into one of the most respected names in premium property.
                </p>
                <p className="text-gray-600 mb-6">
                  We believe that finding the perfect home is more than just a transaction—it's about 
                  understanding dreams, lifestyle aspirations, and creating lasting relationships with 
                  our clients.
                </p>
                <Button asChild>
                  <Link to="/properties">Explore Our Properties</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let our experienced team help you navigate the luxury real estate market
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6" />
                <span>123 Luxury Ave, Premium City</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6" />
                <span>info@luxestate.com</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">Contact Us Today</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/properties">View Properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">LuxEstate</div>
            <p className="text-gray-400 mb-4">Transforming dreams into addresses since 2008</p>
            <div className="flex justify-center space-x-8">
              <Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link>
              <Link to="/agents" className="text-gray-400 hover:text-white">Agents</Link>
              <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
              <p>&copy; 2024 LuxEstate. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
