"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMembershipStore } from "@/store/membership-store";
import { User, Upload } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  preferredLocation: z.string(),
  dietary: z.string().optional(),
  alcoholPreference: z.string().optional(),
  bio: z.string().optional(),
});

export function ProfileForm() {
  const { memberDetails, updateMemberDetails } = useMembershipStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: memberDetails.name,
      email: memberDetails.email,
      phone: memberDetails.phone || "",
      preferredLocation: memberDetails.preferredLocation,
      dietary: memberDetails.preferences?.dietary || "",
      alcoholPreference: memberDetails.preferences?.alcoholPreference || "",
      bio: memberDetails.bio || "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateMemberDetails({
      ...memberDetails,
      name: data.name,
      email: data.email,
      phone: data.phone,
      preferredLocation: data.preferredLocation,
      preferences: {
        dietary: data.dietary,
        alcoholPreference: data.alcoholPreference,
      },
      bio: data.bio,
    });
    
    // This would normally save to the database
    console.log("Profile updated:", data);
  };

  return (
    <Card className="border-primary/10">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={memberDetails.avatar} />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="h-3 w-3 mr-1" /> Change Avatar
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="uptown">Uptown</SelectItem>
                        <SelectItem value="midtown">Midtown</SelectItem>
                        <SelectItem value="harbor">Harbor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preferences</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select dietary preferences" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No special requirements</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                        <SelectItem value="pescatarian">Pescatarian</SelectItem>
                        <SelectItem value="kosher">Kosher</SelectItem>
                        <SelectItem value="halal">Halal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alcoholPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcohol Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred spirit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No preference</SelectItem>
                        <SelectItem value="whiskey">Whiskey</SelectItem>
                        <SelectItem value="bourbon">Bourbon</SelectItem>
                        <SelectItem value="scotch">Scotch</SelectItem>
                        <SelectItem value="gin">Gin</SelectItem>
                        <SelectItem value="vodka">Vodka</SelectItem>
                        <SelectItem value="rum">Rum</SelectItem>
                        <SelectItem value="tequila">Tequila</SelectItem>
                        <SelectItem value="mezcal">Mezcal</SelectItem>
                        <SelectItem value="wine">Wine</SelectItem>
                        <SelectItem value="champagne">Champagne</SelectItem>
                        <SelectItem value="non-alcoholic">Non-Alcoholic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About You</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}