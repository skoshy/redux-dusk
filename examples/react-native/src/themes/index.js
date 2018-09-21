import colors from './colors';

/* eslint-disable new-parens, func-names */
export const themes = new function () {
  // Light Theme
  this.light = new function () {
    this.backgroundColor = colors.LIGHT_GREY;
    this.textColor = colors.BLACK;

    this.button = new function () {
      this.background = colors.WHITE;
      this.text = colors.BLACK;
    };

    this.drawerBackgroundColor = this.backgroundColor;

    this.headerBackgroundColor = this.backgroundColor;
    this.headerTitleColor = this.textColor;

    this.postBackgroundColor = colors.WHITE;

    this.primary = colors.BLUE;
    this.contrast = colors.GREEN;
  };

  // Dark Theme
  this.dark = new function () {
    this.backgroundColor = colors.BLACK;
    this.textColor = colors.WHITE;

    this.button = new function () {
      this.background = colors.WHITE;
      this.text = colors.BLACK;
    };

    this.drawerBackgroundColor = this.backgroundColor;

    this.headerBackgroundColor = this.backgroundColor;
    this.headerTitleColor = this.textColor;

    this.postBackgroundColor = this.backgroundColor;

    this.primary = colors.LIGHT_BLUE;
    this.contrast = colors.LIGHT_GREEN;
  };
};
/* eslint-enable new-parens, func-names */

export default themes;
