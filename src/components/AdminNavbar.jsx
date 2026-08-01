// components/AdminNavbar.jsx
// Top bar inside the admin dashboard: shows the logged-in admin and logout.

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = ({ onToggleSidebar }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
      <button onClick={onToggleSidebar} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
        <FiMenu />
      </button>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Hi, <span className="font-medium">{admin?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
