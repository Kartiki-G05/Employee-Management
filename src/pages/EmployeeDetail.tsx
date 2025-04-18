import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Users,
  ArrowLeft,
  Edit,
  Trash2
} from 'lucide-react';
import { getEmployeeById, deleteEmployee } from '../services/employeeService';
import { useAuth } from '../contexts/AuthContext';
import { Employee } from '../types';
import Card, { CardHeader, CardBody } from '../components/Card';
import Button from '../components/Button';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const { hasRole } = useAuth();
  const navigate = useNavigate();
  
  const isAdmin = hasRole(['ADMIN']);
  
  useEffect(() => {
    if (id) {
      fetchEmployeeDetails(id);
    }
  }, [id]);
  
  const fetchEmployeeDetails = async (employeeId: string) => {
    setLoading(true);
    try {
      const data = await getEmployeeById(employeeId);
      setEmployee(data);
    } catch (error) {
      toast.error('Failed to load employee details');
      navigate('/employees');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!employee) return;
    
    if (confirm('Are you sure you want to delete this employee?')) {
      setDeleteLoading(true);
      try {
        await deleteEmployee(employee.id.toString());
        toast.success('Employee deleted successfully');
        navigate('/employees');
      } catch (error) {
        toast.error('Failed to delete employee');
      } finally {
        setDeleteLoading(false);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Employee not found</h2>
        <Button className="mt-4" onClick={() => navigate('/employees')}>
          Back to Employees
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            className="mr-4"
            onClick={() => navigate('/employees')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-sm text-gray-500">{employee.department}</p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={() => navigate(`/employees/edit/${employee.id}`)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            
            <Button
              variant="danger"
              className="flex items-center"
              onClick={handleDelete}
              isLoading={deleteLoading}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">Employee Information</h2>
            </CardHeader>
            
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-sm">Full Name</span>
                    </div>
                    <div className="text-gray-900 font-medium">{employee.name}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Mail className="h-4 w-4 mr-1" />
                      <span className="text-sm">Email Address</span>
                    </div>
                    <div className="text-gray-900">{employee.email}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="text-sm">Phone Number</span>
                    </div>
                    <div className="text-gray-900">{employee.phone}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span className="text-sm">Department</span>
                    </div>
                    <div className="text-gray-900 font-medium">{employee.department}</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-gray-500 mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Reporting Manager</span>
                    </div>
                    <div className="text-gray-900">{employee.reportingManager}</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">Employee ID</h2>
            </CardHeader>
            <CardBody>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                <div className="text-sm text-gray-500 mb-1">ID Number</div>
                <div className="text-2xl font-bold text-gray-700">#{employee.id}</div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;