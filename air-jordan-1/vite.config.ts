import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname),
  plugins: [reactRefresh(), viteSingleFile()],
  assetsInclude: ['**/*.glb', '**/*.hdr'],
  build: {
    outDir: resolve(__dirname, "../public/air-jordan-1"),
    emptyOutDir: true,

    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
});