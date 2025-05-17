"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMembershipStore } from "@/store/membership-store";
import { CalendarClock, Clock, Users, MapPin } from "lucide-react";
import { format } from "date-fns";

export function BookingHistory() {
  const { pastReservations, upcomingReservations } = useMembershipStore();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif gold-text">Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingReservations.length === 0 ? (
              <div className="text-center py-6">
                <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground">No upcoming reservations</p>
                <Button className="mt-4" size="sm">Book a Table</Button>
              </div>
            ) : (
              upcomingReservations.map((booking, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg bg-card/50 flex flex-col md:flex-row justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Reservation #{booking.id}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarClock className="h-4 w-4 mr-2" />
                        {format(new Date(booking.date), "EEEE, MMMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {booking.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-4 flex items-end flex-col justify-end">
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive mt-2">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastReservations.length === 0 ? (
              <div className="text-center py-6">
                <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground">No past reservations</p>
              </div>
            ) : (
              pastReservations.map((booking, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg bg-card/50 flex flex-col md:flex-row justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Reservation #{booking.id}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarClock className="h-4 w-4 mr-2" />
                        {format(new Date(booking.date), "EEEE, MMMM d, yyyy")}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {booking.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}