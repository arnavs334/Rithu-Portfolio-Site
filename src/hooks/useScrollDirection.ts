import { useEffect, useState } from "react";
import { nextNavScrollState, type NavScrollState } from "@/lib/scroll";

export function useScrollDirection(): boolean {
  const [state, setState] = useState<NavScrollState>({ y: 0, visible: true });

  useEffect(() => {
    const onScroll = () => setState((prev) => nextNavScrollState(prev, window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state.visible;
}
