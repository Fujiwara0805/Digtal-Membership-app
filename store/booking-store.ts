"use client";

import { create } from "zustand";
import { addDays, format } from "date-fns";

interface BookingState {
  selectedDate: Date | undefined;
  availableTimeSlots: string[];
  setSelectedDate: (date: Date) => void;
  fetchAvailableTimeSlots: (date: Date) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedDate: undefined,
  availableTimeSlots: [],
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  fetchAvailableTimeSlots: (date) => {
    // In a real app, this would call an API to get available time slots
    // For demo purposes, we'll generate some random slots
    const today = new Date();
    
    // If the selected date is today, only show times in the future
    const currentHour = today.getHours();
    
    // Generate available time slots (normally would come from the API)
    let timeSlots: string[] = [];
    const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    
    // Hours the bar is open (5 PM to 2 AM)
    const openingHour = 17; // 5 PM
    const closingHour = 26; // 2 AM (represented as 26 for easier calculation)
    
    // For weekends (Friday and Saturday), the bar stays open until 3 AM
    const isWeekend = date.getDay() === 5 || date.getDay() === 6; // Friday or Saturday
    const extendedClosingHour = isWeekend ? 27 : 26; // 3 AM if weekend
    
    // Generate time slots every 30 minutes
    for (let hour = openingHour; hour < extendedClosingHour; hour++) {
      for (let minute of [0, 30]) {
        // If it's today, only show future time slots
        if (isToday && hour <= currentHour && minute <= today.getMinutes()) {
          continue;
        }
        
        const displayHour = hour % 24;
        const period = displayHour >= 12 ? 'PM' : 'AM';
        const formattedHour = displayHour > 12 ? displayHour - 12 : displayHour === 0 ? 12 : displayHour;
        const formattedMinute = minute === 0 ? '00' : minute;
        
        const timeSlot = `${formattedHour}:${formattedMinute} ${period}`;
        timeSlots.push(timeSlot);
      }
    }
    
    // Randomize availability to simulate real-world scenarios
    // In a real app, this would come from the API based on actual availability
    timeSlots = timeSlots.filter(() => Math.random() > 0.3);
    
    set({ availableTimeSlots: timeSlots });
  }
}));