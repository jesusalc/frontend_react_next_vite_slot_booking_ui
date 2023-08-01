// EditSlotView.tsx
import React from 'react';

interface EditSlotViewProps {
  onClose: () => void;
}

const EditSlotView: React.FC<EditSlotViewProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-800">
          To edit, you have to delete and create a new one.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditSlotView;
