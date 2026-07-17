export type NavScrollState = { y: number; visible: boolean };

export const NAV_SCROLL_THRESHOLD = 80;
export const NAV_SCROLL_DELTA = 8;

export function nextNavScrollState(prev: NavScrollState, currentY: number): NavScrollState {
  if (currentY <= NAV_SCROLL_THRESHOLD) {
    return prev.visible && prev.y === currentY ? prev : { y: currentY, visible: true };
  }
  const delta = currentY - prev.y;
  // Ignore sub-delta jitter (iOS momentum/elastic scroll) — prev.y is only advanced
  // on real movement, so small increments accumulate until they cross the delta.
  if (Math.abs(delta) < NAV_SCROLL_DELTA) return prev;
  return { y: currentY, visible: delta < 0 };
}
