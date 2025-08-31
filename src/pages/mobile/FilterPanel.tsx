import { ArrowLeft } from "lucide-react";
import type { FilterState } from "../../types/character";
import { useCharacterActions } from "../../hooks/useCharacterActions";
import { Navigate, NavLink, useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import { useMemo } from "react";
import {
  filterOptionsCharacter,
  filterOptionsSpecies,
} from "@/constants/filterOpctions";

export function FilterPanel() {
  const { tempFilters, setTempFilters, handleApplyFilters } =
    useCharacterActions();

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const filterListOptionsStarredCharacters = useMemo(
    () => filterOptionsCharacter,
    []
  );

  const filterListOptionsSpecies = useMemo(() => filterOptionsSpecies, []);

  if (!isMobile) {
    return <Navigate to="/" replace />;
  }

  const handleApplyFiltersAndNavigate = () => {
    handleApplyFilters();
    navigate("/");
  };

  return (
    <div className="p-4 bg-background border-r h-screen flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <NavLink to="/" className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </NavLink>
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-400">
              Characters
            </h3>
            <div className="flex gap-2">
              {filterListOptionsStarredCharacters.map((type) => (
                <button
                  data-testid={`option-${type}`}
                  key={type}
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      characterType: type as FilterState["characterType"],
                    }))
                  }
                  className={`flex-1 text-xs border py-3 rounded-md border-gray-200 ${
                    tempFilters.characterType === type &&
                    "bg-primary-100 text-primary-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-400">Species</h3>
            <div className="flex gap-2">
              {filterListOptionsSpecies.map((species) => (
                <button
                  data-testid={`option-${species}`}
                  key={species}
                  onClick={() =>
                    setTempFilters((prev) => ({
                      ...prev,
                      species: species ?? "All",
                    }))
                  }
                  className={`flex-1 text-xs border py-3 rounded-md border-gray-200 ${
                    tempFilters.species === species &&
                    "bg-primary-100 text-primary-700"
                  }`}
                >
                  {species}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          data-testid="submit-filter-mobile"
          onClick={handleApplyFiltersAndNavigate}
          className="w-full bg-primary-700 rounded-md py-2 text-primary-100"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
