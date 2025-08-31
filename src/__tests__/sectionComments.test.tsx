import { render, screen, fireEvent, act } from "@testing-library/react";
import SectionComments from "@/components/characterDetail/SectionComments";
import { useCommentStore } from "@/store/commentStore";
import { vi } from "vitest";

const initialState = useCommentStore.getState();

describe("SectionComments with real store", () => {
  const characterId = "1";
  const characterName = "Rick";

  beforeEach(() => {
    act(() => {
      useCommentStore.setState(initialState);
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render "No comments yet" when the store is empty', () => {
    render(<SectionComments id={characterId} name={characterName} />);
    expect(screen.getByText("No comments yet")).toBeInTheDocument();
  });

  it("should render existing comments from the store", () => {
    act(() => {
      useCommentStore.getState().addComment(characterId, {
        author: "Test User",
        text: "This is a real comment",
        characterId: characterId,
      });
    });

    render(<SectionComments id={characterId} name={characterName} />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("This is a real comment")).toBeInTheDocument();
  });

  it("should enable submit button only when name and comment are filled", () => {
    render(<SectionComments id={characterId} name={characterName} />);
    const submitButton = screen.getByTestId("button-submit-comment");
    const nameInput = screen.getByPlaceholderText("Enter your name...");
    const commentInput = screen.getByPlaceholderText(/What do you think/i);

    expect(submitButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(commentInput, { target: { value: "A great character!" } });
    expect(submitButton).toBeEnabled();
  });

  it("should add the comment to the store on submission", async () => {
    render(<SectionComments id={characterId} name={characterName} />);
    const submitButton = screen.getByTestId("button-submit-comment");
    const nameInput = screen.getByPlaceholderText(
      "Enter your name..."
    ) as HTMLInputElement;
    const commentInput = screen.getByPlaceholderText(
      /What do you think/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(commentInput, { target: { value: "Awesome!" } });

    fireEvent.click(submitButton);

    await act(async () => {
      vi.runAllTimers();
    });

    const comments = useCommentStore.getState().comments[characterId];
    expect(comments).toHaveLength(1);
    expect(comments[0].author).toBe("Jane Doe");
    expect(comments[0].text).toBe("Awesome!");

    expect(nameInput.value).toBe("");
    expect(commentInput.value).toBe("");
  });
});
