import api from './authService';
import { Employee, EmployeeFormData } from '../types';
import { ENDPOINTS } from '../config';

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get(ENDPOINTS.EMPLOYEES);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await api.get(`${ENDPOINTS.EMPLOYEES}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error);
    throw error;
  }
};

export const createEmployee = async (employeeData: EmployeeFormData): Promise<Employee> => {
  try {
    const response = await api.post(ENDPOINTS.EMPLOYEES, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id: string, employeeData: EmployeeFormData): Promise<Employee> => {
  try {
    const response = await api.put(`${ENDPOINTS.EMPLOYEES}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error);
    throw error;
  }
};