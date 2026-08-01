// components/ProductForm.jsx
// Shared add/edit product form built with React Hook Form. Accepts
// defaultValues (for edit mode) and an onSubmit handler from the page.

import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CATEGORY_OPTIONS = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Other'];

const ProductForm = ({ defaultValues, onSubmit, submitLabel = 'Save Product', existingImage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });
  const [preview, setPreview] = useState(existingImage || null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Product Name</label>
        <input
          {...register('name', { required: 'Product name is required' })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          rows={4}
          {...register('description', { required: 'Description is required' })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required', min: { value: 0, message: 'Must be positive' } })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
          />
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Quantity</label>
          <input
            type="number"
            {...register('quantity', { required: 'Quantity is required', min: { value: 0, message: 'Must be non-negative' } })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
          />
          {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">Select category</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Product Image</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          onChange={handleImageChange}
          className="w-full text-sm"
        />
        {preview && (
          <img src={preview} alt="Preview" className="mt-3 h-32 w-32 rounded-lg object-cover" />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;
