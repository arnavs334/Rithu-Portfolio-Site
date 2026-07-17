import { SiTiktok, SiSoundcloud, SiInstagram } from "@icons-pack/react-simple-icons";

const Footer = () => (
  <footer id="contact" className="border-t border-border px-4 py-14 text-center">
    <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
      Bookings
    </h2>
    <a
      href="mailto:rithumusic999@gmail.com"
      className="mt-6 inline-block font-display text-xl font-bold text-primary transition-opacity hover:opacity-80 sm:text-3xl"
    >
      rithumusic999@gmail.com
    </a>
    <div className="mt-10 flex justify-center gap-5">
      <a
        href="https://www.tiktok.com/@rithu.h"
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok"
        className="icon-link"
      >
        <SiTiktok size={20} />
      </a>
      <a
        href="https://www.instagram.com/sparkleunicorn999/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="icon-link"
      >
        <SiInstagram size={20} />
      </a>
      <a
        href="https://soundcloud.com/sparkleunicorn999"
        target="_blank"
        rel="noreferrer"
        aria-label="SoundCloud"
        className="icon-link"
      >
        <SiSoundcloud size={20} />
      </a>
    </div>
    <p className="mt-12 text-xs uppercase tracking-widest text-muted-foreground">
      © {new Date().getFullYear()} RITHU
    </p>
  </footer>
);

export default Footer;
