// layouts/MainLayout.jsx
// Layout wrapper for public storefront pages (Home, Products, Details).

import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-800">
        © {new Date().getFullYear()} E-Shop. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
