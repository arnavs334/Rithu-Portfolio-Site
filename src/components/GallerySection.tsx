import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import VideoTile from "@/components/VideoTile";
import g01 from "@/assets/gallery-01.webp";
import g02 from "@/assets/gallery-02.webp";
import g03 from "@/assets/gallery-03.webp";
import g04 from "@/assets/gallery-04.webp";
import g05 from "@/assets/gallery-05.webp";
import g06 from "@/assets/gallery-06.webp";
import g07 from "@/assets/gallery-07.webp";
import g08 from "@/assets/gallery-08.webp";
import g09 from "@/assets/gallery-09.webp";
import g10 from "@/assets/gallery-10.webp";
import g11 from "@/assets/gallery-11.webp";
import g12 from "@/assets/gallery-12.webp";
import press1 from "@/assets/press-hero.webp";
import press2 from "@/assets/press-about.webp";
import loop1 from "@/assets/district-loop-1.mp4";
import loop2 from "@/assets/district-loop-2.mp4";
import loop3 from "@/assets/district-loop-3.mp4";
import poster1 from "@/assets/district-poster-1.jpg";
import poster2 from "@/assets/district-poster-2.jpg";
import poster3 from "@/assets/district-poster-3.jpg";

/* thumb: web-optimized webp shown in the grid (cropped to the tile).
   full: untouched original in public/downloads — what the lightbox shows
   and what the download button saves. */
type Photo = { thumb: string; full: string; alt: string; downloadName: string };

const videos = [
  { src: loop1, poster: poster1, label: "District Atlanta set", downloadName: "rithu-district-set-1.mp4" },
  { src: loop2, poster: poster2, label: "District Atlanta closing set", downloadName: "rithu-district-set-2.mp4" },
  { src: loop3, poster: poster3, label: "District Atlanta January set", downloadName: "rithu-district-set-3.mp4" },
];

const livePhotos: Photo[] = [
  { thumb: g01, alt: "Rithu behind the decks in red neon light" },
  { thumb: g02, alt: "A packed crowd raises their hands under the venue's globe-light ceiling" },
  { thumb: g03, alt: "Rithu mixing at the DJ booth with a blue cloud visual behind her" },
  { thumb: g04, alt: "Dancers packed close beneath the glowing blue RITHU video wall" },
  { thumb: g05, alt: "A blurred long-exposure shot of Rithu working the decks" },
  { thumb: g06, alt: "Rithu touching up her lipstick at the booth between songs" },
  { thumb: g07, alt: "The dance floor lit in pink beneath the RITHU screen" },
  { thumb: g08, alt: "A full house viewed from the balcony under globe lights" },
  { thumb: g09, alt: "Crowd dancing under the glowing RITHU display panels" },
  { thumb: g10, alt: "A backlit silhouette of Rithu at the decks, lens flare catching the light" },
  { thumb: g11, alt: "Rithu silhouetted at the Pioneer DJ setup mid-set" },
  { thumb: g12, alt: "Rithu at the decks with a red ATL graphic glowing behind her" },
].map((photo, i) => {
  const downloadName = `rithu-live-${String(i + 1).padStart(2, "0")}.jpg`;
  return { ...photo, full: `/downloads/${downloadName}`, downloadName };
});

const pressPhotos: Photo[] = [
  {
    thumb: press1,
    full: "/downloads/rithu-press-01.png",
    alt: "Rithu studio press shot against a periwinkle backdrop",
    downloadName: "rithu-press-01.png",
  },
  {
    thumb: press2,
    full: "/downloads/rithu-press-02.png",
    alt: "Rithu studio portrait, arms crossed, gazing off camera",
    downloadName: "rithu-press-02.png",
  },
];

/* Uniform tiles: every image is cropped to the group's fixed aspect ratio so
   mixed portrait/landscape sources still line up in a clean grid. Clicking a
   tile opens the uncropped original in the lightbox. */
const GalleryPhoto = ({
  photo,
  onOpen,
}: {
  photo: Photo;
  onOpen: (photo: Photo) => void;
}) => (
  <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
    <button
      type="button"
      onClick={() => onOpen(photo)}
      aria-label={`View full image: ${photo.alt}`}
      className="block h-full w-full"
    >
      <img
        src={photo.thumb}
        alt={photo.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </button>
    <a
      href={photo.full}
      download={photo.downloadName}
      aria-label={`Download ${photo.alt}`}
      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
    >
      <Download size={16} />
    </a>
  </div>
);

const GroupHeading = ({ children }: { children: string }) => (
  <h3 className="mt-10 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground first:mt-8">
    {children}
  </h3>
);

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <section id="gallery" className="bg-wash-blue scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <Reveal>
        <h2 className="section-heading">Gallery</h2>
      </Reveal>

      <Reveal delay={0.1}>
        <GroupHeading>Videos</GroupHeading>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {videos.map((video) => (
            <VideoTile key={video.src} {...video} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <GroupHeading>Live</GroupHeading>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {livePhotos.map((photo) => (
            <GalleryPhoto key={photo.thumb} photo={photo} onOpen={setLightbox} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <GroupHeading>Press</GroupHeading>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {pressPhotos.map((photo) => (
            <GalleryPhoto key={photo.thumb} photo={photo} onOpen={setLightbox} />
          ))}
        </div>
      </Reveal>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.full}
            alt={lightbox.alt}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close full image"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:text-primary"
          >
            <X size={18} />
          </button>
          <a
            href={lightbox.full}
            download={lightbox.downloadName}
            aria-label={`Download ${lightbox.alt}`}
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/70 px-4 py-2 text-sm text-foreground backdrop-blur transition-colors hover:text-primary"
          >
            <Download size={16} />
            Download full size
          </a>
        </div>
      )}
      </div>
    </section>
  );
};

export default GallerySection;
