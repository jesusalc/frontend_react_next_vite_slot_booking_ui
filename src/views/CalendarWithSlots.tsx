import React, { useState, useEffect, useMemo } from 'react';
import {isSuccessResponse, SlotsBooked, SlotBooked, ApiResponse } from '../types_booked';
import { format, parseISO, getWeeksInMonth, startOfMonth, addMonths, startOfWeek, addDays, getWeek } from 'date-fns';

import CalendarMonth from './CalendarMonth';


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




  // Optionally, you can add the surrounding months based on your requirement
  // For example, you can add one month before and after the earliest and latest months
  // const surroundingMonths: Date[] = [];
  // const prevMonth = new Date(earliestDate);
  // const nextMonth = new Date(latestDate);
  // prevMonth.setMonth(prevMonth.getMonth() - 1);
  // nextMonth.setMonth(nextMonth.getMonth() + 1);
  // surroundingMonths.push(prevMonth, ...months, nextMonth);

  // Create the calendar layout using CSS Grid or Flexbox
  // ... (continue with the calendar layout)

  const generateWeeks = (month: Date): Date[][] => {
    const weeks: Date[][] = [];
    const startDate = startOfWeek(month);
    const numWeeks = getWeeksInMonth(month);

    for (let i = 0; i < numWeeks; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        const currentDate = addDays(startDate, i * 7 + j);
        week.push(currentDate);
      }
      weeks.push(week);
    }

    return weeks;
  };

  // Function to filter slots for a specific date
  const getSlotsForDate = (date: Date): SlotBooked[] => {
    const dateString = format(date, 'yyyy-MM-dd HH:mm');
    const slotEnd = date;
    slotEnd.setMinutes(slotEnd.getMinutes() + 15);
    const dateEndString = format(slotEnd, 'yyyy-MM-dd HH:mm');
    return slots.filter((slot) => dateString >= slot.date && dateString <= dateEndString);
  };

  // Find the earliest and latest dates from the slots array
  const earliestDate = slots.reduce((minDate: Date | null, slot): Date | null => {
    const slotDate = new Date(slot.date);
    return minDate ? (slotDate < minDate ? slotDate : minDate) : slotDate;
  }, null);

  const latestDate = slots.reduce((maxDate: Date | null, slot): Date | null => {
    const slotDate = new Date(slot.date);
    const modifiedSlotDate = new Date(slotDate);
    modifiedSlotDate.setMinutes(modifiedSlotDate.getMinutes() + 15);
    return maxDate ? (modifiedSlotDate > maxDate ? modifiedSlotDate : maxDate) : modifiedSlotDate;
  }, null);

  // Generate a list of months between the earliest and latest dates
  const months: Date[] = useMemo(() => {
    const generatedMonths: Date[] = [];

    if (earliestDate && latestDate) {
      let currentDate = startOfMonth(earliestDate);
      const lastDate = startOfMonth(addMonths(latestDate, 1)); // Increment lastDate by one month to include it in the result

      while (currentDate < lastDate) {
        generatedMonths.push(new Date(currentDate));
        currentDate = addMonths(currentDate, 1);
      }
    }

    return generatedMonths;
  }, [earliestDate, latestDate]);

  console.log("months:", months);

  const formatSlotCalendarTime = (dateStart: string, count: number) => {
    const startDate = parseISO(dateStart);
    const slotEnd = startDate;
    slotEnd.setMinutes(slotEnd.getMinutes() + 15);
    const dateEndString = format(slotEnd, 'yyyy-MM-dd HH:mm');
    const endDate = parseISO(dateEndString);
    const isSameDay = startDate.toDateString() === endDate.toDateString();
    const formattedStartDate = format(startDate, 'MMM d, HH:mm');
    const formattedEndDate = format(endDate, 'HH:mm');
    return isSameDay
      ? `${formattedStartDate} - ${formattedEndDate}`
      : `${formattedStartDate} -- ${formattedEndDate}`;
  };

  const currentDate = earliestDate ? new Date(earliestDate) : new Date();
  // Extract the date property from the slots array to use as bookedDates
  const bookedDates = slots.map((slot) => new Date(slot.date));
  const hasBookedDatesInMonth = (month: Date, bookedDates: Date[]): boolean => {
    return bookedDates.some(date =>
      date.getFullYear() === month.getFullYear() &&
      date.getMonth() === month.getMonth()
    );
  };
  return (
    <div className="calendar">
      <div className="calendar flex">
          {/* Calendar months */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {months.map((month, index) => (
              (hasBookedDatesInMonth(month, bookedDates)) ?
                <CalendarMonth key={index} month={month} bookedDates={bookedDates} />
              :
                 null
            ))}
          </div>
      </div>

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
    </div>
  );
};





export default CalendarWithSlots;
