import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { SubscribeSection } from '@/components/landing/SubscribeSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <SubscribeSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
