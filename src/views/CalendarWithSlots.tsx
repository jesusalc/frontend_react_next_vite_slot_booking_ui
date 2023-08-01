import React, { useState, useEffect } from 'react';
import {isSuccessResponse, SlotsBooked, SlotBooked, ApiResponse } from '../types_booked';

interface CalendarWithSlotsProps {
  slots: SlotBooked[];
  defaultSlots: SlotBooked[];
  setSlots: (slots: SlotBooked[]) => void;
  setDefaultSlots: (slots: SlotBooked[]) => void;
  handleDiminishSlot: (slotDate: string, index: number) => void;
  handleResetSlot: (slotDate: string, index: number) => void;
}

const CalendarWithSlots: React.FC<CalendarWithSlotsProps> = ({
  slots,
  defaultSlots,
  setSlots,
  setDefaultSlots,
  handleDiminishSlot,
  handleResetSlot,
}) => {


  // Fetch booked slots from the backend
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/booked/slots/all')
      .then((res) => res.json())
      .then((response: ApiResponse) => {
        if (isSuccessResponse(response)) {
          const slotsData = response.data.slots as SlotsBooked; // Casting to the correct type
          setSlots(slotsData);
          setDefaultSlots(slotsData);
        } else if (response.error) {
          // Handle the error case
          console.error(response.error);
        } else {
          // Handle the success case without data (if needed)
          console.log(response.status);
        }
      })
      .catch((error) => {
        // Handle network or other fetch-related errors
        console.error('An unexpected error occurred:', error);
      });
  }, []);

  return (
    <div>
      {slots.map((slotBooked: SlotBooked, index: number) => (
        <button
          key={slotBooked.date}
          onClick={() => handleDiminishSlot(slotBooked.date, index)}
          className={`
          ${slotBooked.disabled ? 'bg-gray-200 text-gray-600' : 'bg-blue-200 text-blue-600'}
          hover:bg-blue-300 text-white font-bold py-4 px-8 rounded-full
          shadow-md focus:outline-none focus:shadow-outline
          transition duration-150 ease-in-out
          cursor-pointer disabled:cursor-not-allowed
        `}
          disabled={!!slotBooked.disabled}
        >
          {slotBooked.date}: {slotBooked.count}
        </button>
      ))}
      <button
          key='reset'
          onClick={() => handleResetSlot('',0)}
          className={`
          ${slots.length === 0 ? 'bg-gray-200 text-gray-600' : 'bg-blue-200 text-blue-600'}
          hover:bg-blue-300 text-white font-bold py-4 px-8 rounded-full
          shadow-md focus:outline-none focus:shadow-outline
          transition duration-150 ease-in-out
          cursor-pointer disabled:cursor-not-allowed
        `}
          disabled={slots.length === 0}
        >
          Reset
        </button>
    </div>
  );
};





export default CalendarWithSlots;
