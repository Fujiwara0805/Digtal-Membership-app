"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookingStore } from "@/store/booking-store";
import { addDays, isBefore, startOfToday } from "date-fns";

export function BookingCalendar() {
  const today = startOfToday();
  const { selectedDate, setSelectedDate, availableTimeSlots, fetchAvailableTimeSlots } = useBookingStore();
  const [monthInView, setMonthInView] = useState<Date>(today);

  // Dummy function to simulate fetching available days
  const getAvailableDays = (month: Date) => {
    // In a real app, this would come from the database
    // For now, we'll just mark the next 15 days as available
    const availableDays: Date[] = [];
    const startDay = today;
    
    for (let i = 0; i < 15; i++) {
      availableDays.push(addDays(startDay, i));
    }
    
    return availableDays;
  };

  const availableDays = getAvailableDays(monthInView);

  const handleSelect = (date?: Date) => {
    if (date) {
      setSelectedDate(date);
      fetchAvailableTimeSlots(date);
    }
  };

  const disabledDays = {
    before: today,
    after: addDays(today, 30),
    dayOfWeek: [0], // Closed on Sundays
  };

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif gold-text">Select Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          onMonthChange={setMonthInView}
          disabled={disabledDays}
          modifiers={{
            available: availableDays,
          }}
          modifiersStyles={{
            available: {
              fontWeight: 'bold',
            },
          }}
          className="rounded-md border"
        />

        <div className="mt-6">
          <h3 className="font-medium mb-2">Available Times</h3>
          {selectedDate ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="text-center py-2 border rounded-md hover:bg-primary/10 cursor-pointer transition-colors"
                  >
                    {slot}
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-6 text-muted-foreground">
                  No available times on selected date
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Please select a date to view available times
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}