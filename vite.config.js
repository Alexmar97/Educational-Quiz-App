import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Simulate a browser environment
    setupFiles: "./setupTests.js", // Add setup file for jest-dom
  },
});
