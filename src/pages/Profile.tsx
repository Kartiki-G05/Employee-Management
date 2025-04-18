import React, { useState } from 'react';
import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card, { CardHeader, CardBody } from '../components/Card';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [employeeDetails] = useState({
    name: 'Employee Name', // This would be fetched from API in a real app
    email: 'employee@example.com', // This would be fetched from API in a real app
    department: 'Engineering',
    joinDate: '2023-05-15',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your profile information
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            </CardHeader>
            
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">Full Name</span>
                  </div>
                  <div className="text-gray-900 font-medium">{employeeDetails.name}</div>
                </div>
                
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="text-sm">Email Address</span>
                  </div>
                  <div className="text-gray-900">{employeeDetails.email}</div>
                </div>
                
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Shield className="h-4 w-4 mr-1" />
                    <span className="text-sm">Department</span>
                  </div>
                  <div className="text-gray-900">{employeeDetails.department}</div>
                </div>
                
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <span className="text-sm">Join Date</span>
                  </div>
                  <div className="text-gray-900">{new Date(employeeDetails.joinDate).toLocaleDateString()}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
            </CardHeader>
            
            <CardBody>
              <div>
                <div className="flex items-center text-gray-500 mb-1">
                  <span className="text-sm">Username</span>
                </div>
                <div className="text-gray-900 font-medium">{user?.username}</div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center text-gray-500 mb-1">
                  <span className="text-sm">Role</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user?.roles.map((role) => (
                    <span 
                      key={role}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 
                          role === 'HR' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;