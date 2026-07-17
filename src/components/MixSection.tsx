import { useEffect, useState } from "react";

const MIX_URL = "https://soundcloud.com/sparkleunicorn999/hyperpopish-mix";
const PROFILE_URL = "https://soundcloud.com/sparkleunicorn999";
const EMBED_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  MIX_URL
)}&color=%238b8bff&auto_play=false&hide_related=true&show_comments=false&show_teaser=false&visual=true`;

const MixSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <section id="mix" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="section-heading">Mix</h2>
      <div className="mt-8">
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
      </div>
    </section>
  );
};

export default MixSection;
