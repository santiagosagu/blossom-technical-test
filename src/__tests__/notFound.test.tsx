/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import NotFound from "@/pages/NotFound";
import { vi } from "vitest";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("NotFound component", () => {
  const mockPath = "/some/non-existent/route";

  beforeEach(() => {
    (useLocation as any).mockReturnValue({
      pathname: mockPath,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the 404 message and a link to home", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /Return to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should log an error with the non-existent route", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      mockPath
    );

    consoleErrorSpy.mockRestore();
  });
});
