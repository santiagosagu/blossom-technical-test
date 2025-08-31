/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import CharacterItem from "@/components/CharacterItem";

const mockToggleFavorite = vi.fn();
const mockToggleDelete = vi.fn();
const mockSetSelectedCharacter = vi.fn();
const mockNavigate = vi.fn();

vi.mock("@/store/characterStore", () => ({
  useCharacter: () => ({
    toggleFavorite: mockToggleFavorite,
    toggleDelete: mockToggleDelete,
    setSelectedCharacter: mockSetSelectedCharacter,
  }),
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/components/ui/ConfirmDialog", () => ({
  ConfirmDeleteDialog: ({
    open,
    characterName,
    onConfirm,
    onOpenChange,
  }: any) =>
    open ? (
      <div data-testid="delete-dialog">
        <p>Delete {characterName}?</p>
        <button onClick={onConfirm} data-testid="confirm">
          Yes
        </button>
        <button onClick={() => onOpenChange(false)} data-testid="cancel">
          No
        </button>
      </div>
    ) : null,
}));

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  isFavorite: false,
  isDeleted: false,
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("CharacterItem - Regression Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing and maintain basic structure", () => {
    const { container } = render(
      <TestWrapper>
        <CharacterItem character={mockCharacter} isSelected={false} />
      </TestWrapper>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly when selected", () => {
    const { container } = render(
      <TestWrapper>
        <CharacterItem character={mockCharacter} isSelected={true} />
      </TestWrapper>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly when character is favorite", () => {
    const favoriteCharacter = { ...mockCharacter, isFavorite: true };

    const { container } = render(
      <TestWrapper>
        <CharacterItem character={favoriteCharacter} isSelected={false} />
      </TestWrapper>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should handle core interactions correctly", () => {
    render(
      <TestWrapper>
        <CharacterItem character={mockCharacter} isSelected={false} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(mockSetSelectedCharacter).toHaveBeenCalledWith(mockCharacter);
    expect(mockNavigate).toHaveBeenCalledWith("/character-detail/1");

    fireEvent.click(screen.getAllByTestId("heart-button")[0]);
    expect(mockToggleFavorite).toHaveBeenCalledWith("1");

    fireEvent.click(screen.getAllByTestId("trash-button")[0]);
    expect(screen.getByTestId("delete-dialog")).toBeInTheDocument();
  });

  it("should contain all required elements", () => {
    render(
      <TestWrapper>
        <CharacterItem character={mockCharacter} isSelected={false} />
      </TestWrapper>
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getAllByTestId("heart-button")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("trash-button")[0]).toBeInTheDocument();
  });

  it("should handle edge cases in character data", () => {
    const edgeCaseCharacter = {
      id: "999",
      name: "Character with very long name that should be truncated properly",
      species: "Unknown alien species with long description",
      image: "https://example.com/very-long-url-that-should-work.jpeg",
      isFavorite: true,
      isDeleted: false,
    };

    const { container } = render(
      <TestWrapper>
        <CharacterItem character={edgeCaseCharacter} isSelected={true} />
      </TestWrapper>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(
      screen.getByText(
        "Character with very long name that should be truncated properly"
      )
    ).toBeInTheDocument();
  });
});
