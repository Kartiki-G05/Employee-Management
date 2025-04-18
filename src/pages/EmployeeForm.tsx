import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { getEmployeeById, createEmployee, updateEmployee } from '../services/employeeService';
import { EmployeeFormData } from '../types';
import { DEPARTMENTS } from '../config';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    department: '',
    email: '',
    phone: '',
    reportingManager: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  
  useEffect(() => {
    if (isEditMode && id) {
      fetchEmployee(id);
    }
  }, [id, isEditMode]);
  
  const fetchEmployee = async (employeeId: string) => {
    setFetchLoading(true);
    try {
      const employee = await getEmployeeById(employeeId);
      setFormData({
        name: employee.name,
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        reportingManager: employee.reportingManager
      });
    } catch (error) {
      toast.error('Failed to load employee data');
      navigate('/employees');
    } finally {
      setFetchLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.reportingManager.trim()) {
      newErrors.reportingManager = 'Reporting Manager is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      if (isEditMode && id) {
        await updateEmployee(id, formData);
        toast.success('Employee updated successfully');
      } else {
        await createEmployee(formData);
        toast.success('Employee created successfully');
      }
      navigate('/employees');
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update employee' : 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };
  
  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            className="mr-4"
            onClick={() => navigate('/employees')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Employee' : 'Add New Employee'}
          </h1>
        </div>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Employee Information</h2>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              
              <Select
                id="department"
                name="department"
                label="Department"
                options={DEPARTMENTS.map(dept => ({ value: dept, label: dept }))}
                value={formData.department}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, department: value }));
                  if (errors.department) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.department;
                      return newErrors;
                    });
                  }
                }}
                error={errors.department}
                required
              />
              
              <Input
                id="email"
                name="email"
                type="email"
                label="Email Address"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              
              <Input
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
              
              <Input
                id="reportingManager"
                name="reportingManager"
                label="Reporting Manager"
                placeholder="Jane Smith"
                value={formData.reportingManager}
                onChange={handleChange}
                error={errors.reportingManager}
                required
              />
            </div>
          </CardBody>
          
          <CardFooter className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              isLoading={loading}
            >
              {isEditMode ? 'Update Employee' : 'Create Employee'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EmployeeForm;