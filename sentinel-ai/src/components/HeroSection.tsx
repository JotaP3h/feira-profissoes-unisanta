import { lazy, Suspense } from "react";

/**
 * O componente Spline é pesado (engine WebGL + assets do scene). Lazy
 * load via React.lazy mantém o bundle inicial enxuto e permite que a
 * UI textual já apareça enquanto a cena 3D carrega em background.
 */
const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * URL exata da cena Spline usada no hero. A cena é hospedada na CDN
 * pública do Spline, então não precisamos de credenciais.
 */
const SPLINE_SCENE_URL =
  "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";

/**
 * HeroSection
 *
 * Estrutura:
 *   <section> (full-screen)
 *     ├── Spline 3D em fundo absoluto (fallback enquanto carrega)
 *     ├── Overlay escuro para contraste com o conteúdo
 *     └── Conteúdo textual no canto inferior-esquerdo, com stagger
 *
 * O contêiner do conteúdo tem `pointer-events-none` para que o usuário
 * possa interagir com a cena Spline (orbit, click, etc.). Os botões
 * reativam clique com `pointer-events-auto`.
 */
export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden"
    >
      {/* Cena Spline 3D em fundo */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-hero-bg grid-bg animate-fade-in" />
          }
        >
          <Spline scene={SPLINE_SCENE_URL} className="w-full h-full" />
        </Suspense>
      </div>

      {/* Overlay para garantir contraste do texto sobre o 3D */}
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

      {/* Glow de cor TechFair (radial ciano→roxo) — sutil */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 0% 100%, hsl(187 95% 53% / 0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 100% 0%, hsl(271 91% 65% / 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Conteúdo do hero */}
      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-10 md:pb-10 pt-32">
        {/* Heading */}
        <h1
          className="opacity-0 animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase"
          style={{ animationDelay: "0.2s" }}
        >
          SENTINEL <span className="text-gradient-cyan-purple">AI</span>
        </h1>

        {/* Subheading */}
        <p
          className="opacity-0 animate-fade-up text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6"
          style={{ animationDelay: "0.4s" }}
        >
          We implement security correctly.
        </p>

        {/* Descrição */}
        <p
          className="opacity-0 animate-fade-up text-muted-foreground text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8"
          style={{ animationDelay: "0.55s" }}
        >
          Enterprise security systems built in days. AI-powered surveillance
          deployed with zero-trust architecture. Smart access control set up
          for your entire facility. All of it done right, not just fast.
        </p>

        {/* CTAs — usam <button> nativo para garantir clique através
            do contêiner pointer-events-none. */}
        <div
          className="opacity-0 animate-fade-up flex flex-wrap gap-3 font-bold"
          style={{ animationDelay: "0.7s" }}
        >
          <button
            type="button"
            className="pointer-events-auto bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97] uppercase tracking-widest"
          >
            Book a Call
          </button>
          <button
            type="button"
            className="pointer-events-auto bg-white text-background px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-90 transition-all active:scale-[0.97] uppercase tracking-widest"
          >
            Our Work
          </button>
        </div>

        {/* Linha de credibilidade */}
        <p
          className="opacity-0 animate-fade-up text-muted-foreground/60 text-xs font-light mt-4 md:mt-6"
          style={{ animationDelay: "0.85s" }}
        >
          Trusted security partner. Santos, SP. 12 systems deployed.
        </p>
      </div>
    </section>
  );
}
