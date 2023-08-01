// DeleteConfirmationView.tsx
import React from 'react';

interface DeleteConfirmationViewProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationView: React.FC<DeleteConfirmationViewProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-800">Are you sure you want to delete this slot?</p>
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={onConfirm}>
            Yes
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationView;
