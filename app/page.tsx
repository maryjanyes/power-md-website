import HeroSection from '@/lib/components/home/HeroSection';
import CategoryShowcase from '@/lib/components/home/CategoryShowcase';
import FeaturesStrip from '@/lib/components/home/FeaturesStrip';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesStrip />
      <CategoryShowcase />
    </>
  );
}
