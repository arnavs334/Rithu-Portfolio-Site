import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const MIX_URL = "https://soundcloud.com/sparkleunicorn999/hyperpopish-mix";
const PROFILE_URL = "https://soundcloud.com/sparkleunicorn999";
const EMBED_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  MIX_URL
)}&color=%238b8bff&auto_play=false&hide_related=true&show_comments=false&show_teaser=false&visual=true`;

const MixSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // The iframe is lazy-loaded, so it only starts fetching once the section
  // nears the viewport — the fallback timer must not start before then, or
  // it swaps in the link before the embed ever had a chance to load.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || loaded) return;
    const timer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [visible, loaded]);

  return (
    <section id="mix" ref={sectionRef} className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Reveal>
          <h2 className="section-heading">Mix</h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
        {failed ? (
          <a
            href={MIX_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-40 items-center justify-center rounded-xl border border-border bg-card text-lg font-bold text-primary transition-colors hover:border-primary"
          >
            ▶ Listen to the Hyperpopish Mix on SoundCloud
          </a>
        ) : (
          <iframe
            title="Hyperpopish Mix on SoundCloud"
            width="100%"
            height="400"
            allow="autoplay"
            loading="lazy"
            src={EMBED_SRC}
            onLoad={() => setLoaded(true)}
            className="rounded-xl border border-border"
          />
        )}
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          More on SoundCloud →
        </a>
        </Reveal>
      </div>
    </section>
  );
};

export default MixSection;
