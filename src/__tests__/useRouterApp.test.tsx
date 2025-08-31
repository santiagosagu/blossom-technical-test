import useRouterApp from "@/routers";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ characterId: "1" }),
  };
});

describe("useRouterApp", () => {
  it("should return a valid router configuration", () => {
    const router = useRouterApp();

    expect(router).toBeDefined();
    expect(typeof router.navigate).toBe("function");
    expect(typeof router.subscribe).toBe("function");
  });

  it("should have correct route structure", () => {
    const router = useRouterApp();

    expect(router.routes).toBeDefined();
    expect(router.routes).toHaveLength(2);

    const mainRoute = router.routes[0];
    expect(mainRoute.path).toBe("/");
    expect(mainRoute.children).toHaveLength(2);

    const filtersRoute = router.routes[1];
    expect(filtersRoute.path).toBe("/filters");
  });

  it("should handle route matching correctly", () => {
    const router = useRouterApp();

    const homeMatch = router.routes[0];
    expect(homeMatch.path).toBe("/");

    const filtersMatch = router.routes[1];
    expect(filtersMatch.path).toBe("/filters");

    const nestedRoutes = router.routes[0].children;
    const characterDetailRoute = nestedRoutes!.find(
      (route) => route.path === "/character-detail/:characterId"
    );
    expect(characterDetailRoute).toBeDefined();
  });
});
