"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function NotificationSettings() {
  return (
    <Card className="border-primary/10">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure how you want to be notified about bar events and reservations
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via text message
                </p>
              </div>
              <Switch id="sms-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications on your device
                </p>
              </div>
              <Switch id="push-notifications" />
            </div>

            <Separator />

            <h3 className="text-base font-medium pt-2">Notification Types</h3>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reservation-updates" className="font-medium">
                  Reservation Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Confirmations, reminders, and changes
                </p>
              </div>
              <Switch id="reservation-updates" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="member-events" className="font-medium">
                  Member Events
                </Label>
                <p className="text-sm text-muted-foreground">
                  Special events and exclusive tastings
                </p>
              </div>
              <Switch id="member-events" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotional-offers" className="font-medium">
                  Promotional Offers
                </Label>
                <p className="text-sm text-muted-foreground">
                  Special member discounts and promotions
                </p>
              </div>
              <Switch id="promotional-offers" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="account-updates" className="font-medium">
                  Account Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Membership status, renewals, and billing
                </p>
              </div>
              <Switch id="account-updates" defaultChecked />
            </div>
          </div>

          <Button className="w-full md:w-auto mt-6">
            Save Notification Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}