"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <div className="py-24 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1536356/pexels-photo-1536356.jpeg"
          alt="Luxury Bar Interior"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 font-serif gold-text"
          >
            Experience Unparalleled Luxury
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl mb-8 text-muted-foreground"
          >
            Join our exclusive membership and elevate your social experience with premium service, rare spirits, and a sophisticated atmosphere.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <Link href="/membership">Become a Member</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/booking">Book a Visit</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}