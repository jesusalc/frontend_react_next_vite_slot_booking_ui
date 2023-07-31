import React, { useState } from 'react';
import BookingForm from './BookingForm';
import AvailableSlots from './AvailableSlots';
import { ApiResponse, Slot, SlotAvailable, SlotsAvailable, isSuccessResponse} from '../types'; // Adjust the path accordingly


const BookingPage: React.FC = () => {

  const [slots, setSlots] = useState<SlotAvailable[]>([]);
  const [date, setDate] = useState<string>("");

  const searchSlots = async (searchParams: { date: string; duration: string }) => {
    console.log('searchSlots:Date:', searchParams.date, 'Type:', typeof searchParams.date);
    console.log('searchSlots: Sending search request with parameters:', searchParams);

    fetch('http://localhost:3000/api/v1/available_slots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "slot": searchParams
        }
      ), // Send the parameters in the request body
    })
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

  };




  const bookSlot = async (slot: SlotAvailable) => {
    console.log('bookSlot: Sending booking request with slot:', slot);

    // Making a POST request to the "/slots" endpoint to book the selected slot
    fetch('http://localhost:3000/api/v1/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          "slot": slot
        }
      ),
    })
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
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl mb-4">Book a Slot</h1>
    <BookingForm onSearchSlots={searchSlots} />
    <AvailableSlots slots={slots} onBookSlot={bookSlot} />
  </div>
  );
}

export default BookingPage;
