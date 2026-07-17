import { Download } from "lucide-react";
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

type Photo = { src: string; alt: string; downloadName: string };

const videos = [
  { src: loop1, poster: poster1, label: "District Atlanta set", downloadName: "rithu-district-set-1.mp4" },
  { src: loop2, poster: poster2, label: "District Atlanta closing set", downloadName: "rithu-district-set-2.mp4" },
  { src: loop3, poster: poster3, label: "District Atlanta January set", downloadName: "rithu-district-set-3.mp4" },
];

const livePhotos: Photo[] = [
  { src: g01, alt: "Rithu behind the decks in red neon light", downloadName: "rithu-live-01.webp" },
  { src: g02, alt: "A packed crowd raises their hands under the venue's globe-light ceiling", downloadName: "rithu-live-02.webp" },
  { src: g03, alt: "Rithu mixing at the DJ booth with a blue cloud visual behind her", downloadName: "rithu-live-03.webp" },
  { src: g04, alt: "Dancers packed close beneath the glowing blue RITHU video wall", downloadName: "rithu-live-04.webp" },
  { src: g05, alt: "A blurred long-exposure shot of Rithu working the decks", downloadName: "rithu-live-05.webp" },
  { src: g06, alt: "Rithu touching up her lipstick at the booth between songs", downloadName: "rithu-live-06.webp" },
  { src: g07, alt: "The dance floor lit in pink beneath the RITHU screen", downloadName: "rithu-live-07.webp" },
  { src: g08, alt: "A full house viewed from the balcony under globe lights", downloadName: "rithu-live-08.webp" },
  { src: g09, alt: "Crowd dancing under the glowing RITHU display panels", downloadName: "rithu-live-09.webp" },
  { src: g10, alt: "A backlit silhouette of Rithu at the decks, lens flare catching the light", downloadName: "rithu-live-10.webp" },
  { src: g11, alt: "Rithu silhouetted at the Pioneer DJ setup mid-set", downloadName: "rithu-live-11.webp" },
  { src: g12, alt: "Rithu at the decks with a red ATL graphic glowing behind her", downloadName: "rithu-live-12.webp" },
];

const pressPhotos: Photo[] = [
  { src: press1, alt: "Rithu studio press shot against a periwinkle backdrop", downloadName: "rithu-press-01.webp" },
  { src: press2, alt: "Rithu studio portrait, arms crossed, gazing off camera", downloadName: "rithu-press-02.webp" },
];

/* Uniform tiles: every image is cropped to the group's fixed aspect ratio so
   mixed portrait/landscape sources still line up in a clean grid. */
const GalleryPhoto = ({ src, alt, downloadName }: Photo) => (
  <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <a
      href={src}
      download={downloadName}
      aria-label={`Download ${alt}`}
      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
    >
      <Download size={16} />
    </a>
  </div>
);

const GroupHeading = ({ children }: { children: string }) => (
  <h3 className="mt-14 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground first:mt-12">
    {children}
  </h3>
);

const GallerySection = () => (
  <section id="gallery" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24">
    <h2 className="section-heading">Gallery</h2>

    <GroupHeading>Videos</GroupHeading>
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {videos.map((video) => (
        <VideoTile key={video.src} {...video} />
      ))}
    </div>

    <GroupHeading>Live</GroupHeading>
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      {livePhotos.map((photo) => (
        <GalleryPhoto key={photo.src} {...photo} />
      ))}
    </div>

    <GroupHeading>Press</GroupHeading>
    <div className="mt-4 grid grid-cols-2 gap-3">
      {pressPhotos.map((photo) => (
        <GalleryPhoto key={photo.src} {...photo} />
      ))}
    </div>
  </section>
);

export default GallerySection;
