import React, { useState } from 'react';
import { Slot, BookingFormProps, ApiResponse, SlotBooked} from '../types_booked'; // Adjust the path accordingly
import CalendarWithSlots from './CalendarWithSlots'; // Adjust the path accordingly



const BookingForm: React.FC<BookingFormProps> = ({ onSearchSlots }) => {
  const [date, setDate] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [errors, setErrors] = useState<{ date?: string; duration?: string }>({});
  const [slots, setSlots] = useState<SlotBooked[]>([]);
  const [defaultSlots, setDefaultSlots] = useState<SlotBooked[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('handleSubmit: clicked', e, e.target, e.target,  date, duration);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the form submission
    }
    // let newSlots = [...slots];
    // slots.forEach((one_slot, index_of_the_slot_from_slots) => {
    //   if (one_slot.date == date) {
    //     // If the date matches, disable the corresponding slot
    //     handleCalendarSlot(one_slot.date, index_of_the_slot_from_slots);
    //   }
    // });
    // setSlots(newSlots);
    console.log('handleSubmit: submitted with date:', date, 'and duration:', duration);
    onSearchSlots({ date: date, duration: duration });
  };
  const validate = () => {
    // Update the disabled state for the slots in CalendarWithSlots
    const newErrors: { date?: string; duration?: string } = {};
    if (!date) {
      newErrors.date = "Date is required";
    }
    if (!duration) {
      newErrors.duration = "Duration is required";
    }

    return newErrors;
  };


  const validateField = (field: string, value: string) => {
    if (!value) return `${field} is required`;
    return '';
  };

  const handleChange = (field: string, value: string) => {

    if (field === 'date') {
      setDate(value);
      setErrors({ ...errors, date: validateField('Date', value) });
    } else if (field === 'duration') {
      setDuration(value);
      setErrors({ ...errors, duration: validateField('Duration', value) });
    }
  };

  const handleDiminishSlot = (slotDate: string, index_of_the_slot_from_slots: number) => {
    handleResetSlot(slotDate, index_of_the_slot_from_slots);
    let newSlots = [...slots];
    if (!slots[index_of_the_slot_from_slots].disabled) {
    //   newSlots[index_of_the_slot_from_slots].count += 1;
    //   newSlots[index_of_the_slot_from_slots].disabled = newSlots[index_of_the_slot_from_slots].count > 0;
    //   handleChange('date', '');
    //   handleChange('duration', '');
    // } else {
      newSlots[index_of_the_slot_from_slots].count -= 1;
      newSlots[index_of_the_slot_from_slots].disabled = true;
      handleChange('date', slotDate);
      handleChange('duration', '1');
    }
    setSlots(newSlots);
  };

  const handleResetSlot = (slotDate: string | null, index_of_the_slot_from_slots: number | null) => {
    slots.map((slotBooked: SlotBooked, index: number) => {
      if (slots[index].disabled ) {
         slots[index].count += 1
      }
      slots[index].disabled = false
    })
  };


  return (
    <form onSubmit={handleSubmit} className="p-4">
      <CalendarWithSlots slots={slots} defaultSlots={defaultSlots} setSlots={setSlots} setDefaultSlots={setDefaultSlots} handleDiminishSlot={handleDiminishSlot} handleResetSlot={handleResetSlot} />
      <div className={`mb-4 ${errors.date ? 'border-red-400 border' : ''}`}>
        <label className="block text-sm font-bold mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => handleChange('date', e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
      </div>
      <div className={`mb-4 ${errors.duration ? 'border-red-400 border' : ''}`}>
        <label className="block text-sm font-bold mb-2">Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.duration ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.duration && <span className="text-red-500 text-sm">{errors.duration}</span>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </form>
  );

}

export default BookingForm;
