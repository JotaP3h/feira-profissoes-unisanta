import { Button } from "@/components/ui/button";

/**
 * Navbar fixa, transparente, com blur — flutua sobre a cena Spline.
 *
 * Layout:
 *   [SENTINEL]    [Services About Projects ...]    [Get Quote]
 *
 * Em mobile (< md), os links centrais e o CTA ficam ocultos
 * (sem hamburger por design — a hero comunica tudo o que importa).
 */
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contacts", href: "#contacts" },
] as const;

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 backdrop-blur-md bg-hero-bg/40 border-b border-border/40">
      {/* Logo */}
      <a
        href="#top"
        className="text-foreground text-xl font-semibold tracking-tight pointer-events-auto"
      >
        SENTINEL<span className="text-primary">.</span>
      </a>

      {/* Links centrais */}
      <ul className="hidden md:flex gap-8 pointer-events-auto">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant="navCta"
        size="lg"
        className="hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6 pointer-events-auto"
      >
        Get Quote
      </Button>
    </nav>
  );
}
