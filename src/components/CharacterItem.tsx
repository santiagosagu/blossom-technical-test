import { Heart, Trash } from "lucide-react";
import type { Character } from "../types/character";
import {
  useCharacter,
  type CharacterReturnType,
} from "../store/characterStore";
import { useNavigate } from "react-router";
import { ConfirmDeleteDialog } from "./ui/ConfirmDialog";
import { useState } from "react";

interface CharacterItemProps {
  character: Character;
  isSelected: boolean;
}

export default function CharacterItem({
  character,
  isSelected,
}: CharacterItemProps) {
  const { toggleFavorite, toggleDelete, setSelectedCharacter } =
    useCharacter() as CharacterReturnType;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex items-center gap-3 p-3  cursor-pointer transition-colors border-t-gray-100 border-t-1 md:rounded-lg  ${
        isSelected ? "md:bg-primary-100 " : "hover:bg-gray-100 "
      }`}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedCharacter(character);

        if (!open) {
          navigate(`/character-detail/${character.id}`);
        }
      }}
    >
      <div className="relative">
        <img
          src={character.image as string}
          alt={character.name as string}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{character.name}</h3>
        <p className="text-xs text-gray-500">{character.species}</p>
      </div>

      <button
        aria-label="favorite-button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(character.id as string);
        }}
        className="p-1 h-auto cursor-pointer"
      >
        <Heart
          data-testid="heart-button"
          className={`w-4 h-4 ${
            character.isFavorite
              ? "fill-secondary-600 text-secondary-600"
              : "text-gray-400"
          }`}
        />
      </button>
      <button
        aria-label="trash-button"
        data-testid="trash-button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="p-1 h-auto cursor-pointer text-gray-400 hover:text-red-500"
      >
        <Trash className="w-4 h-4" />
      </button>

      <ConfirmDeleteDialog
        open={open}
        onOpenChange={setOpen}
        characterName={character.name as string}
        onConfirm={() => toggleDelete(character.id as string)}
      />
    </div>
  );
}
