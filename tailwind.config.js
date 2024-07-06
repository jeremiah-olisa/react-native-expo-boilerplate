const { hairlineWidth } = require("nativewind/dist/theme-functions");
const { themedObject } = require("./theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "selector", '[data-mode="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: themedObject("border"),
        input: themedObject("input"),
        ring: themedObject("ring"),
        background: themedObject("background"),
        foreground: themedObject("foreground"),
        primary: themedObject("primary"),
        secondary: themedObject("secondary"),
        destructive: themedObject("destructive"),
        muted: themedObject("muted"),
        accent: themedObject("accent"),
        popover: themedObject("popover"),
        card: themedObject("card"),
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
