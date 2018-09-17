// we're taking these colors from X11 - https://en.wikipedia.org/wiki/Web_colors#X11_color_names
import colors from './colors';

export const themes = {
  light: {
    background: colors.white,
    text: colors.black,

    button: {
      background: colors.white,
      text: colors.black,
    },

    primary: colors.blue,
    contrast: colors.green,
  },

  dark: {
    background: colors.black,
    text: colors.white,

    button: {
      background: colors.white,
      text: colors.black,
    },

    primary: colors.lightBlue,
    contrast: colors.lightGreen,
  },
};

export default themes;
