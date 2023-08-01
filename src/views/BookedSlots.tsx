
import React, { useState } from 'react';
import { Slot, SlotsBookedProps } from '../types_booked';
import { format, parseISO } from 'date-fns';
import { FiTrash, FiEdit } from 'react-icons/fi';
import DeleteConfirmationView from './DeleteConfirmationView';
import DeletingView from './DeletingView';
import DeletedView from './DeletedView';

import EditSlotView from './EditSlotView'; // Import the EditSlotView component

const BookedSlots: React.FC<SlotsBookedProps> = ({ slots, onBookSlot }) => {
  const formatSlotTime = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const isSameDay = startDate.toDateString() === endDate.toDateString();
    const formattedStartDate = format(startDate, 'MMM d, HH:mm');
    const formattedEndDate = format(endDate, 'HH:mm');
    return isSameDay
      ? `${formattedStartDate} - ${formattedEndDate}`
      : `${formattedStartDate} -- ${formattedEndDate}`;
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditSlot = (slot: any) => {
    setShowEditModal(true);
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleting, setShowDeleting] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDeleteSlot = (slot: any) => {
    setShowDeleteConfirmation(true);
    // const isConfirmed = window.confirm('Are you sure you want to delete this slot?');
    // if (isConfirmed) {
    //   // Call the onDeleteSlot function to handle the actual deletion
    //   // onDeleteSlot(slot);
    //   console.log("BookedSlots.tsx not implemented delete yet");
    // }
  };

  const handleConfirmDelete = () => {
    // Show "Deleting" view while sending delete request
    setShowDeleteConfirmation(false);
    setShowDeleting(true);

    // Simulate delete request to localhost:3000/api/v1/booked/delete
    // You should use the actual delete request to your server here
    setTimeout(() => {
      const isSuccess = true; // Replace with actual success status
      setShowDeleting(false);
      setShowDeleted(true);
      setDeleteSuccess(isSuccess);
    }, 2000); // Simulate a 2-second delay to show "Deleting" view

    // For the actual delete request, use fetch or any other appropriate method
    // fetch('http://localhost:3000/api/v1/booked/delete', {
    //   method: 'DELETE',
    //   // ...
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const isSuccess = true; // Replace with actual success status
    //     setShowDeleting(false);
    //     setShowDeleted(true);
    //     setDeleteSuccess(isSuccess);
    //   })
    //   .catch((error) => {
    //     setShowDeleting(false);
    //     setShowDeleted(true);
    //     setDeleteSuccess(false);
    //   });
  };

  const handleCloseDeleted = () => {
    setShowDeleted(false);
  };
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Booked Slots</h2>
      <ul className="space-y-4">
      {slots.map((slot: any, index: any): any => (
        <li key={index} className="bg-white p-4 shadow rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-800">{formatSlotTime(slot.start, slot.end)}</span>
            <div className="space-x-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteSlot(slot)}
              >
                <FiTrash /> Delete Slot
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleEditSlot(slot)}
              >
                <FiEdit /> Edit Slot
              </button>
            </div>
          </div>
        </li>
      ))}
      {showDeleteConfirmation && (
        <DeleteConfirmationView
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
      {showDeleting && <DeletingView />}
      {showDeleted && <DeletedView isSuccess={deleteSuccess} onClose={handleCloseDeleted} />}
      {showEditModal && <EditSlotView onClose={() => setShowEditModal(false)} />}
    </ul>
    </div>
  );
}

export default BookedSlots;
