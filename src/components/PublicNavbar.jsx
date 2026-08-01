// components/ProductTable.jsx

import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const API_URL = "https://ecommerce-backend-lilac-one.vercel.app";

const ProductTable = ({ products, onDeleteRequest }) => {
  if (!products || !products.length) {
    return <div className="py-12 text-center text-gray-500 dark:text-gray-400">No products found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Image</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Name</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Category</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Price</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Qty</th>

            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-3">
                <img src={product.image ? `${API_URL}${product.image}` : "/placeholder.png"} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
              </td>

              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>

              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{product.category}</td>

              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">${Number(product.price).toFixed(2)}</td>

              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{product.quantity}</td>

              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link to={`/admin/products/edit/${product._id}`} className="rounded-lg p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800">
                    <FiEdit2 />
                  </Link>

                  <button onClick={() => onDeleteRequest(product)} className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800">
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
