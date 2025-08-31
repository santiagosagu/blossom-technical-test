import { create } from "zustand";

export interface Filter {
  search: string;
  characterType: string;
  species: string;
  sort: string;
}

export interface FilterStore {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  filters: {
    search: "",
    characterType: "All",
    species: "All",
    sort: "",
  },
  setFilters: (filter) => set({ filters: filter }),
}));
