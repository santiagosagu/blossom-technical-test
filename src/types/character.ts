import type { GetAllCharactersQuery } from "@/graphql/generated/graphql";

export type CharacterFromAPI = NonNullable<
  NonNullable<GetAllCharactersQuery["characters"]>["results"]
>[0];

export type Character = CharacterFromAPI & {
  isFavorite?: boolean;
  isDeleted?: boolean;
  comments?: string[];
};

export interface FilterState {
  search: string;
  characterType: "All" | "Starred" | "Others";
  species: "All" | "Human" | "Alien";
}
