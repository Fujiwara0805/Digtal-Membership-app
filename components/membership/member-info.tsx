"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMembershipStore } from "@/store/membership-store";
import { motion } from "framer-motion";
import { User, CreditCard, CalendarClock, MapPin } from "lucide-react";
import Link from "next/link";

export function MemberInfo() {
  const { memberDetails, upcomingReservations } = useMembershipStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif gold-text">Member Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={memberDetails.avatar} />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">{memberDetails.name}</h3>
              <p className="text-muted-foreground">{memberDetails.email}</p>
              <div className="mt-1">
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {memberDetails.type}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Membership Status</p>
                <p className="text-sm text-muted-foreground">Active until {memberDetails.validUntil}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CalendarClock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Upcoming Reservations</p>
                <p className="text-sm text-muted-foreground">
                  {upcomingReservations.length ? 
                    `${upcomingReservations.length} reservation(s) scheduled` : 
                    'No upcoming reservations'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Preferred Location</p>
                <p className="text-sm text-muted-foreground">{memberDetails.preferredLocation}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Button variant="outline" asChild className="w-full">
              <Link href="/profile">
                Edit Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}