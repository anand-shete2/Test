import { Toaster } from "@/components/ui/sonner";
import { OurBlogs, HeroSection, FAQSection, FeaturesSection } from "@/components/Landing";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OurBlogs />
      <FeaturesSection />
      <FAQSection />
      <Toaster />
    </>
  );
}
