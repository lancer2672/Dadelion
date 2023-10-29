import { colors, darkColors } from "./colors";
import { space, lineHeights } from "./spacing";
import { sizes, buttonSizes } from "./sizes";
import { fonts, fontWeights, fontSizes } from "./fonts";

export const theme = {
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  buttonSizes,
  fontSizes,
  fontWeights,
};

export const colors = {
  bg: {
    primary: "#f6f9ff",
    secondary: "#b3afab",
  },
  text: {
    primary: "#000000",
    secondary: "#e3c3de",
    error: "#e35d5d",
    success: "#138000",
  },
};

export const darkTheme = {
  colors: darkColors,
  space,
  lineHeights,
  sizes,
  fonts,
  buttonSizes,
  fontSizes,
  fontWeights,
};
