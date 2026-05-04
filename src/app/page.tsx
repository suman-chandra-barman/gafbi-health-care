/** @format */

import HeroSection from "@/components/LandingPageComponents/HeroSection";
import CareBoxSection from "@/components/LandingPageComponents/CareBoxSection";
import AboutSection from "@/components/LandingPageComponents/AboutSection";
import ClientsReviewSection from "@/components/LandingPageComponents/ClientsReviewSection";
import ProductsSection from "@/components/LandingPageComponents/ProductsSection";
import ServicesSection from "@/components/LandingPageComponents/ServicesSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] font-sans">
      <HeroSection />
      <CareBoxSection />
      <AboutSection />
      <ClientsReviewSection />
      <ProductsSection />
      <ServicesSection />
    </div>
  );
}
