import { url } from "inspector";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "brush-stroke-1": "url('./static/strokes/brush-stroke-1.svg')",
                "underline-stroke":
                    "url('./static/strokes/underline-stroke.svg')",
                "brush-stroke-2": "url('./static/strokes/brush-stroke-2.svg')",
            },
        },
    },
    plugins: [],
};
export default config;
