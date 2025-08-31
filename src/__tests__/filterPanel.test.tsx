/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FilterPanel } from "@/pages/mobile/FilterPanel";
import { useCharacterActions } from "@/hooks/useCharacterActions";
import { useMediaQuery } from "react-responsive";
import { vi } from "vitest";

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: vi.fn(),
}));
vi.mock("@/hooks/useCharacterActions");
vi.mock("react-responsive");
vi.mock("@/constants/filterOpctions", () => ({
  filterOptionsCharacter: ["All", "Starred", "Others"],
  filterOptionsSpecies: ["All", "Human", "Alien"],
}));

const mockedUseCharacterActions = useCharacterActions as any;
const mockedUseMediaQuery = useMediaQuery as any;
const mockedUseNavigate = (await import("react-router")).useNavigate as any;

describe("FilterPanel", () => {
  let mockSetTempFilters: any;
  let mockHandleApplyFilters: any;
  let mockNavigate: any;

  beforeEach(() => {
    mockSetTempFilters = vi.fn();
    mockHandleApplyFilters = vi.fn();
    mockNavigate = vi.fn();

    mockedUseCharacterActions.mockReturnValue({
      tempFilters: { characterType: "All", species: "All" },
      setTempFilters: mockSetTempFilters,
      handleApplyFilters: mockHandleApplyFilters,
    });
    mockedUseMediaQuery.mockReturnValue(true);
    mockedUseNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <FilterPanel />
      </MemoryRouter>
    );
  };

  it("should render filter options", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /Filters/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText("All")[0]).toBeInTheDocument();
    expect(screen.getByTestId("option-Starred")).toBeInTheDocument();
    expect(screen.getByTestId("option-Human")).toBeInTheDocument();
    expect(screen.getByTestId("option-Alien")).toBeInTheDocument();
  });

  it("should call setTempFilters when a character type is clicked", () => {
    renderComponent();
    const starredButton = screen.getByTestId("option-Starred");
    fireEvent.click(starredButton);
    expect(mockSetTempFilters).toHaveBeenCalled();
  });

  it("should call setTempFilters when a species is clicked", () => {
    renderComponent();
    const humanButton = screen.getByTestId("option-Human");
    fireEvent.click(humanButton);
    expect(mockSetTempFilters).toHaveBeenCalled();
  });

  it("should call handleApplyFilters and navigate when Filter button is clicked", () => {
    renderComponent();
    const filterButton = screen.getByTestId("submit-filter-mobile");
    fireEvent.click(filterButton);
    expect(mockHandleApplyFilters).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should redirect to home if not on mobile", () => {
    mockedUseMediaQuery.mockReturnValue(false);
    renderComponent();

    expect(
      screen.queryByRole("heading", { name: /Filters/i })
    ).not.toBeInTheDocument();
  });
});
