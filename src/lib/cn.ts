import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge não conhece os tamanhos de texto custom (--text-h1, --text-h2...)
 * definidos em globals.css: sem essa extensão, ele acha que "text-h2" conflita com
 * cores de texto como "text-noite" e descarta o tamanho, deixando o título ~16px.
 */
export const cn = extendTailwindMerge({
  extend: { theme: { text: ["h1", "h2", "h3", "body-lg", "body", "label", "micro"] } },
});
