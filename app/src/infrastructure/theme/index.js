import { colors } from "./colors";
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
export const darkTheme = {
  colors: {
    ...colors,
    white: "black",
    black: "white",
    chat: {
      bg: {
        primary: "black",
        secondary: "#1c1c1c",
      },
      text: "white",
      icon: "#ecdfed",
    },
  },
  space,
  lineHeights,
  sizes,
  fonts,
  buttonSizes,
  fontSizes,
  fontWeights,
};
