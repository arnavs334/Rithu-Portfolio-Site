import { useEffect, useRef, useState } from "react";
import { Download, Maximize2 } from "lucide-react";

type VideoTileProps = {
  src: string;
  poster: string;
  label: string;
  downloadName: string;
  className?: string;
};

const VideoTile = ({
  src,
  poster,
  label,
  downloadName,
  className = "",
}: VideoTileProps) => {
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

  // Show native controls (scrub/volume) only while fullscreen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onFullscreenChange = () => {
      video.controls = document.fullscreenElement === video;
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    // iOS Safari has no requestFullscreen on video; it uses its own method
    // that opens the native player.
    const iosVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if (iosVideo.webkitEnterFullscreen) {
      iosVideo.webkitEnterFullscreen();
    }
  };

  return (
    <div
      className={`group relative aspect-square overflow-hidden rounded-xl border border-border ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
        onClick={() => setMuted((m) => !m)}
        className="absolute inset-0 z-10"
      >
        <span className="absolute bottom-2 right-2 rounded-full bg-background/70 px-2.5 py-1 text-xs text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          {muted ? "🔇 tap for sound" : "🔊 sound on"}
        </span>
      </button>
      <div className="absolute right-2 top-2 z-20 flex gap-2">
        <button
          type="button"
          onClick={enterFullscreen}
          aria-label={`Play ${label} fullscreen`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Maximize2 size={16} />
        </button>
        <a
          href={src}
          download={downloadName}
          aria-label={`Download ${label}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Download size={16} />
        </a>
      </div>
    </div>
  );
};

export default VideoTile;
