"use client";

import { motion } from "framer-motion";
import { Club } from "lucide-react"; // Flame を Club に変更
import { i18n } from "@/lib/i18n"; // i18nを使用する場合

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2F2A28]" // ダークテーマの背景色を直接指定
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center"
      >
        <Club className="h-24 w-24 text-[hsl(var(--accent))]" /> {/* Flame を Club に変更 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 text-[32px] font-serif font-bold text-[#c1c3c6]"
        >
          Guild
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-2 text-[24px] text-[#c1c3c6]"
        >
          {/* i18n.translations.ja.home.hero.subtitle の一部など、キャッチーなフレーズ */}
          旅人たちの物語が交わる場所へ…
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
