// pages/admin/AllProducts.jsx
// Admin product management: search, sort, paginate, edit (via link) and
// delete (with a confirmation dialog) — the core CRUD "read/delete" view.

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import ProductTable from '../../components/ProductTable';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import ConfirmDeleteDialog from '../../components/ConfirmDeleteDialog';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getProducts, deleteProduct } from '../../services/productService';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [productToDelete, setProductToDelete] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ search, sort, page, limit: 10 });
      setProducts(res.data);
      setPages(res.meta.pages);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, sort, page]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(productToDelete._id);
      toast.success('Product deleted');
      setProductToDelete(null);
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProductTable products={products} onDeleteRequest={setProductToDelete} />
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}

      <ConfirmDeleteDialog
        isOpen={!!productToDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default AllProducts;
