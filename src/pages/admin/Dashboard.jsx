// pages/admin/Dashboard.jsx
// Admin overview: quick stats + a table of the most recent products.

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiBox, FiLayers, FiGrid } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getProductStats } from '../../services/productService';

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
    <div className="rounded-lg bg-primary-50 p-3 text-primary-600 dark:bg-primary-500/10">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getProductStats();
        setStats(data);
      } catch (err) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <LoadingSpinner full />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard icon={<FiBox size={22} />} label="Total Products" value={stats.totalProducts} />
        <StatCard icon={<FiLayers size={22} />} label="Total Stock" value={stats.totalQuantity} />
        <StatCard icon={<FiGrid size={22} />} label="Categories" value={stats.categoriesCount} />
      </div>

      <h2 className="mb-4 mt-10 text-lg font-semibold text-gray-900 dark:text-white">Recent Products</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
            {stats.recentProducts.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{p.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{p.category}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">${Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
