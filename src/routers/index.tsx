import { createBrowserRouter } from "react-router";

import NotFound from "../pages/NotFound";
import RootLayout from "@/components/RootLayout";
import { CharacterDetail } from "../pages/CharacterDetail";
import { FilterPanel } from "../pages/mobile/FilterPanel";
import RootHome from "@/pages/RootHome";

const useRouterApp = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <RootHome />,
        },
        {
          path: "/character-detail/:characterId",
          element: <CharacterDetail />,
        },
      ],
    },
    {
      path: "/filters",
      element: <FilterPanel />,
    },
  ]);

  return router;
};

export default useRouterApp;
