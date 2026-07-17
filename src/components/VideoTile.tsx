import { useState } from "react";

type VideoTileProps = {
  src: string;
  poster: string;
  label: string;
};

const VideoTile = ({ src, poster, label }: VideoTileProps) => {
  const [muted, setMuted] = useState(true);

  return (
    <button
      type="button"
      aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
      onClick={() => setMuted((m) => !m)}
      className="group relative block w-full overflow-hidden rounded-xl border border-border"
    >
      <video
        src={src}
        poster={poster}
        muted={muted}
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full"
      />
      <span className="absolute bottom-2 right-2 rounded-full bg-background/70 px-2.5 py-1 text-xs text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
        {muted ? "🔇 tap for sound" : "🔊 sound on"}
      </span>
    </button>
  );
};

export default VideoTile;
