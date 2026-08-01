// components/ProductCard.jsx
// Storefront product card used on Home/Products grid pages.

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
            {product.category}
          </p>
          <h3 className="mt-1 truncate font-semibold text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${Number(product.price).toFixed(2)}
            </span>
            <span
              className={`text-xs font-medium ${
                product.quantity > 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
