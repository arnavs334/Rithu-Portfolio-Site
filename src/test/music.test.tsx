import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MusicSection from "@/components/MusicSection";

describe("MusicSection", () => {
  it("embeds the Spotify single", () => {
    render(<MusicSection />);
    const iframe = screen.getByTitle("Rithu's new single on Spotify");
    expect(iframe.getAttribute("src")).toBe(
      "https://open.spotify.com/embed/track/1oQYHiUjFq94VHTkXlz8tH"
    );
  });

  it("embeds both SoundCloud tracks with direct links", () => {
    render(<MusicSection />);
    for (const url of [
      "https://soundcloud.com/sparkleunicorn999/softcrush",
      "https://soundcloud.com/sparkleunicorn999/clubclassicsx4raws",
    ]) {
      const embeds = screen
        .getAllByTitle(/on SoundCloud$/)
        .map((el) => el.getAttribute("src"));
      expect(embeds.some((src) => src?.includes(encodeURIComponent(url)))).toBe(
        true
      );
      const links = screen
        .getAllByRole("link")
        .map((a) => a.getAttribute("href"));
      expect(links).toContain(url);
    }
  });

  it("links out to the Spotify track page", () => {
    render(<MusicSection />);
    const links = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toContain(
      "https://open.spotify.com/track/1oQYHiUjFq94VHTkXlz8tH"
    );
  });
});
