
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Building,
  Car,
  MessageSquare
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const ContactPage = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['(555) 123-4567', '(555) 123-4568'],
      description: 'Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@luxestate.com', 'sales@luxestate.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['123 Luxury Avenue', 'Premium City, PC 12345'],
      description: 'Visit our showroom'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 6:00 PM'],
      description: 'Available for appointments'
    }
  ];

  const officeFeatures = [
    { icon: Building, text: 'Modern Office Space' },
    { icon: Car, text: 'Free Parking Available' },
    { icon: MessageSquare, text: '24/7 Online Support' }
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
              <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-blue-600 font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Contact LuxEstate</h1>
            <p className="text-xl text-blue-100">
              Ready to find your dream property? Get in touch with our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} required />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="inquiryType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Inquiry Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select inquiry type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="buying">Buying Property</SelectItem>
                                  <SelectItem value="selling">Selling Property</SelectItem>
                                  <SelectItem value="renting">Renting Property</SelectItem>
                                  <SelectItem value="investment">Investment Opportunities</SelectItem>
                                  <SelectItem value="consultation">Free Consultation</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief subject of your inquiry" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your inquiry, budget, preferred location, etc."
                                className="min-h-[120px]"
                                {...field}
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" size="lg">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Our experienced team is here to help you with all your real estate needs. 
                  Whether you're buying, selling, or investing, we provide personalized service 
                  to make your real estate journey smooth and successful.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-600">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <info.icon className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 mb-1">{detail}</p>
                          ))}
                          <p className="text-sm text-gray-500 mt-2">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Office Features */}
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl">Why Visit Our Office?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {officeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/properties">Browse Properties</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/agents">Meet Our Agents</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Our Office</h2>
            <p className="text-gray-600">Located in the heart of Premium City's business district</p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">123 Luxury Avenue, Premium City, PC 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">LuxEstate</div>
            <p className="text-gray-400 mb-4">Your trusted partner in luxury real estate</p>
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

export default ContactPage;
