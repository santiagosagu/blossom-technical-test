/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        "src/graphql/generated/**",
        "src/generated/**",
        "src/lib/**",
        "src/graphql/queries/**",
        "**/*.d.ts",
        "**/*.d.ts",
        "vite.config.*",
        "src/setupTests.ts",
        "src/main.tsx",
        "codegen.ts",
        "eslint.config.js",
        "tailwind.config.ts",
        "src/components/ui/**",
      ],
    },
  },
});
