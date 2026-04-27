import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

/**
 * Página principal — wrapper simples que aplica o fundo `hero-bg`
 * (o tom mais escuro da paleta) e empilha Navbar + Hero.
 */
export default function Index() {
  return (
    <div className="bg-hero-bg min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
