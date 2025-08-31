import MobileLayout from "@/components/MobileLayout";
import DesktopLayout from "@/components/DesktopLayout";
import { useCharacter, type CharacterReturnType } from "@/store/characterStore";
import { useEffect } from "react";
import { useGetAllCharacters } from "@/api/services/useGetAllCharacter";

export default function RootLayout() {
  const { data } = useGetAllCharacters();

  const { setCharacters } = useCharacter() as CharacterReturnType;

  useEffect(() => {
    if (data?.characters?.results) {
      const normalized = data.characters.results
        .filter((c): c is NonNullable<typeof c> => c !== null)
        .map((c) => ({ ...c, isFavorite: false, isDeleted: false }));

      setCharacters(normalized);
    }
  }, [data, setCharacters]);

  return (
    <div className="min-h-screen bg-background">
      <MobileLayout />

      <DesktopLayout />
    </div>
  );
}
