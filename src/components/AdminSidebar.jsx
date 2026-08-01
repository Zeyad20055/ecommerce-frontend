// components/AdminSidebar.jsx
// Left navigation for the admin dashboard. Collapsible on mobile via
// the `open` prop controlled by AdminLayout.

import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox, FiPlusCircle, FiX } from 'react-icons/fi';

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary-600 text-white'
      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
  }`;

const AdminSidebar = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white p-4 transition-transform dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</span>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
            <FiX />
          </button>
        </div>
        <nav className="space-y-1">
          <NavLink to="/admin/dashboard" className={linkClass} end>
            <FiGrid /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            <FiBox /> All Products
          </NavLink>
          <NavLink to="/admin/products/add" className={linkClass}>
            <FiPlusCircle /> Add Product
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
