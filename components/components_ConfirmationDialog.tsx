import React from 'react';

export default function ConfirmationDialog({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}