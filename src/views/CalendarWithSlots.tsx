import React, { useState, useEffect } from 'react';
import {isSuccessResponse, SlotsAvailable, SlotAvailable, ApiResponse } from '../types'; // Adjust the path accordingly

const CalendarWithSlots: React.FC = () => {
  const [slots, setSlots] = useState<SlotAvailable[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);


  // Fetch available slots from the backend
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/all_available_slots')
      .then((res) => res.json())
      .then((response: ApiResponse) => {
        if (isSuccessResponse(response)) {
          const slotsData = response.data.slots as SlotsAvailable; // Casting to the correct type
          setSlots(slotsData);
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






  const handleCalendarSlot = (date: string, count: number) => {
    if (selectedDate === date) {
      setSelectedDate(null); // Deselect the date
    } else {
      setSelectedDate(date);
    }
    // Logic to update the count and handle other UI changes as needed
  };

  return (
    <div>
      {slots.map((slotAvailable: SlotAvailable) => (
        <button
          key={slotAvailable.date}
          onClick={() => handleCalendarSlot(slotAvailable.date, slotAvailable.count)}
          className={`${
            selectedDate === slotAvailable.date ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
          }`}
          disabled={selectedDate === slotAvailable.date}
        >
          {slotAvailable.date}: {slotAvailable.count} slots available
        </button>
      ))}
      {/* Other components and logic to handle the 'date' and 'duration' fields */}
    </div>
  );
};

export default CalendarWithSlots;
