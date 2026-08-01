// components/Pagination.jsx
// Simple numbered pagination control driven by page/pages/onPageChange props.

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40 dark:border-gray-700"
      >
        Prev
      </button>
      {pageNumbers.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`rounded-lg border px-3 py-1.5 text-sm ${
            n === page
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'dark:border-gray-700'
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(page + 1, pages))}
        disabled={page === pages}
        className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40 dark:border-gray-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
