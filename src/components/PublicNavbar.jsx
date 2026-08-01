// components/PublicNavbar.jsx
// Storefront navbar shown on Home / Products / Product Details pages.

import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

const PublicNavbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
          <FiShoppingBag className="text-primary-600" />
          E-Shop
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <Link
            to="/admin/login"
            className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicNavbar;
