import {
  GetAllCharactersDocument,
  type GetAllCharactersQuery,
  type GetAllCharactersQueryVariables,
} from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";

export const useGetAllCharacters = () => {
  const { data, loading, error } = useQuery<
    GetAllCharactersQuery,
    GetAllCharactersQueryVariables
  >(GetAllCharactersDocument, {
    variables: { page: 1 },
  });

  return {
    data,
    loading,
    error,
  };
};
