import { defineConfig } from "vite";

export default defineConfig({
    root: "src",
    base: "/tv-shows/",
    build: {
        outDir: "../dist",
        emptyOutDir: true
    }
});