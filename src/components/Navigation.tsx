import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#music", label: "Music" },
  { href: "#mix", label: "Mix" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navVisible = useScrollDirection();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActiveSection((prev) => {
          let next = prev;
          for (const entry of entries) {
            if (entry.isIntersecting) next = entry.target.id;
            else if (entry.target.id === next) next = null;
          }
          return next;
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const { href } of navLinks) {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const shown = navVisible || isMobileMenuOpen;

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: shown ? 0 : -88 }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-background/85 via-background/40 to-transparent"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="#home" className="flex items-center" aria-label="Back to top">
            <motion.span
              initial={false}
              animate={{ opacity: isPastHero ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-lg font-extrabold tracking-widest text-foreground"
            >
              RITHU
            </motion.span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative font-display text-xs font-medium uppercase tracking-[0.25em] transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={
                        prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 35 }
                      }
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              className="rounded-full bg-primary px-4 py-1.5 font-display text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book Now
            </a>
          </div>

          <button
            className="p-2 md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-20 bg-background/40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-0 top-0 z-30 rounded-b-2xl border-b border-white/10 bg-background/70 pb-8 pt-20 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="container mx-auto flex flex-col px-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.05 + index * 0.05 }}
                    className="py-3 font-display text-2xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
