import { useEffect, useRef, useState } from "react";

type VideoTileProps = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
};

const VideoTile = ({ src, poster, label, width, height }: VideoTileProps) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25, rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
      onClick={() => setMuted((m) => !m)}
      className="group relative block w-full overflow-hidden rounded-xl border border-border"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        width={width}
        height={height}
        className="w-full"
      />
      <span className="absolute bottom-2 right-2 rounded-full bg-background/70 px-2.5 py-1 text-xs text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        {muted ? "🔇 tap for sound" : "🔊 sound on"}
      </span>
    </button>
  );
};

export default VideoTile;
