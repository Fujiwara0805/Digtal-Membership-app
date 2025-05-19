"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, GlassWater, Club } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { i18n } from "@/lib/i18n";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-section-background.jpg"
          alt="Guildのヒーローセクション背景画像 - 温かみのある酒場の風景"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Club className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-serif tracking-wider">
                  <span className="text-[#2E3E35] dark:text-[#cb7229]">
                    {i18n.translations.ja.home.hero.exclusiveMembership}
                  </span>
                </h2>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif"
                  dangerouslySetInnerHTML={{ __html: i18n.translations.ja.home.hero.privateHaven.replace('プライベートな隠れ家', '<span class="gold-text">プライベートな隠れ家</span>') }}
              >
                {/* A Private <span className="gold-text">Haven</span> For The Discerning */}
              </h1>

              <p className="text-lg text-[#2E3E35] dark:text-[#cb7229] mb-8 max-w-xl">
                {i18n.translations.ja.home.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/membership">
                    {i18n.translations.ja.home.hero.viewMembership} <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/booking">
                    {i18n.translations.ja.home.hero.makeReservation}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            {/* Decorative element */}
            <div className="relative w-[400px] h-[500px]">
              <div className="membership-card w-full h-full opacity-90 rotate-3" />
              <div className="membership-card w-full h-full absolute top-6 -left-6 opacity-70 -rotate-6" />
              <div className="membership-card w-full h-full absolute -top-6 left-6 shadow-xl">
                <div className="card-content p-8 flex flex-col items-center justify-center h-full">
                  <Club className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-2 font-serif text-center gold-text">
                    {i18n.translations.ja.home.hero.digitalMembership}
                  </h3>
                  <p className="text-center text-muted-foreground mb-6">
                    {i18n.translations.ja.home.hero.digitalPass}
                  </p>
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-xs text-center text-muted-foreground">{i18n.translations.ja.home.hero.qrCode}</span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {i18n.translations.ja.home.hero.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}