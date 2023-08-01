// DeletedView.tsx
import React from 'react';

interface DeletedViewProps {
  isSuccess: boolean;
  onClose: () => void;
}

const DeletedView: React.FC<DeletedViewProps> = ({ isSuccess, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`bg-white p-6 rounded-lg shadow-lg ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className="text-gray-800">
          {isSuccess ? 'Deleted successfully!' : 'Deleting failed, try again.'}
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DeletedView;
