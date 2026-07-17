import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection";

describe("HeroSection", () => {
  it("shows the RITHU wordmark with glitch data-text", () => {
    render(<HeroSection />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("RITHU");
    expect(h1).toHaveAttribute("data-text", "RITHU");
  });

  it("links to TikTok and SoundCloud", () => {
    render(<HeroSection />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://www.tiktok.com/@rithu.h");
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });
});
