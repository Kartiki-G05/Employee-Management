import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Users, 
  User, 
  LogOut, 
  Menu, 
  X,
  Briefcase
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 flex items-center bg-white shadow-sm p-4">
        <button 
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="ml-4 flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">EMS</h1>
        </div>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative z-20 bg-white shadow-md h-full w-64 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">EMS</h1>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          {hasRole(['ADMIN', 'HR']) && (
            <Link
              to="/employees"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <Users className="mr-3 h-5 w-5" />
              Employees
            </Link>
          )}
          
          <Link
            to="/profile"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <User className="mr-3 h-5 w-5" />
            My Profile
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-y-auto p-4 pt-20 lg:pt-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;