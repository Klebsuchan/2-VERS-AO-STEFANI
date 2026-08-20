import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Helmet } from "react-helmet-async";
import { Header, Footer } from "./components/Navigation";
import { HeroSection } from "./sections/HeroSection";
import { CameraShowcaseSection } from "./sections/CameraShowcaseSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { BehindTheScenesSection } from "./sections/BehindTheScenesSection";
import { ServicesSection } from "./sections/ServicesSection";
import { AboutMeSection } from "./sections/AboutMeSection";
import { AboutSection } from "./sections/AboutSection";
import { BudgetBuilderSection } from "./sections/BudgetBuilderSection";
import { FAQSection } from "./sections/FAQSection";
import { ClientSection } from "./sections/ClientSection";
import { ClientPortal } from "./sections/ClientPortal";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { InstagramSection } from "./sections/InstagramSection";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { PremiumBadge } from "./components/PremiumBadge";
import { BackToTop } from "./components/BackToTop";
import { Marquee } from "./components/Marquee";
import { Preloader } from "./components/Preloader";
import { PolicyModals } from "./components/PolicyModals";
import { TypographyQuoteSection } from "./sections/TypographyQuoteSection";

export default function App() {
  const [view, setView] = useState("home");
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div
      className={`min-h-screen font-sans selection:bg-brand-yellow selection:text-black relative ${loading ? "h-screen overflow-hidden" : ""}`}
    >
      <Helmet>
        <title>Detalhes Art Fotografia | Passo Fundo, RS</title>
        <meta name="description" content="Eternizando momentos e elevando a imagem da sua marca através de uma fotografia autêntica, elegante e focada em resultados. Fotógrafa em Passo Fundo e região." />
        <meta property="og:title" content="Detalhes Art Fotografia" />
        <meta property="og:description" content="Fotografia autêntica, elegante e focada em resultados. Ensaios, casamentos e fotografia corporativa em Passo Fundo, RS." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ais-pre-y4b337l64dmifbhfjnqszv-385994013673.us-east1.run.app/hero.jpg?v=2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Detalhes Art Fotografia" />
        <meta name="twitter:description" content="Fotografia autêntica, elegante e focada em resultados. Ensaios, casamentos e fotografia corporativa em Passo Fundo, RS." />
        <meta name="twitter:image" content="https://ais-pre-y4b337l64dmifbhfjnqszv-385994013673.us-east1.run.app/hero.jpg?v=2" />
      </Helmet>
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <FloatingWhatsApp />
      <PremiumBadge />
      <BackToTop />
      <Header setView={setView} />
      {view === "home" && (
        <main className="relative z-10">
          <HeroSection />
          <CameraShowcaseSection />
          <TypographyQuoteSection />
          <Marquee />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <Marquee />
          <AboutMeSection />
          <BehindTheScenesSection />
          <AboutSection />
          <InstagramSection />
          <BudgetBuilderSection />
          <FAQSection />
          <ClientSection />
        </main>
      )}
      {view === "portal" && (
        <main className="pt-24 relative z-10">
          <ClientPortal setView={setView} />
        </main>
      )}
      <Footer onOpenPolicy={setActiveModal} />
      <PolicyModals activeModal={activeModal} onClose={() => setActiveModal(null)} onOpen={setActiveModal} />
    </div>
  );
}
