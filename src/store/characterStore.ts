import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "../types/character";

export interface CharacterReturnType {
  characters: Character[];
  favorites: string[];
  deleted: string[];
  selectedCharacter: Character | null;
  setCharacters: (characters: Character[]) => void;
  setSelectedCharacter: (character: Character | null) => void;
  toggleFavorite: (id: string) => void;
  toggleDelete: (id: string) => void;
}

export const useCharacter = create<CharacterReturnType>()(
  persist(
    (set) => ({
      characters: [],
      favorites: [],
      deleted: [],
      selectedCharacter: null,

      setCharacters: (newCharacters) =>
        set((state) => {
          const merged = newCharacters.map((char) => ({
            ...char,
            isFavorite: state.favorites.includes(char.id ?? ""),
            isDeleted: state.deleted.includes(char.id ?? ""), // 👈
          }));
          return { characters: merged };
        }),

      setSelectedCharacter: (character: Character | null) =>
        set({ selectedCharacter: character }),

      toggleFavorite: (id: string) =>
        set((state) => {
          const isFav = state.favorites.includes(id);
          const updatedFavorites = isFav
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id];

          const updatedCharacters = state.characters.map((char) =>
            char.id === id ? { ...char, isFavorite: !char.isFavorite } : char
          );

          return {
            favorites: updatedFavorites,
            characters: updatedCharacters,
          };
        }),

      toggleDelete: (id: string) =>
        set((state) => {
          const isDeleted = state.deleted.includes(id);
          const updatedDeleted = isDeleted
            ? state.deleted.filter((delId) => delId !== id)
            : [...state.deleted, id];

          const updatedCharacters = state.characters.map((char) =>
            char.id === id ? { ...char, isDeleted: !char.isDeleted } : char
          );

          return {
            deleted: updatedDeleted,
            characters: updatedCharacters,
          };
        }),
    }),
    {
      name: "character-store",
      partialize: (state) => ({
        favorites: state.favorites,
        deleted: state.deleted,
      }),
    }
  )
);
