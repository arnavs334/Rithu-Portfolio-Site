import "@testing-library/jest-dom";

// jsdom doesn't implement HTMLMediaElement playback; stub it so video
// components can call play()/pause() without "Not implemented" stderr noise.
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  writable: true,
  value: () => Promise.resolve(),
});
Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  writable: true,
  value: () => {},
});

// jsdom doesn't implement IntersectionObserver; Navigation, VideoTile, and
// MixSection use it. The stub reports every observed element as immediately
// visible, which matches jsdom's "everything renders" model and lets
// visibility-gated behavior run in tests.
class IntersectionObserverStub {
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }

  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverStub,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverStub,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
