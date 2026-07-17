import { motion, useReducedMotion } from "framer-motion";
import { SiTiktok, SiSoundcloud } from "@icons-pack/react-simple-icons";
import heroImage from "@/assets/press-hero.webp";

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
  <section
    id="home"
    className="relative flex min-h-screen items-end overflow-hidden"
  >
    {/* image is oversized and pinned right so she sits clear of the
       bottom-left text block */}
    <img
      src={heroImage}
      alt="Rithu press shot"
      className="absolute inset-y-0 left-0 h-full w-[115%] max-w-none object-cover object-top"
      {...({ fetchpriority: "high" } as Record<string, string>)}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/10 to-background" />
    <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/10 to-transparent" />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-8 sm:pb-28">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex max-w-xl flex-col items-start gap-6 text-left"
      >
      <h1
        data-text="RITHU"
        className="glitch font-display text-6xl font-black tracking-tight sm:text-8xl md:text-9xl"
      >
        RITHU
      </h1>
      <p className="text-sm uppercase tracking-[0.4em] text-foreground/80 sm:text-base">
        DJ · Hyperpop · ATL ⇄ LA
      </p>
      <div className="flex gap-5">
        <a
          href="https://www.tiktok.com/@rithu.h"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className="icon-link"
        >
          <SiTiktok size={22} />
        </a>
        <a
          href="https://soundcloud.com/sparkleunicorn999"
          target="_blank"
          rel="noreferrer"
          aria-label="SoundCloud"
          className="icon-link"
        >
          <SiSoundcloud size={22} />
        </a>
      </div>
      </motion.div>
    </div>
    <a
      href="#about"
      aria-label="Scroll to about section"
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-primary"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </a>
  </section>
  );
};

export default HeroSection;
