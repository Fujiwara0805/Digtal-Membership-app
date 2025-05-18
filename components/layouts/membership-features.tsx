"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassWater, CalendarCheck, Clock, Gift, FileLock as Cocktail } from "lucide-react";
import { i18n } from "@/lib/i18n";

export function MembershipFeatures() {
  const features = [
    {
      icon: GlassWater,
      title: i18n.translations.ja.home.features.items.access,
      description: i18n.translations.ja.home.features.items.accessDescription
    },
    {
      icon: CalendarCheck,
      title: i18n.translations.ja.home.features.items.reservations,
      description: i18n.translations.ja.home.features.items.reservationsDescription
    },
    {
      icon: Cocktail,
      title: i18n.translations.ja.home.features.items.selection,
      description: i18n.translations.ja.home.features.items.selectionDescription
    },
    {
      icon: Clock,
      title: i18n.translations.ja.home.features.items.hours,
      description: i18n.translations.ja.home.features.items.hoursDescription
    },
    {
      icon: Gift,
      title: i18n.translations.ja.home.features.items.privileges,
      description: i18n.translations.ja.home.features.items.privilegesDescription
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
            {i18n.translations.ja.home.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {i18n.translations.ja.home.features.subtitle}
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