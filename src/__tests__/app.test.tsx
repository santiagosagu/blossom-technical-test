import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client/react";
import { RouterProvider } from "react-router";

import App from "@/App";
import { client } from "@/lib/apolloClient";
import useRouterApp from "@/routers";

const Wrapper: React.FC<{ children: React.ReactNode }> = () => {
  const router = useRouterApp();
  const queryClient = new QueryClient();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ApolloProvider>
  );
};

describe("App integration", () => {
  it("renders the home page and loads characters", async () => {
    render(<App />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText("Rick")).toBeInTheDocument();
      expect(screen.getByText("Morty")).toBeInTheDocument();
    });
  });
});
