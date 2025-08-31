import { Heart, ArrowLeft } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useParams, useNavigate } from "react-router";

import type { Character } from "@/types/character";
import { useCharacter, type CharacterReturnType } from "@/store/characterStore";
import SectionComments from "@/components/characterDetail/SectionComments";
import { useGetCharacter } from "@/api/services/useGetCharacter";

export function CharacterDetail() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { toggleFavorite, characters } = useCharacter() as CharacterReturnType;

  useEffect(() => {
    if (!characterId) {
      navigate("/");
    }
  }, [characterId, navigate]);

  const { data, loading, error } = useGetCharacter({ characterId });

  const characterInfo = useMemo(
    () => [
      { name: "Species", label: data?.character?.species || "N/A" },
      { name: "Status", label: data?.character?.status || "N/A" },
      { name: "Gender", label: data?.character?.gender || "N/A" },
    ],
    [data?.character]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Loading character...
      </div>
    );
  }

  if (error || !data?.character) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No results found
      </div>
    );
  }

  const character: Character | undefined =
    characters.find((c) => c.id === data?.character?.id) ?? data.character;

  return (
    <div className="px-6 md:py-6">
      {isMobile && (
        <NavLink to="/" className="mb-4 p-2" aria-label="Back to home">
          <ArrowLeft className="w-6 h-6 text-primary-700" />
        </NavLink>
      )}

      <div className="flex items-start gap-4 flex-col">
        <div className="relative">
          <img
            src={character.image as string}
            alt={character.name || "image-not-found"}
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            aria-label="favorite-button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(character.id as string);
            }}
            className="absolute left-14 top-14 w-6 h-6 p-1 bg-white rounded-full shadow-sm z-50 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                character.isFavorite
                  ? "fill-secondary-600 text-secondary-600"
                  : "text-gray-400"
              }`}
            />
          </button>
          <h2 className="text-2xl font-bold mb-4 mt-2">{character.name}</h2>
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-4 ">
            {characterInfo.map((info, index) => (
              <div key={index} className="border-b-gray-300 border-b pb-4">
                <h3 className="text-md font-medium text-foreground mb-1">
                  {info.name}
                </h3>
                <p className="text-base text-gray-500">{info.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionComments
        name={character.name as string}
        id={character.id as string}
      />
    </div>
  );
}
