import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutSection from "@/components/AboutSection";

describe("AboutSection", () => {
  it("renders the bio and stats", () => {
    render(<AboutSection />);
    expect(
      screen.getByText(/emerging DJ and artist/i)
    ).toBeInTheDocument();
    expect(screen.getByText("60M+")).toBeInTheDocument();
    expect(screen.getByText("15M+")).toBeInTheDocument();
    expect(screen.getByText("130K+")).toBeInTheDocument();
    expect(screen.getByText("Followers")).toBeInTheDocument();
  });
});
