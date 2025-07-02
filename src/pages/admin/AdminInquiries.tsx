
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFirestore } from '@/hooks/useFirestore';
import { Inquiry, Property, Agent } from '@/types';
import { orderBy, where } from 'firebase/firestore';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

const AdminInquiries = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: inquiries, loading, update } = useFirestore<Inquiry>('inquiries', [
    orderBy('createdAt', 'desc')
  ]);

  const { data: properties } = useFirestore<Property>('properties');
  const { data: agents } = useFirestore<Agent>('agents');

  const handleStatusUpdate = async (inquiryId: string, newStatus: 'new' | 'in-progress' | 'closed') => {
    await update(inquiryId, { status: newStatus });
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getAgent = (agentId: string) => {
    return agents.find(a => a.id === agentId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <MessageSquare className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Inquiry Management</h2>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-800">
              {inquiries.filter(i => i.status === 'new').length} New
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
              {inquiries.filter(i => i.status === 'in-progress').length} In Progress
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-800">
              {inquiries.filter(i => i.status === 'closed').length} Closed
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search inquiries..."
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
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Inquiries ({filteredInquiries.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="bg-gray-300 h-4 rounded w-1/3"></div>
                          <div className="bg-gray-300 h-6 rounded w-16"></div>
                        </div>
                        <div className="bg-gray-300 h-3 rounded w-1/4 mb-2"></div>
                        <div className="bg-gray-300 h-3 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredInquiries.map((inquiry) => {
                      const property = getProperty(inquiry.propertyId);
                      return (
                        <div
                          key={inquiry.id}
                          className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedInquiry?.id === inquiry.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                              <p className="text-sm text-gray-600">{inquiry.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  inquiry.status === 'new' ? 'default' :
                                  inquiry.status === 'in-progress' ? 'secondary' : 'outline'
                                }
                                className={
                                  inquiry.status === 'new' ? 'bg-green-100 text-green-800' :
                                  inquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }
                              >
                                {getStatusIcon(inquiry.status)}
                                <span className="ml-1">{inquiry.status}</span>
                              </Badge>
                            </div>
                          </div>
                          
                          {property && (
                            <p className="text-sm text-blue-600 mb-2">
                              Re: {property.title}
                            </p>
                          )}
                          
                          <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                            {inquiry.message}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                            {inquiry.phone && (
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {inquiry.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Details */}
          <div>
            {selectedInquiry ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Inquiry Details
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInquiry(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{selectedInquiry.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                      {selectedInquiry.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">
                            {selectedInquiry.phone}
                          </a>
                        </div>
                      )}
                      {selectedInquiry.preferredDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{new Date(selectedInquiry.preferredDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Property Interest</h4>
                    {(() => {
                      const property = getProperty(selectedInquiry.propertyId);
                      return property ? (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h5 className="font-medium text-gray-900">{property.title}</h5>
                          <p className="text-sm text-gray-600">{property.location}</p>
                          <p className="text-sm font-semibold text-blue-600">
                            ${property.price.toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Property not found</p>
                      );
                    })()}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                    <div className="space-y-2">
                      {['new', 'in-progress', 'closed'].map((status) => (
                        <Button
                          key={status}
                          variant={selectedInquiry.status === status ? 'default' : 'outline'}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleStatusUpdate(selectedInquiry.id, status as any)}
                        >
                          {getStatusIcon(status)}
                          <span className="ml-2 capitalize">{status.replace('-', ' ')}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Assign Agent</h4>
                    <select
                      value={selectedInquiry.assignedAgent || ''}
                      onChange={(e) => update(selectedInquiry.id, { assignedAgent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Agent</option>
                      {agents.filter(a => a.isActive).map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Received: {new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select an inquiry to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
