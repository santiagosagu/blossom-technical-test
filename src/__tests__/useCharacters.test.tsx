import { renderHook, waitFor } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client/react";
import { useGetAllCharacters } from "@/api/services/useGetAllCharacter";
import { client } from "@/lib/apolloClient";

describe("useCharacters with MSW", () => {
  it("should return characters from the API", async () => {
    const { result } = renderHook(() => useGetAllCharacters(), {
      wrapper: ({ children }) => (
        <ApolloProvider client={client}>{children}</ApolloProvider>
      ),
    });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.error).toBeUndefined();

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.characters?.results).toEqual([
      { id: "1", name: "Rick" },
      { id: "2", name: "Morty" },
    ]);
  });
});
