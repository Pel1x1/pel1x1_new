import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechSection from '@/components/TechSection';
import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import FooterSection from '@/components/FooterSection';
import ScrollEngine from '@/components/ScrollEngine';
import { Analytics } from '@vercel/analytics/react';

export default function Index() {
  return (
    <>
      <Analytics />
      <NavBar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <div className="section-sep" />
        <AboutSection />
        <div className="section-sep" />
        <TechSection />
        <div className="section-sep" />
        <ProcessSection />
        <div className="section-sep" />
        <PricingSection />
        <div className="section-sep" />
        <TestimonialsSection />
        <div className="section-sep" />
        <ProjectsCarousel />
        <div className="section-sep" />
        <FooterSection />
      </main>
      <ScrollEngine />
    </>
  );
}
