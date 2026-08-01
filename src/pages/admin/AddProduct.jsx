// pages/admin/AddProduct.jsx
// Admin "create product" page — wraps the shared ProductForm.

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../../components/ProductForm';
import { createProduct } from '../../services/productService';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createProduct({ ...formData, image: formData.image?.[0] });
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Add Product</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
      </div>
    </div>
  );
};

export default AddProduct;
