import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#music", label: "Music" },
  { href: "#mix", label: "Mix" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setIsPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#home"
          aria-hidden={!isPastHero}
          tabIndex={isPastHero ? 0 : -1}
          className={`font-display text-lg font-extrabold tracking-widest text-foreground transition-opacity duration-300 hover:text-primary ${
            isPastHero ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          RITHU
        </a>
        <ul className="flex items-center gap-4 sm:gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary sm:text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
