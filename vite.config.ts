import serverOption from "./serverOption";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: serverOption,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '~quill/dist/quill.core.css';
          @import '~quill/dist/quill.snow.css';
          @import '~quill/dist/quill.bubble.css';
        `,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
