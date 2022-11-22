import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  build: {
    commonjsOptions: {
      ignoreTryCatch: false,
    },
    sourcemap: true,
  },
  plugins: [react(), wasm(), topLevelAwait()],
});
