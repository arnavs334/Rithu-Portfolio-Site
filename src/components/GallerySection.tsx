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
import loop1 from "@/assets/district-loop-1.mp4";
import loop2 from "@/assets/district-loop-2.mp4";
import loop3 from "@/assets/district-loop-3.mp4";
import poster1 from "@/assets/district-poster-1.jpg";
import poster2 from "@/assets/district-poster-2.jpg";
import poster3 from "@/assets/district-poster-3.jpg";

type Tile =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; label: string };

const tiles: Tile[] = [
  { kind: "photo", src: g01, alt: "Rithu behind the decks in red neon light" },
  { kind: "photo", src: g02, alt: "Rithu performing live" },
  { kind: "video", src: loop1, poster: poster1, label: "District Atlanta set" },
  { kind: "photo", src: g03, alt: "Rithu performing live" },
  { kind: "photo", src: g04, alt: "Crowd at a Rithu set" },
  { kind: "photo", src: g05, alt: "Rithu performing live" },
  { kind: "video", src: loop2, poster: poster2, label: "District Atlanta closing set" },
  { kind: "photo", src: g06, alt: "Rithu performing live" },
  { kind: "photo", src: g07, alt: "Rithu on stage" },
  { kind: "photo", src: g08, alt: "Rithu performing live" },
  { kind: "video", src: loop3, poster: poster3, label: "District Atlanta January set" },
  { kind: "photo", src: g09, alt: "Rithu performing live" },
  { kind: "photo", src: g10, alt: "Rithu on stage" },
  { kind: "photo", src: g11, alt: "Rithu performing live" },
  { kind: "photo", src: g12, alt: "Rithu performing live" },
];

const GallerySection = () => (
  <section id="gallery" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24">
    <h2 className="section-heading">Live</h2>
    <div className="mt-12 columns-2 gap-3 md:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
      {tiles.map((tile) =>
        tile.kind === "photo" ? (
          <img
            key={tile.src}
            src={tile.src}
            alt={tile.alt}
            loading="lazy"
            className="w-full rounded-xl border border-border"
          />
        ) : (
          <VideoTile
            key={tile.src}
            src={tile.src}
            poster={tile.poster}
            label={tile.label}
          />
        )
      )}
    </div>
  </section>
);

export default GallerySection;
