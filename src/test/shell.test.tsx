import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

describe("Navigation", () => {
  it("links to each section anchor", () => {
    render(<Navigation />);
    for (const href of ["#about", "#music", "#mix", "#gallery", "#contact"]) {
      const link = screen
        .getAllByRole("link")
        .find((a) => a.getAttribute("href") === href);
      expect(link, `link to ${href}`).toBeTruthy();
    }
  });
});

describe("Footer", () => {
  it("has booking email and social links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("mailto:rithumusic999@gmail.com");
    expect(hrefs).toContain("https://www.tiktok.com/@rithu.h");
    expect(hrefs).toContain("https://www.instagram.com/sparkleunicorn999/");
    expect(hrefs).toContain("https://soundcloud.com/sparkleunicorn999");
  });
});
