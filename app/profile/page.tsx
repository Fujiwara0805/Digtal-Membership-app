'use client';

import { ProfileForm } from '@/components/profile/profile-form';
import { NotificationSettings } from '@/components/profile/notification-settings';
import { PrivacySettings } from '@/components/profile/privacy-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { i18n } from '@/lib/i18n';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif gold-text">
          {i18n.translations.ja.profile.title}
        </h1>
        <p className="text-muted-foreground">
          {i18n.translations.ja.profile.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">{i18n.translations.ja.profile.tabs.profile}</TabsTrigger>
            <TabsTrigger value="notifications">{i18n.translations.ja.profile.tabs.notifications}</TabsTrigger>
            <TabsTrigger value="privacy">{i18n.translations.ja.profile.tabs.privacy}</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}