
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  Filter,
  Bell
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('properties');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Estate Admin</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === 'properties' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('properties')}
              >
                <Home className="mr-2 h-4 w-4" />
                Properties
              </Button>
              
              <Button
                variant={activeTab === 'agents' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('agents')}
              >
                <Users className="mr-2 h-4 w-4" />
                Agents
              </Button>
              
              <Button
                variant={activeTab === 'inquiries' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('inquiries')}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Inquiries
                <Badge className="ml-auto bg-red-100 text-red-800">3</Badge>
              </Button>
              
              <Button
                variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
