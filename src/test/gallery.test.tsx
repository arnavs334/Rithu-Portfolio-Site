import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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
    expect(
      screen.getAllByRole("button", { name: /fullscreen/i }).length
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

  it("offers a full-resolution download link for every photo and video", () => {
    render(<GallerySection />);
    const downloads = screen.getAllByRole("link", { name: /^download /i });
    // 14 photos + 3 videos
    expect(downloads.length).toBe(17);
    for (const link of downloads) {
      expect(link.getAttribute("download")).toMatch(/^rithu-.+\.(jpg|png|mp4)$/);
    }
  });

  it("opens the uncropped original in a lightbox on click", () => {
    render(<GallerySection />);
    fireEvent.click(
      screen.getAllByRole("button", { name: /^view full image/i })[0]
    );
    const dialog = screen.getByRole("dialog");
    const img = within(dialog).getByRole("img");
    expect(img.getAttribute("src")).toBe("/downloads/rithu-live-01.jpg");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("VideoTile", () => {
  it("toggles mute on click", () => {
    const { container } = render(
      <VideoTile
        src="loop.mp4"
        poster="poster.jpg"
        label="District set"
        downloadName="rithu-district-set-1.mp4"
      />
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
