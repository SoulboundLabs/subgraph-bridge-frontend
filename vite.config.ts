import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
  plugins: [react()],
});
