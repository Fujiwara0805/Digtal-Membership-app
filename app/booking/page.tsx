'use client';

import { BookingCalendar } from '@/components/booking/booking-calendar';
import { BookingForm } from '@/components/booking/booking-form';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { i18n } from '@/lib/i18n';

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif gold-text">
          {i18n.translations.ja.booking.title}
        </h1>
        <p className="text-muted-foreground">
          {i18n.translations.ja.booking.subtitle}
        </p>
      </motion.div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <BookingCalendar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <BookingForm />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 pt-6 border-t"
      >
        <h2 className="text-xl font-semibold mb-4">{i18n.translations.ja.booking.cancellationPolicy}</h2>
        <p className="text-muted-foreground mb-2">
          • {i18n.translations.ja.booking.cancellationRules.rule1}
        </p>
        <p className="text-muted-foreground mb-2">
          • {i18n.translations.ja.booking.cancellationRules.rule2}
        </p>
        <p className="text-muted-foreground">
          • {i18n.translations.ja.booking.cancellationRules.rule3}
        </p>
      </motion.div>
    </div>
  );
}