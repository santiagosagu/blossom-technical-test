/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { useMediaQuery } from "react-responsive";
import RootHome from "@/pages/RootHome";
import { vi } from "vitest";

vi.mock("react-responsive", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("@/modules/mobile/HomeMobile", () => ({
  HomeMobile: () => <div>HomeMobile</div>,
}));

vi.mock("@/modules/desktop/HomeDesktop", () => ({
  default: () => <div>HomeDesktop</div>,
}));

describe("RootHome component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render HomeMobile on mobile devices", () => {
    (useMediaQuery as any).mockReturnValue(true);

    render(<RootHome />);

    expect(screen.getByText("HomeMobile")).toBeInTheDocument();
    expect(screen.queryByText("HomeDesktop")).not.toBeInTheDocument();
  });

  it("should render HomeDesktop on desktop devices", () => {
    (useMediaQuery as any).mockReturnValue(false);

    render(<RootHome />);

    expect(screen.getByText("HomeDesktop")).toBeInTheDocument();
    expect(screen.queryByText("HomeMobile")).not.toBeInTheDocument();
  });
});
