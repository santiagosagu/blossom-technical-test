import { useMemo, useState } from "react";
import {
  useCharacter,
  type CharacterReturnType,
} from "../store/characterStore";
import { useFilter } from "@/store/filterStore";

export const useCharacterActions = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { filters, setFilters } = useFilter();
  const [tempFilters, setTempFilters] = useState(filters);

  const { characters } = useCharacter() as CharacterReturnType;

  const visibleCharacters = characters.filter((c) => !c.isDeleted);

  const filteredCharacters = useMemo(() => {
    let filtered = visibleCharacters.filter((character) => {
      const name = character.name ?? "";
      const matchesSearch = name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesType =
        filters.characterType === "All" ||
        (filters.characterType === "Starred" && character.isFavorite) ||
        (filters.characterType === "Others" && !character.isFavorite);

      const matchesSpecies =
        filters.species === "All" || character.species === filters.species;

      return matchesSearch && matchesType && matchesSpecies;
    });

    if (filters.sort === "az") {
      filtered = filtered.sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "")
      );
    } else if (filters.sort === "za") {
      filtered = filtered.sort((a, b) =>
        (b.name ?? "").localeCompare(a.name ?? "")
      );
    }

    return filtered;
  }, [filters, visibleCharacters]);

  const starredCharacters = filteredCharacters.filter(
    (char) => char.isFavorite
  );
  const regularCharacters = filteredCharacters.filter(
    (char) => !char.isFavorite
  );

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const activeFiltersCount = [
    filters.characterType !== "All",
    filters.species !== "All",
  ].filter(Boolean).length;

  return {
    filters,
    tempFilters,
    filteredCharacters,
    showFilters,
    activeFiltersCount,
    starredCharacters,
    regularCharacters,
    visibleCharacters,

    setFilters,
    setTempFilters,
    setShowFilters,
    handleApplyFilters,
  };
};
