import { ArrowDownUp, Search, SlidersHorizontal } from "lucide-react";
import { useCharacterActions } from "@/hooks/useCharacterActions";
import { NavLink } from "react-router";

import { useCharacter, type CharacterReturnType } from "@/store/characterStore";
import CharacterItem from "@/components/CharacterItem";
import { useFilter } from "@/store/filterStore";

export const HomeMobile = () => {
  const { selectedCharacter } = useCharacter() as CharacterReturnType;
  const { filters, setFilters } = useFilter();

  const {
    showFilters,
    activeFiltersCount,
    filteredCharacters,
    starredCharacters,
    regularCharacters,
  } = useCharacterActions();

  const handleSort = () => {
    const newSort =
      filters.sort === "" ? "az" : filters.sort === "az" ? "za" : "";
    setFilters({ ...filters, sort: newSort });
  };

  return (
    <div className="md:hidden">
      <div className="p-4 pt-10">
        <h1 className="text-2xl font-bold mb-4">Rick and Morty list</h1>

        <div className="flex gap-2 mb-4 bg-gray-100 rounded-lg py-1 pl-3 pr-4">
          <div className="relative flex-1 bg-gray-100 py-2">
            <Search className="absolute text-gray-500 left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            <input
              placeholder="Search or filter results"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="pl-10 text-[14px] focus:outline-none text-gray-500"
            />
          </div>
          <button
            aria-label="Sort by name"
            data-testid="sort-data"
            onClick={handleSort}
            className={`relative text-primary-700 my-1 p-2 trans ${
              filters.sort !== "" ? "bg-primary-100 rounded-md" : "bg-none"
            }`}
          >
            <ArrowDownUp className="w-4 h-4 cursor-pointer" />
            {filters.sort !== "" && (
              <span
                className={`absolute -top-1 -right-2 rounded-full text-[10px] w-5 h-5 flex items-center justify-center bg-white text-primary-700 $`}
              >
                {filters.sort === "az" ? "A-Z" : "Z-A"}
              </span>
            )}
          </button>
          <NavLink
            aria-label="show filters"
            to={"/filters"}
            className={`relative text-primary-700 my-1 p-2 trans ${
              showFilters ? "bg-primary-100 rounded-md" : "bg-none"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 cursor-pointer" />
            {activeFiltersCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 rounded-full text-xs w-5 h-5 flex items-center justify-center bg-white text-primary-700 $`}
              >
                {activeFiltersCount}
              </span>
            )}
          </NavLink>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 justify-between mx-1 mt-8 border-y-gray-100 border-y-1 py-4">
            <span className="text-sm text-blue-600 font-bold">
              {filteredCharacters.length} Results
            </span>
            <span className="text-xs  px-2 py-1 rounded-xl bg-green-100 text-green-600 font-bold">
              {activeFiltersCount} Filter
            </span>
          </div>
        )}

        <div className="space-y-4">
          {starredCharacters.length > 0 && (
            <div className="my-6">
              <h2 className="text-xs font-medium mb-3 uppercase tracking-wide text-gray-400 ">
                STARRED CHARACTERS ({starredCharacters.length})
              </h2>
              <div className="space-y-2">
                {starredCharacters.map((character) => (
                  <CharacterItem
                    key={character.id}
                    character={character}
                    isSelected={selectedCharacter?.id === character.id}
                  />
                ))}
              </div>
            </div>
          )}

          {regularCharacters.length > 0 && (
            <div className="my-6">
              <h2 className="text-xs font-medium  mb-3 uppercase tracking-wide text-gray-400 ">
                CHARACTERS ({regularCharacters.length})
              </h2>
              <div className="space-y-2">
                {regularCharacters.map((character) => (
                  <CharacterItem
                    key={character.id}
                    character={character}
                    isSelected={selectedCharacter?.id === character.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
