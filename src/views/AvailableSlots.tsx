
import React from 'react';
import { Slot, SlotsAvailableProps } from '../types';

const AvailableSlots: React.FC<SlotsAvailableProps> = ({ slots, onBookSlot }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Available Slots</h2>
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

export default AvailableSlots;
