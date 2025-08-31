/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { HomeMobile } from "@/modules/mobile/HomeMobile";
import { useCharacterActions } from "@/hooks/useCharacterActions";
import { useCharacter } from "@/store/characterStore";
import { useFilter } from "@/store/filterStore";
import { vi } from "vitest";
import type { Character } from "@/types/character";

vi.mock("@/hooks/useCharacterActions");
vi.mock("@/store/characterStore");
vi.mock("@/store/filterStore");
vi.mock("@/components/CharacterItem", () => ({
  default: ({ character }: { character: Partial<Character> }) => (
    <div>{character.name}</div>
  ),
}));

const mockedUseCharacterActions = useCharacterActions as any;
const mockedUseCharacter = useCharacter as any;
const mockedUseFilter = useFilter as any;

const mockCharacter1 = { id: "1", name: "Rick" };
const mockCharacter2 = { id: "2", name: "Morty" };
const mockStarredCharacter = { id: "3", name: "Summer", isFavorite: true };

describe("HomeMobile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (mockFilters = { search: "", sort: "" }) => {
    mockedUseCharacter.mockReturnValue({ selectedCharacter: null });
    mockedUseFilter.mockReturnValue({
      filters: mockFilters,
      setFilters: vi.fn(),
    });
    mockedUseCharacterActions.mockReturnValue({
      showFilters: false,
      activeFiltersCount: 0,
      filteredCharacters: [
        mockCharacter1,
        mockCharacter2,
        mockStarredCharacter,
      ],
      starredCharacters: [mockStarredCharacter],
      regularCharacters: [mockCharacter1, mockCharacter2],
    });

    const utils = render(
      <MemoryRouter>
        <HomeMobile />
      </MemoryRouter>
    );

    return { setFilters: mockedUseFilter().setFilters, ...utils };
  };

  it("should render the title and character lists", () => {
    setup();
    expect(screen.getByText(/Rick and Morty list/i)).toBeInTheDocument();
    expect(screen.getByText(/STARRED CHARACTERS/i)).toBeInTheDocument();
    expect(screen.getAllByText(/CHARACTERS/i)[0]).toBeInTheDocument();

    expect(screen.getByText("Rick")).toBeInTheDocument();
    expect(screen.getByText("Morty")).toBeInTheDocument();
    expect(screen.getByText("Summer")).toBeInTheDocument();
  });

  it("should call setFilters when typing in the search input", () => {
    const { setFilters } = setup();
    const searchInput = screen.getByPlaceholderText(
      /Search or filter results/i
    );

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(setFilters).toHaveBeenCalledWith({ search: "test", sort: "" });
  });

  it("should cycle through sort states when sort button is clicked 2", () => {
    const { setFilters, rerender } = setup({ search: "", sort: "" });
    const sortButton = screen.getByTestId("sort-data");

    fireEvent.click(sortButton);
    expect(setFilters).toHaveBeenCalledWith({ search: "", sort: "az" });

    mockedUseFilter.mockReturnValue({
      filters: { search: "", sort: "az" },
      setFilters,
    });
    rerender(
      <MemoryRouter>
        <HomeMobile />
      </MemoryRouter>
    );
    fireEvent.click(sortButton);
    expect(setFilters).toHaveBeenCalledWith({ search: "", sort: "za" });
    expect(sortButton).toHaveClass("bg-primary-100");

    mockedUseFilter.mockReturnValue({
      filters: { search: "", sort: "za" },
      setFilters,
    });
    rerender(
      <MemoryRouter>
        <HomeMobile />
      </MemoryRouter>
    );

    fireEvent.click(sortButton);
    expect(setFilters).toHaveBeenCalledWith({ search: "", sort: "" });
  });
});
