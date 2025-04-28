
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const AdminPortal: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            This is a placeholder for the admin portal where content managers will be able to add, edit, and delete news articles.
          </p>
          <p className="text-gray-600">
            In a complete implementation, this would include:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-600">
            <li>Secure login and authentication</li>
            <li>Article management (create, edit, delete)</li>
            <li>Media library for images and videos</li>
            <li>Category management</li>
            <li>User management</li>
            <li>Analytics dashboard</li>
            <li>Google AdSense configuration</li>
            <li>Comment moderation</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPortal;
