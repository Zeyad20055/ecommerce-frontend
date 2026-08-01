// components/LoadingSpinner.jsx
// Reusable centered loading spinner used across pages while data fetches.

const LoadingSpinner = ({ full = false }) => {
  return (
    <div className={`flex items-center justify-center ${full ? 'min-h-[60vh]' : 'py-10'}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;
