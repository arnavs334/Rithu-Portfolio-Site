import { SiTiktok, SiSoundcloud } from "@icons-pack/react-simple-icons";
import heroImage from "@/assets/press-hero.webp";

const HeroSection = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center overflow-hidden"
  >
    {/* keep her face right of center so the left column stays clear for text */}
    <img
      src={heroImage}
      alt="Rithu press shot"
      className="absolute inset-0 h-full w-full object-cover object-[70%_20%]"
      {...({ fetchpriority: "high" } as Record<string, string>)}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8">
      <div className="flex max-w-xl flex-col items-start gap-6 text-left">
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
      </div>
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

export default HeroSection;
