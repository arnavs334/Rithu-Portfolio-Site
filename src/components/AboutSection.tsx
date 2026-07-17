import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import aboutImage from "@/assets/press-about.webp";

const stats = [
  { value: "60M+", label: "Views" },
  { value: "15M+", label: "Likes" },
  { value: "130K+", label: "Followers" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" ref={ref} className="bg-wash-violet scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="section-heading">About</h2>
        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              ref={imageRef}
              className="overflow-hidden rounded-xl border border-border"
            >
              <motion.img
                src={aboutImage}
                alt="Rithu studio portrait"
                loading="lazy"
                width={1400}
                height={1813}
                className="w-full"
                style={
                  prefersReducedMotion ? undefined : { y: parallaxY, scale: 1.06 }
                }
              />
            </div>
          </motion.div>
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              Rithu is an emerging DJ and artist bringing a high-energy blend of
              electronic, hyperpop, and boundary-pushing pop to the club scene.
              Known for seamless genre-blending and an infectious stage presence,
              Rithu has played at major venues across Atlanta and Los Angeles,
              including District Atlanta. Backed by a powerhouse digital
              footprint—capturing over 60 million views and more than 15 million
              likes in the past year alone—Rithu is rapidly cementing her status
              as a defining new voice in the electronic landscape.
            </p>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
