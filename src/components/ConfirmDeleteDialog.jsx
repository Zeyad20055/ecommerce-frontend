// components/ConfirmDeleteDialog.jsx
// Modal confirmation dialog shown before deleting a product. Controlled
// entirely by props so it can be reused wherever a destructive action
// needs confirmation.

import { AnimatePresence, motion } from 'framer-motion';

const ConfirmDeleteDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title || 'Confirm Deletion'}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {message || 'This action cannot be undone.'}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteDialog;
