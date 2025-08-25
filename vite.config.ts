import vercelAdapter from "@lazarv/react-server-adapter-vercel";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  adapter: vercelAdapter({
    serverlessFunctions: false,
  }),
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-react-compiler",
            {
              compilationMode: "annotation",
            },
          ],
        ],
      },
    }),
  ],
  resolve: { alias: { "~/": "/src/" } },
});
