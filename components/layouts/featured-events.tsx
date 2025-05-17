"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export function FeaturedEvents() {
  const events = [
    {
      title: "Rare Whisky Tasting",
      date: "May 15, 2025",
      description: "An exclusive tasting event featuring rare and limited edition whisky selections.",
      image: "https://images.pexels.com/photos/4667148/pexels-photo-4667148.jpeg"
    },
    {
      title: "Mixology Masterclass",
      date: "June 2, 2025",
      description: "Learn the art of crafting exceptional cocktails from our master mixologists.",
      image: "https://images.pexels.com/photos/8978899/pexels-photo-8978899.jpeg"
    },
    {
      title: "Jazz & Cocktails Night",
      date: "June 18, 2025",
      description: "An evening of smooth jazz and perfectly paired signature cocktails.",
      image: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg"
    }
  ];

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 font-serif gold-text"
          >
            Upcoming Exclusive Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Members gain priority access to our curated calendar of exceptional experiences
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden border-primary/10 h-full flex flex-col">
                <div className="aspect-video relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6 flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-serif">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Reserve Spot</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}