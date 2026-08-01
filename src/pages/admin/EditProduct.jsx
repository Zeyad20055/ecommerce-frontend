// pages/admin/EditProduct.jsx
// Admin "edit product" page — loads the existing product, then reuses
// the shared ProductForm pre-filled with its data.

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../../components/ProductForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getProductById, updateProduct } from '../../services/productService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        toast.error('Product not found');
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateProduct(id, { ...formData, image: formData.image?.[0] });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <ProductForm
          defaultValues={product}
          existingImage={product.image}
          onSubmit={handleSubmit}
          submitLabel="Update Product"
        />
      </div>
    </div>
  );
};

export default EditProduct;
