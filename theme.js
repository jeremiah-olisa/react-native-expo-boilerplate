// const { platformColor } = require("nativewind/dist/theme-functions");

const THEME = {
  light: {
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    cardForeground: "240 10% 3.9%",
    popover: "0 0% 100%",
    popoverForeground: "240 10% 3.9%",
    primary: "240 5.9% 10%",
    primaryForeground: "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    secondaryForeground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    mutedForeground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accentForeground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "240 5.9% 10%",
  },
  dark: {
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    card: "240 10% 3.9%",
    cardForeground: "0 0% 98%",
    popover: "240 10% 3.9%",
    popoverForeground: "0 0% 98%",
    primary: "0 0% 98%",
    primaryForeground: "240 5.9% 10%",
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    muted: "240 3.7% 15.9%",
    mutedForeground: "240 5% 64.9%",
    accent: "240 3.7% 15.9%",
    accentForeground: "0 0% 98%",
    destructive: "0 72% 51%",
    destructiveForeground: "0 0% 98%",
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "240 4.9% 83.9%",
  },
};

/**
 * The function `themedObject` returns an object with color themes based on the input color and
 * foreground option.
 * @param {string} color - The `color` parameter is used to specify the color theme for the object.
 * whether to include a foreground color in the themed object. If `hasForeGround` is set to `true`, the
 * foreground color will be included in the themed object; otherwise, it will be `undefined`.
 */
const themedObject = (color) => ({
  light: THEME.light[color] ? `hsl(${THEME.light[color]})` : undefined,
  DEFAULT: THEME.light[color] ? `hsl(${THEME.light[color]})` : undefined,
  dark: THEME.dark[color] ? `hsl(${THEME.dark[color]})` : undefined,
  foreground: THEME.light[`${color}Foreground`]
    ? `hsl(${THEME.light[`${color}Foreground`]})`
    : undefined,
  "dark-foreground": THEME.dark[`${color}Foreground`]
    ? `hsl(${THEME.dark[`${color}Foreground`]})`
    : undefined,
});

module.exports = { THEME, themedObject };
