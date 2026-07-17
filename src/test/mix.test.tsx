import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import MixSection from "@/components/MixSection";

describe("MixSection", () => {
  it("renders the SoundCloud embed for the mix", () => {
    render(<MixSection />);
    const iframe = screen.getByTitle("Hyperpopish Mix on SoundCloud");
    expect(iframe.getAttribute("src")).toContain(
      encodeURIComponent("https://soundcloud.com/sparkleunicorn999/hyperpopish-mix")
    );
  });

  it("always offers a direct SoundCloud profile link", () => {
    render(<MixSection />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });

  describe("fallback swap", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("replaces the iframe with the fallback link if it never loads", () => {
      vi.useFakeTimers();
      render(<MixSection />);

      act(() => {
        vi.advanceTimersByTime(8000);
      });

      expect(screen.queryByTitle("Hyperpopish Mix on SoundCloud")).toBeNull();
      const fallback = screen.getByRole("link", {
        name: "▶ Listen to the Hyperpopish Mix on SoundCloud",
      });
      expect(fallback).toHaveAttribute(
        "href",
        "https://soundcloud.com/sparkleunicorn999/hyperpopish-mix"
      );
    });

    it("keeps the iframe if it loads before the timeout fires", () => {
      vi.useFakeTimers();
      render(<MixSection />);
      const iframe = screen.getByTitle("Hyperpopish Mix on SoundCloud");

      // Flush the onLoad state update (and the effect that clears the
      // stale timeout) before advancing the clock, otherwise the old
      // timer would still be pending when we fast-forward.
      act(() => {
        fireEvent.load(iframe);
      });
      act(() => {
        vi.advanceTimersByTime(8000);
      });

      expect(screen.getByTitle("Hyperpopish Mix on SoundCloud")).toBeInTheDocument();
    });
  });
});
