// pages/Home.jsx
// Public landing page: hero section + a preview grid of recent products.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts } from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await getProducts({ limit: 8, sort: 'newest' });
        setProducts(res.data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl px-4"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">Shop the Latest Trends</h1>
          <p className="mt-4 text-lg text-primary-100">
            Quality products, fair prices, fast delivery — all in one place.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-primary-50"
          >
            Browse Products
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Latest Arrivals</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
