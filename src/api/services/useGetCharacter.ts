import {
  GetCharacterDocument,
  type GetCharacterQuery,
  type GetCharacterQueryVariables,
} from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";

export const useGetCharacter = ({ characterId }: { characterId?: string }) => {
  const { data, loading, error } = useQuery<
    GetCharacterQuery,
    GetCharacterQueryVariables
  >(GetCharacterDocument, {
    variables: { id: characterId! },
    skip: !characterId,
  });

  return {
    data,
    loading,
    error,
  };
};
