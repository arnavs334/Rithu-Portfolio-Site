import aboutImage from "@/assets/press-about.webp";

const stats = [
  { value: "60M+", label: "views in the past year" },
  { value: "10M", label: "likes and counting" },
];

const AboutSection = () => (
  <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24">
    <h2 className="section-heading">About</h2>
    <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
      <img
        src={aboutImage}
        alt="Rithu studio portrait"
        loading="lazy"
        width={1400}
        height={1813}
        className="w-full rounded-xl border border-border"
      />
      <div>
        <p className="text-lg leading-relaxed text-foreground/85">
          Rithu is an emerging DJ and artist bringing a high-energy blend of
          electronic, hyperpop, and boundary-pushing pop to the club scene.
          Known for seamless genre-blending and an infectious stage presence,
          Rithu has played at major venues across Atlanta and Los Angeles,
          including District Atlanta. Backed by a powerhouse digital
          footprint—capturing over 60 million views and nearly 10 million likes
          in the past year alone—Rithu is rapidly cementing her status as a
          defining new voice in the electronic landscape.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text font-display text-4xl font-extrabold text-transparent sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
