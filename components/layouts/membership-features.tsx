"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassWater, CalendarCheck, Clock, Gift, FileLock as Cocktail } from "lucide-react";

export function MembershipFeatures() {
  const features = [
    {
      icon: GlassWater,
      title: "Exclusive Access",
      description: "Enjoy priority entry to our establishment and access to members-only areas and events."
    },
    {
      icon: CalendarCheck,
      title: "Priority Reservations",
      description: "Reserve your preferred seating with dedicated member reservation slots."
    },
    {
      icon: Cocktail,
      title: "Curated Selection",
      description: "Experience our constantly evolving menu of rare spirits and signature cocktails."
    },
    {
      icon: Clock,
      title: "Extended Hours",
      description: "Access to extended hours beyond our regular operating times."
    },
    {
      icon: Gift,
      title: "Member Privileges",
      description: "Receive special treatment, complimentary tastings, and birthday celebrations."
    }
  ];

  return (
    <div className="py-24 luxury-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 font-serif gold-text"
          >
            Membership Privileges
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the exceptional benefits available exclusively to our esteemed members
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-primary/10 h-full">
                <CardHeader className="pb-2">
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-serif">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}