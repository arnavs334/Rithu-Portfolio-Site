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

type Photo = { src: string; alt: string; width: number; height: number };
type Video = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
};

const videos: Video[] = [
  { src: loop1, poster: poster1, label: "District Atlanta set", width: 720, height: 1280 },
  { src: loop2, poster: poster2, label: "District Atlanta closing set", width: 720, height: 1280 },
  { src: loop3, poster: poster3, label: "District Atlanta January set", width: 720, height: 406 },
];

const livePhotos: Photo[] = [
  { src: g01, alt: "Rithu behind the decks in red neon light", width: 1200, height: 801 },
  { src: g02, alt: "A packed crowd raises their hands under the venue's globe-light ceiling", width: 1200, height: 800 },
  { src: g03, alt: "Rithu mixing at the DJ booth with a blue cloud visual behind her", width: 1200, height: 800 },
  { src: g04, alt: "Dancers packed close beneath the glowing blue RITHU video wall", width: 1200, height: 1682 },
  { src: g05, alt: "A blurred long-exposure shot of Rithu working the decks", width: 1200, height: 858 },
  { src: g06, alt: "Rithu touching up her lipstick at the booth between songs", width: 1200, height: 1680 },
  { src: g07, alt: "The dance floor lit in pink beneath the RITHU screen", width: 1200, height: 607 },
  { src: g08, alt: "A full house viewed from the balcony under globe lights", width: 1200, height: 800 },
  { src: g09, alt: "Crowd dancing under the glowing RITHU display panels", width: 1200, height: 858 },
  { src: g10, alt: "A backlit silhouette of Rithu at the decks, lens flare catching the light", width: 1200, height: 1680 },
  { src: g11, alt: "Rithu silhouetted at the Pioneer DJ setup mid-set", width: 1200, height: 1800 },
  { src: g12, alt: "Rithu at the decks with a red ATL graphic glowing behind her", width: 1200, height: 1801 },
];

const pressPhotos: Photo[] = [
  { src: press1, alt: "Rithu studio press shot against a periwinkle backdrop", width: 1600, height: 1083 },
  { src: press2, alt: "Rithu studio portrait, arms crossed, gazing off camera", width: 1400, height: 1813 },
];

const GalleryPhoto = ({ src, alt, width, height }: Photo) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    width={width}
    height={height}
    className="w-full rounded-xl border border-border"
  />
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
    <div className="mt-4 grid items-start gap-3 sm:grid-cols-3">
      {videos.map((video) => (
        <VideoTile key={video.src} {...video} />
      ))}
    </div>

    <GroupHeading>Live</GroupHeading>
    <div className="mt-4 columns-2 gap-3 md:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
      {livePhotos.map((photo) => (
        <GalleryPhoto key={photo.src} {...photo} />
      ))}
    </div>

    <GroupHeading>Press</GroupHeading>
    <div className="mt-4 grid items-start gap-3 sm:grid-cols-2">
      {pressPhotos.map((photo) => (
        <GalleryPhoto key={photo.src} {...photo} />
      ))}
    </div>
  </section>
);

export default GallerySection;
