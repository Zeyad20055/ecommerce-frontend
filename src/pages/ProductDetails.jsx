// pages/ProductDetails.jsx
// Public single-product page.

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProductById } from '../services/productService';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <LoadingSpinner full />;
  if (!product) {
    return (
      <div className="py-20 text-center text-gray-500">
        Product not found.{' '}
        <Link to="/products" className="text-primary-600 hover:underline">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link to="/products" className="text-sm text-primary-600 hover:underline">
        ← Back to Products
      </Link>
      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
          <p
            className={`mt-6 inline-block rounded-full px-3 py-1 text-sm font-medium ${
              product.quantity > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
