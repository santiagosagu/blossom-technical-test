import "@testing-library/jest-dom";
import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./__tests__/msw/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn",
  });
  console.log("🚀 MSW server started");
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  console.log("🛑 MSW server stopped");
});
