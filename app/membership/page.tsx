'use client';

import { MembershipCard } from '@/components/membership/membership-card';
import { MemberInfo } from '@/components/membership/member-info';
import { Button } from '@/components/ui/button';
import { BookingHistory } from '@/components/membership/booking-history';
import { motion } from 'framer-motion';
import { i18n } from '@/lib/i18n';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif gold-text">
          {i18n.translations.ja.membership.title}
        </h1>
        <p className="text-muted-foreground">
          {i18n.translations.ja.membership.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <MemberInfo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 flex flex-col"
        >
          <div className="flex justify-center mb-8 lg:mb-12">
            <MembershipCard />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BookingHistory />
          </motion.div>

          <div className="mt-8 flex justify-center lg:justify-end gap-4">
            <Button variant="outline" className="border-primary/20 hover:border-primary/50" asChild>
              <Link href="/profile">{i18n.translations.ja.common.membershipSettings}</Link>
            </Button>
            <Button asChild>
              <Link href="/booking">{i18n.translations.ja.common.bookTable}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}