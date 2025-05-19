"use client";

import './globals.css';
import { Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from '@/components/layouts/navigation';
import { TanStackProvider } from '@/components/providers/tanstack-provider';
import { i18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/layouts/splash-screen'; // 作成したスプラッシュ画面

// Remove variable font loading which can be problematic
const inter = {
  variable: '--font-inter'
};

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'serif']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoadingSplash, setIsLoadingSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingSplash(false);
    }, 2500); // 2.5秒表示

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  return (
    <html lang={i18n.defaultLocale} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        {isLoadingSplash ? (
          <SplashScreen />
        ) : (
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TanStackProvider>
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-1 pt-20">
                  {children}
                </main>
              </div>
              <Toaster />
            </TanStackProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}