import React, { useState } from 'react';
import { Slot, BookingFormProps, ApiResponse, SlotAvailable} from '../types'; // Adjust the path accordingly
import CalendarWithSlots from './CalendarWithSlots'; // Adjust the path accordingly

const BookingForm: React.FC<BookingFormProps> = ({ onSearchSlots }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('handleSubmit: clicked', e, e.target, e.target,  date, duration);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the form submission
    }
    console.log('handleSubmit: submitted with date:', date, 'and duration:', duration);
    onSearchSlots({ date: date, duration: duration });
  };
  const validate = () => {
    const newErrors: { date?: string; duration?: string } = {};
    if (!date) {
      newErrors.date = "Date is required";
    }
    if (!duration) {
      newErrors.duration = "Duration is required";
    }
    return newErrors;
  };
  const [date, setDate] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [errors, setErrors] = useState<{ date?: string; duration?: string }>({});
  const [slots, setSlots] = useState<SlotAvailable[]>([]);
  const [defaultSlots, setDefaultSlots] = useState<SlotAvailable[]>([]);


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

  const handleCalendarSlot = (slotDate: string, index: number) => {
    let newSlots = [...slots];
    if (slots[index].disabled) {
      newSlots[index].count += 1;
      newSlots[index].disabled = newSlots[index].count > 0;
      handleChange('date', '');
      handleChange('duration', '');
    } else {
      newSlots[index].count -= 1;
      newSlots[index].disabled = true;
      handleChange('date', slotDate);
      handleChange('duration', '1');
    }
    setSlots(newSlots);
  };


  return (
    <form onSubmit={handleSubmit} className="p-4">
      <CalendarWithSlots slots={slots} setSlots={setSlots} setDefaultSlots={setDefaultSlots} handleCalendarSlot={handleCalendarSlot} />
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
