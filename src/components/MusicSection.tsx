import Reveal from "@/components/Reveal";

const SPOTIFY_TRACK_URL = "https://open.spotify.com/track/1oQYHiUjFq94VHTkXlz8tH";
const SPOTIFY_EMBED_SRC = "https://open.spotify.com/embed/track/1oQYHiUjFq94VHTkXlz8tH";

const soundcloudTracks = [
  {
    title: "softcrush",
    url: "https://soundcloud.com/sparkleunicorn999/softcrush",
  },
  {
    title: "club classics x 4raws",
    url: "https://soundcloud.com/sparkleunicorn999/clubclassicsx4raws",
  },
];

const soundcloudEmbedSrc = (url: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%238b8bff&auto_play=false&hide_related=true&show_comments=false&show_teaser=false`;

const MusicSection = () => (
  <section id="music" className="bg-wash-magenta scroll-mt-16">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <Reveal>
        <h2 className="section-heading">Music</h2>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
          New single
        </p>
        <iframe
          title="Rithu's new single on Spotify"
          src={SPOTIFY_EMBED_SRC}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="mt-4 rounded-xl"
        />
        <a
          href={SPOTIFY_TRACK_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          Open on Spotify →
        </a>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
          On SoundCloud
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {soundcloudTracks.map((track) => (
            <div key={track.url}>
              <iframe
                title={`${track.title} on SoundCloud`}
                src={soundcloudEmbedSrc(track.url)}
                width="100%"
                height="166"
                frameBorder="0"
                allow="autoplay"
                loading="lazy"
                className="rounded-xl border border-border"
              />
              <a
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {track.title} →
              </a>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default MusicSection;
