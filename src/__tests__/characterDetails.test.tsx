/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useParams, useNavigate } from "react-router";
import { CharacterDetail } from "@/pages/CharacterDetail";
import { vi } from "vitest";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock("@apollo/client/react", () => ({
  useQuery: vi.fn(),
}));

vi.mock("react-responsive", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("@/store/characterStore", () => ({
  useCharacter: vi.fn(),
}));

vi.mock("@/components/characterDetail/SectionComments", () => ({
  default: () => <div>SectionComments</div>,
}));

const useQuery = vi.mocked((await import("@apollo/client/react")).useQuery);
const useMediaQuery = vi.mocked(
  (await import("react-responsive")).useMediaQuery
);
const useCharacter = vi.mocked(
  (await import("@/store/characterStore")).useCharacter
);

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  gender: "Male",
  image: "rick.png",
  isFavorite: false,
  __typename: "Character",
};

const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={["/character-detail/1"]}>
      <CharacterDetail />
    </MemoryRouter>
  );
};

describe("CharacterDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as any).mockReturnValue({ characterId: "1" });
    (useNavigate as any).mockReturnValue(vi.fn());
  });

  it("should render loading state", () => {
    useQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
    } as any);
    useCharacter.mockReturnValue({ characters: [], toggleFavorite: vi.fn() });
    renderWithRouter();
    expect(screen.getByText("Loading character...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    useQuery.mockReturnValue({
      loading: false,
      error: new Error("Test Error"),
      data: undefined,
    } as any);
    useCharacter.mockReturnValue({ characters: [], toggleFavorite: vi.fn() });
    renderWithRouter();
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should render character details", () => {
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { character: mockCharacter },
    } as any);
    useCharacter.mockReturnValue({
      characters: [mockCharacter],
      toggleFavorite: vi.fn(),
    });
    renderWithRouter();

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez")).toHaveAttribute(
      "src",
      "rick.png"
    );
    expect(screen.getByText("Species")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("SectionComments")).toBeInTheDocument();
  });

  it("should call toggleFavorite when heart button is clicked", () => {
    const toggleFavorite = vi.fn();
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { character: mockCharacter },
    } as any);
    useCharacter.mockReturnValue({
      characters: [mockCharacter],
      toggleFavorite,
    });
    renderWithRouter();

    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);
    expect(toggleFavorite).toHaveBeenCalledWith("1");
  });

  it("should render back arrow on mobile", () => {
    useMediaQuery.mockReturnValue(true);
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { character: mockCharacter },
    } as any);
    useCharacter.mockReturnValue({
      characters: [mockCharacter],
      toggleFavorite: vi.fn(),
    });
    renderWithRouter();

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should not render back arrow on desktop", () => {
    useMediaQuery.mockReturnValue(false);
    useQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { character: mockCharacter },
    } as any);
    useCharacter.mockReturnValue({
      characters: [mockCharacter],
      toggleFavorite: vi.fn(),
    });
    renderWithRouter();

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
