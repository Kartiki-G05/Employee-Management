// User related types
export interface User {
  username: string;
  roles: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  hasRole: (requiredRoles: string[]) => boolean;
}

// Employee related types
export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  reportingManager: string;
}

export interface EmployeeFormData {
  name: string;
  department: string;
  email: string;
  phone: string;
  reportingManager: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}