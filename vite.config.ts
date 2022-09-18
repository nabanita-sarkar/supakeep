import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      components: path.resolve("src/components"),
      pages: path.resolve("src/pages"),
      styles: path.resolve("src/styles"),
      utils: path.resolve("src/utils"),
    },
  },
});
