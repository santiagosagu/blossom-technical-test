import { render, screen } from "@testing-library/react";
import HomeDesktop from "@/modules/desktop/HomeDesktop";

describe("HomeDesktop component", () => {
  it("should render the placeholder content correctly", () => {
    render(<HomeDesktop />);

    expect(
      screen.getByRole("heading", {
        name: /Interdimensional Character Database/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Welcome to Rick's advanced character analysis system. Select a character from the left panel to view their interdimensional profile and detailed information./i
      )
    ).toBeInTheDocument();

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
