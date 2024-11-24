import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Certifique-se de que está configurado corretamente para o root
  build: {
    outDir: "dist", // O diretório de saída do build
  },
});
