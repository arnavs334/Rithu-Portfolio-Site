import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
};

const offsets = {
  up: { y: 16 },
  left: { x: -16 },
  right: { x: 16 },
};

/* Fade-and-drift-in once the element scrolls into view (Mantra-site pattern). */
const Reveal = ({ children, delay = 0, direction = "up", className }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
