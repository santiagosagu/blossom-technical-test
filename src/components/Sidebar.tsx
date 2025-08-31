import { ArrowDownUp, Search, SlidersHorizontal } from "lucide-react";
import type { FilterState } from "../types/character";

import {
  useCharacter,
  type CharacterReturnType,
} from "../store/characterStore";
import { useCharacterActions } from "../hooks/useCharacterActions";
import CharacterItem from "./CharacterItem";
import { useFilter } from "@/store/filterStore";
import { useMemo } from "react";
import {
  filterOptionsCharacter,
  filterOptionsSpecies,
} from "@/constants/filterOpctions";

export const Sidebar = () => {
  const { selectedCharacter } = useCharacter() as CharacterReturnType;
  const { filters, setFilters } = useFilter();

  const filterListOptionsType = useMemo(() => filterOptionsCharacter, []);

  const filterListOptionsSpecies = useMemo(() => filterOptionsSpecies, []);

  const {
    tempFilters,
    filteredCharacters,
    showFilters,
    setTempFilters,
    setShowFilters,
    handleApplyFilters,
    activeFiltersCount,
    starredCharacters,
    regularCharacters,
  } = useCharacterActions();

  const handleSort = () => {
    const newSort =
      filters.sort === "" ? "az" : filters.sort === "az" ? "za" : "";
    setFilters({ ...filters, sort: newSort });
  };

  return (
    <div className="w-80 bg-neutral-50 flex flex-col py-4 h-screen">
      <div className="p-4 ">
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
            onClick={handleSort}
            className={`relative text-primary-700 my-1 p-2 -left-2 ${
              filters.sort !== "" ? "bg-primary-100 rounded-md" : "bg-none"
            }`}
          >
            <ArrowDownUp className="w-4 h-4 cursor-pointer" />
            {filters.sort !== "" && (
              <span
                className={`absolute -top-1 -right-2 rounded-full text-[10px] w-5 h-5 flex items-center justify-center bg-white text-primary-700 cursor-pointer`}
              >
                {filters.sort === "az" ? "A-Z" : "Z-A"}
              </span>
            )}
          </button>
          <button
            data-testid="filter-button"
            aria-label="show filters"
            onClick={() => {
              if (!showFilters) {
                setTempFilters(filters);
              }
              setShowFilters(!showFilters);
            }}
            className={`relative text-primary-700 my-1 p-2 -left-2 ${
              showFilters ? "bg-primary-100 rounded-md" : "bg-none"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 cursor-pointer" />
            {activeFiltersCount > 0 && (
              <span
                className={`absolute -top-1 -right-2  rounded-full text-xs w-5 h-5 flex items-center justify-center bg-white text-primary-700 cursor-pointer`}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="space-y-4 p-5  rounded-lg mb-4 border border-gray-200 bg-white shadow-lg ">
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-400">
                Character
              </h3>
              <div className="flex gap-1">
                {filterListOptionsType.map((type) => (
                  <button
                    data-testid={`filter-option-starred-${type}`}
                    key={type}
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        characterType: type as FilterState["characterType"],
                      }))
                    }
                    className={`flex-1 text-xs border py-3 rounded-md border-gray-200 cursor-pointer ${
                      tempFilters.characterType === type && "bg-primary-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-400">Specie</h3>
              <div className="flex gap-1">
                {filterListOptionsSpecies.map((species) => (
                  <button
                    data-testid={`filter-option-species-${species}`}
                    key={species}
                    onClick={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        species: species ?? "All",
                      }))
                    }
                    className={`flex-1 text-xs border py-3 rounded-md border-gray-200 cursor-pointer ${
                      tempFilters.species === species && "bg-primary-100"
                    }`}
                  >
                    {species}
                  </button>
                ))}
              </div>
            </div>

            <button
              data-testid="filter-apply-button"
              onClick={handleApplyFilters}
              className="w-full bg-primary-700 rounded-md py-2 text-primary-100 cursor-pointer"
            >
              Filter
            </button>
          </div>
        )}

        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 justify-between mx-4 mt-8">
            <span className="text-sm text-blue-600 font-bold">
              {filteredCharacters.length} Results
            </span>
            <span className="text-xs  px-2 py-1 rounded-xl bg-green-100 text-green-600 font-bold">
              {activeFiltersCount} Filter
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {starredCharacters.length > 0 && (
          <div>
            <h2 className="text-xs font-medium mb-3 uppercase tracking-wide text-gray-400 ml-3.5">
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
          <div>
            <h2 className="text-xs font-medium  mb-3 uppercase tracking-wide text-gray-400 ml-3.5">
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
  );
};
