
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AdminProperties = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Property Management</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <p className="text-gray-600">Property management interface will be implemented here.</p>
          <p className="text-sm text-gray-500 mt-2">
            This will include property CRUD operations, image uploads to Cloudinary, and real-time updates.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
