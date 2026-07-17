import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GallerySection from "@/components/GallerySection";
import VideoTile from "@/components/VideoTile";

describe("GallerySection", () => {
  it("renders lazy-loaded photos and video tiles", () => {
    render(<GallerySection />);
    const images = screen.getAllByRole("img");
    // 12 live photos + 2 press shots
    expect(images.length).toBe(14);
    for (const img of images) {
      expect(img).toHaveAttribute("loading", "lazy");
    }
    expect(
      screen.getAllByRole("button", { name: /unmute/i }).length
    ).toBe(3);
  });

  it("groups media under Videos, Live, and Press headings", () => {
    render(<GallerySection />);
    for (const group of ["Videos", "Live", "Press"]) {
      expect(
        screen.getByRole("heading", { level: 3, name: group })
      ).toBeInTheDocument();
    }
  });
});

describe("VideoTile", () => {
  it("toggles mute on click", () => {
    const { container } = render(
      <VideoTile src="loop.mp4" poster="poster.jpg" label="District set" width={720} height={1280} />
    );
    const video = container.querySelector("video");
    const button = screen.getByRole("button", { name: /unmute district set/i });

    // Assert initial state: video should be muted
    expect(video?.muted).toBe(true);

    fireEvent.click(button);

    // Assert aria-label changes
    expect(
      screen.getByRole("button", { name: /mute district set/i })
    ).toBeInTheDocument();

    // Assert video muted state changes
    expect(video?.muted).toBe(false);
  });
});
