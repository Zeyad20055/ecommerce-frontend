// components/SearchBar.jsx
// Controlled search input with a small debounce so it doesn't fire an
// API request on every keystroke.

import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => onChange(localValue), 400);
    return () => clearTimeout(timer);
  }, [localValue]);

  return (
    <div className="relative w-full max-w-sm">
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
      />
    </div>
  );
};

export default SearchBar;
