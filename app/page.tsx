import { HeroSection } from '@/components/layouts/hero-section';
import { MembershipFeatures } from '@/components/layouts/membership-features';
import { FeaturedEvents } from '@/components/layouts/featured-events';
import { CTASection } from '@/components/layouts/cta-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MembershipFeatures />
      <FeaturedEvents />
      <CTASection />
    </div>
  );
}