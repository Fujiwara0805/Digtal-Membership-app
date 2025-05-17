"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export function PrivacySettings() {
  return (
    <Card className="border-primary/10">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Control your data and how your information is used
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility" className="font-medium">
                  Profile Visibility
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow other members to see your profile
                </p>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reservation-history" className="font-medium">
                  Reservation History
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow staff to view your past reservations to personalize service
                </p>
              </div>
              <Switch id="reservation-history" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="preference-tracking" className="font-medium">
                  Preference Tracking
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow tracking of your preferences to improve recommendations
                </p>
              </div>
              <Switch id="preference-tracking" defaultChecked />
            </div>

            <Separator />

            <h3 className="text-base font-medium pt-2">Data Management</h3>

            <div>
              <Label htmlFor="data-retention" className="font-medium block mb-2">
                Data Retention Period
              </Label>
              <Select defaultValue="indefinite">
                <SelectTrigger className="w-full md:w-80">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1year">1 year after last activity</SelectItem>
                  <SelectItem value="2years">2 years after last activity</SelectItem>
                  <SelectItem value="3years">3 years after last activity</SelectItem>
                  <SelectItem value="5years">5 years after last activity</SelectItem>
                  <SelectItem value="indefinite">Indefinite (until account closure)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                How long we keep your data after your last interaction with our services
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-analytics" className="font-medium">
                  Data Analytics
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymized data to be used for service improvements
                </p>
              </div>
              <Switch id="data-analytics" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="third-party-sharing" className="font-medium">
                  Third-Party Sharing
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow sharing data with trusted partners
                </p>
              </div>
              <Switch id="third-party-sharing" />
            </div>
          </div>

          <Separator />

          <div className="pt-2">
            <h3 className="text-base font-medium mb-3">Account Actions</h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="outline">Download My Data</Button>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                Delete My Account
              </Button>
            </div>
            
            <div className="mt-4 p-4 border border-yellow-500/20 rounded-md bg-yellow-500/5 flex gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Deleting your account will permanently remove all your data, including reservation history and membership status. This action cannot be undone.
              </p>
            </div>
          </div>

          <Button className="w-full md:w-auto mt-6">
            Save Privacy Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}