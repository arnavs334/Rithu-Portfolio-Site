import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MusicSection from "@/components/MusicSection";

describe("MusicSection", () => {
  it("renders the SoundCloud embed for the mix", () => {
    render(<MusicSection />);
    const iframe = screen.getByTitle("Hyperpopish Mix on SoundCloud");
    expect(iframe.getAttribute("src")).toContain(
      encodeURIComponent("https://soundcloud.com/sparkleunicorn999/hyperpopish-mix")
    );
  });

  it("always offers a direct SoundCloud profile link", () => {
    render(<MusicSection />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });
});
