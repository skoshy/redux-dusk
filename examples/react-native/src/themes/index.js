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

    this.headerBackgroundColor = colors.LIGHT_GREEN;
    this.headerTitleColor = this.textColor;

    this.postBackgroundColor = colors.WHITE;
    this.postShadowColor = colors.GREY;

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

    this.headerBackgroundColor = colors.DARK_GREEN;
    this.headerTitleColor = this.textColor;

    this.postBackgroundColor = colors.DARK_GREY;
    this.postShadowColor = colors.GREY;

    this.primary = colors.LIGHT_BLUE;
    this.contrast = colors.LIGHT_GREEN;
  };

  // Candy Theme
  this.candy = new function () {
    this.backgroundColor = colors.LIGHT_PINK;
    this.textColor = colors.DARK_PINK;

    this.button = new function () {
      this.background = colors.WHITE;
      this.text = colors.BLACK;
    };

    this.drawerBackgroundColor = this.backgroundColor;

    this.headerBackgroundColor = colors.PINK;
    this.headerTitleColor = colors.BLACK;

    this.postBackgroundColor = colors.WHITE;
    this.postShadowColor = colors.GREY;

    this.primary = colors.LIGHT_BLUE;
    this.contrast = colors.LIGHT_GREEN;
  };
};
/* eslint-enable new-parens, func-names */

export default themes;
