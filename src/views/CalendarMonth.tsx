import React, { useState, useEffect, useMemo } from 'react';
import {isSuccessResponse, SlotsBooked, SlotBooked, ApiResponse } from '../types_booked';
import { format, isSameDay, parseISO, getWeeksInMonth, startOfMonth, addMonths, startOfWeek, addDays, getWeek } from 'date-fns';

interface CalendarMonthProps {
  month: Date;
  bookedDates: Date[];
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ month, bookedDates }) => {


  const weeks: { weekNumber: number; dates: Date[] }[] = useMemo(() => {
    const firstDayOfMonth = startOfMonth(month);
    const weeksInMonth = getWeeksInMonth(month, { weekStartsOn: 1 }); // Start week on Monday
    const weeksArray: { weekNumber: number; dates: Date[] }[] = [];

    let currentDate = firstDayOfMonth;
    for (let weekIndex = 0; weekIndex < weeksInMonth; weekIndex++) {
      const week: Date[] = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        week.push(currentDate);
        currentDate = addDays(currentDate, 1);
      }
      const weekNumber = getWeek(week[0], { weekStartsOn: 1 });
      weeksArray.push({ weekNumber, dates: week });
    }

    return weeksArray;
  }, [month]);

  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const totalDaysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  let dayCounter = 1;
  const [selectedDate, setSelectedDate] = useState<Date|null>(null);

  const handleDayClick = (dateDate: Date): void => {
    // Store the selected date with hours and minutes reset to 0
    setSelectedDate(new Date(dateDate.setHours(0, 0, 0, 0)));
  };
  return (
    // <span key={`${month} - ${index}`}>{month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
    <div className="month bg-gray-100 rounded-md p-2 shadow-md w-200 h-200">
      {/* ... rest of the month code ... */}
      <div className="month-name text-lg font-bold mb-2">{format(month, 'MMMM yyyy')}</div>
      {/* Render the week number and weekdays */}
      <div className="weekdays flex border-b border-gray-300 pb-2">
        <div className="weeknumber w-8 text-center">#</div>
        <div className="weekday flex-1 text-center">Mon</div>
        <div className="weekday flex-1 text-center">Tue</div>
        <div className="weekday flex-1 text-center">Wed</div>
        <div className="weekday flex-1 text-center">Thu</div>
        <div className="weekday flex-1 text-center">Fri</div>
        <div className="weekday flex-1 text-center">Sat</div>
        <div className="weekday flex-1 text-center">Sun</div>
      </div>

      {/* Render the weeks */}
      {Array.from({ length: 5 }).map((_, weekIndex) => (
        <div key={weekIndex} className="week flex border-b border-gray-300 pt-2">
          {/* ... rest of the week code ... */}
          <div className="weeknumber w-8 text-center">{weekIndex + 1}</div>
          {Array.from({ length: 7 }).map((_, dayIndex) => {
              // ... rest of the day code ...
              if (weekIndex === 0 && dayIndex < firstDayOfMonth - 1) {
                // Empty cells before the first day of the month
                return <div key={dayIndex} className="day flex-1 text-center text-gray-700 bg-gray-300"></div>;
              } else if (dayCounter > totalDaysInMonth) {
                // Empty cells after the last day of the month
                return <div key={dayIndex} className="day flex-1 text-center text-gray-700 bg-gray-300"></div>;
              } else {
                // Render the day
                const currentDate = new Date(month.getFullYear(), month.getMonth(), dayCounter);
                const isBooked = bookedDates.some(date =>
                  date.getFullYear() === currentDate.getFullYear() &&
                  date.getMonth() === currentDate.getMonth() &&
                  date.getDate() === currentDate.getDate()
                );

                return (
                  <button
                    key={dayIndex}
                    className={`day flex-1 text-center ${isBooked ? 'bg-blue-200 shadow-md' : ''}`}
                    onClick={() => handleDayClick(currentDate)}
                  >
                    {dayCounter++}
                  </button>
                );
            }
          })}
        </div>
      ))}

      {/* Popup view for selected date */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h3 className="text-lg font-bold mb-2">
              Booked times for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <ul>
              {bookedDates
                .filter(date =>
                  date.getFullYear() === selectedDate.getFullYear() &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getDate() === selectedDate.getDate()
                )
                .map((date, index) => (
                  <li key={index}>{format(date, 'hh:mm a')}</li> // make sure your booked dates have correct hours and minutes
                ))}
            </ul>
            <button onClick={() => setSelectedDate(null)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default CalendarMonth;
