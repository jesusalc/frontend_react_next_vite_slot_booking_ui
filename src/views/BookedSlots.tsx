
import React from 'react';
import { Slot, SlotsBookedProps } from '../types_booked';

const BookedSlots: React.FC<SlotsBookedProps> = ({ slots, onBookSlot }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Booked Slots</h2>
      <ul>
        {slots.map((slot: any, index: any): any => (
          <li key={index} className="mb-2 flex justify-between">
            <span>{`${slot.start} - ${slot.end}`}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              onClick={() => onBookSlot(slot)}
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookedSlots;
