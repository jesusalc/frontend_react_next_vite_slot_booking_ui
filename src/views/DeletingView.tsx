// DeletingView.tsx
import React from 'react';

const DeletingView: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-800">Deleting...</p>
      </div>
    </div>
  );
};

export default DeletingView;
