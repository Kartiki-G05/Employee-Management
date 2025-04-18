import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Briefcase, 
  Building2 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card, { CardBody, CardHeader } from '../components/Card';
import Button from '../components/Button';

const Dashboard: React.FC = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  
  const isAdmin = hasRole(['ADMIN']);
  const canViewEmployees = hasRole(['ADMIN', 'HR']);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome Again, {user?.username}!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Directory Card */}
        {canViewEmployees && (
          <Card className="transform transition-transform hover:scale-105">
            <CardBody>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Users size={36} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Employee Directory</h3>
                <p className="text-gray-500 mb-4">
                  View and manage all employees in the company
                </p>
                <Button onClick={() => navigate('/employees')}>
                  View Employees
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
        
        {/* Add Employee Card */}
        {isAdmin && (
          <Card className="transform transition-transform hover:scale-105">
            <CardBody>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <UserPlus size={36} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Employee</h3>
                <p className="text-gray-500 mb-4">
                  Create a new employee record in the system
                </p>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/employees/new')}
                >
                  Add Employee
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
        
        {/* View Profile Card */}
        <Card className="transform transition-transform hover:scale-105">
          <CardBody>
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Briefcase size={36} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">My Profile</h3>
              <p className="text-gray-500 mb-4">
                View and manage your personal information
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                View Profile
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Department Overview for admins and HR */}
      {canViewEmployees && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Department Overview</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Building2 className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">Engineering</h3>
                </div>
                <div className="text-2xl font-bold text-gray-700">12</div>
                <div className="text-sm text-gray-500">Employees</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Building2 className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">Sales</h3>
                </div>
                <div className="text-2xl font-bold text-gray-700">8</div>
                <div className="text-sm text-gray-500">Employees</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Building2 className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-medium">HR</h3>
                </div>
                <div className="text-2xl font-bold text-gray-700">4</div>
                <div className="text-sm text-gray-500">Employees</div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;