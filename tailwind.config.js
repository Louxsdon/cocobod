import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        colors: {
            ...colors,
        },
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            minHeight: {
                "screen-75": "75vh",
            },
            fontSize: {
                55: "55rem",
            },
            opacity: {
                80: ".8",
            },
            zIndex: {
                2: 2,
                3: 3,
            },
            inset: {
                "-100": "-100%",
                "-225-px": "-225px",
                "-160-px": "-160px",
                "-150-px": "-150px",
                "-94-px": "-94px",
                "-50-px": "-50px",
                "-29-px": "-29px",
                "-20-px": "-20px",
                "25-px": "25px",
                "40-px": "40px",
                "95-px": "95px",
                "145-px": "145px",
                "195-px": "195px",
                "210-px": "210px",
                "260-px": "260px",
            },
            height: {
                "95-px": "95px",
                "70-px": "70px",
                "350-px": "350px",
                "500-px": "500px",
                "600-px": "600px",
            },
            maxHeight: {
                "860-px": "860px",
            },
            maxWidth: {
                "100-px": "100px",
                "120-px": "120px",
                "150-px": "150px",
                "180-px": "180px",
                "200-px": "200px",
                "210-px": "210px",
                "580-px": "580px",
            },
            minWidth: {
                "140-px": "140px",
                48: "12rem",
            },
            backgroundSize: {
                full: "100%",
            },
        },
    },
    variants: [
        "responsive",
        "group-hover",
        "focus-within",
        "first",
        "last",
        "odd",
        "even",
        "hover",
        "focus",
        "active",
        "visited",
        "disabled",
    ],
    plugins: [
        forms,

        plugin(function ({ addComponents, theme }) {
            const screens = theme("screens", {});
            addComponents([
                {
                    ".container": { width: "100%" },
                },
                {
                    [`@media (min-width: ${screens.sm})`]: {
                        ".container": {
                            "max-width": "640px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens.md})`]: {
                        ".container": {
                            "max-width": "768px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens.lg})`]: {
                        ".container": {
                            "max-width": "1024px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens.xl})`]: {
                        ".container": {
                            "max-width": "1280px",
                        },
                    },
                },
                {
                    [`@media (min-width: ${screens["2xl"]})`]: {
                        ".container": {
                            "max-width": "1280px",
                        },
                    },
                },
            ]);
        }),
        require("daisyui"),
    ],

    daisyui: {
        themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "light", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    },
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
// 	],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       keyframes: {
//         "accordion-down": {
//           from: { height: 0 },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: 0 },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }
