import { create } from "zustand";
import { persist } from "zustand/middleware";

type Comment = {
  id: string;
  characterId: string;
  author: string;
  text: string;
  createdAt: string;
};

type CommentStore = {
  comments: Record<string, Comment[]>;
  addComment: (
    characterId: string,
    comment: Omit<Comment, "id" | "createdAt">
  ) => void;
};

export const useCommentStore = create<CommentStore>()(
  persist(
    (set) => ({
      comments: {},

      addComment: (characterId, comment) => {
        set((state) => {
          const newComment: Comment = {
            ...comment,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            characterId,
          };

          return {
            comments: {
              ...state.comments,
              [characterId]: [
                ...(state.comments[characterId] || []),
                newComment,
              ],
            },
          };
        });
      },
    }),
    {
      name: "character-comments",
    }
  )
);
