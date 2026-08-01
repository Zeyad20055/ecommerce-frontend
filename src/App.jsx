// App.jsx
// Top-level route table: public storefront routes under MainLayout,
// and admin routes under AdminLayout (protected except /admin/login).

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AllProducts from './pages/admin/AllProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public storefront */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>

        {/* Admin login (unprotected) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin dashboard (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
        </Route>

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center text-gray-500">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
