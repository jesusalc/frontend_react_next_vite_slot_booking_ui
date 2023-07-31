import React, { useState, useEffect } from 'react';
import {isSuccessResponse, SlotsAvailable, SlotAvailable, ApiResponse } from '../types';

interface CalendarWithSlotsProps {
  slots: SlotAvailable[];
  setSlots: (slots: SlotAvailable[]) => void;
  setDefaultSlots: (slots: SlotAvailable[]) => void;
  handleCalendarSlot: (slotDate: string, index: number) => void;
}

const CalendarWithSlots: React.FC<CalendarWithSlotsProps> = ({
  slots,
  setSlots,
  setDefaultSlots,
  handleCalendarSlot,
}) => {


  // Fetch available slots from the backend
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/all_available_slots')
      .then((res) => res.json())
      .then((response: ApiResponse) => {
        if (isSuccessResponse(response)) {
          const slotsData = response.data.slots as SlotsAvailable; // Casting to the correct type
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
      {slots.map((slotAvailable: SlotAvailable, index: number) => (
        <button
          key={slotAvailable.date}
          onClick={() => handleCalendarSlot(slotAvailable.date, index)}
          className={`${slotAvailable.disabled ?  'bg-gray-300 cursor-not-allowed': 'bg-blue-500' }`}
          disabled={!!slotAvailable.disabled}
        >
          {slotAvailable.date}: {slotAvailable.count} slots available
        </button>
      ))}
    </div>
  );
};





export default CalendarWithSlots;
