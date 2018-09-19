import colors from './colors';

/* eslint-disable new-parens, func-names */
export const themes = new function () {
  // Light Theme
  this.light = new function () {
    this.backgroundColor = colors.white;
    this.text = colors.black;

    this.button = new function () {
      this.background = colors.white;
      this.text = colors.black;
    };

    this.drawerBackgroundColor = this.backgroundColor;

    this.primary = colors.blue;
    this.contrast = colors.green;
  };

  // Dark Theme
  this.dark = new function () {
    this.backgroundColor = colors.black;
    this.text = colors.white;

    this.button = new function () {
      this.background = colors.white;
      this.text = colors.black;
    };

    this.drawerBackgroundColor = this.backgroundColor;

    this.primary = colors.lightBlue;
    this.contrast = colors.lightGreen;
  };
};
/* eslint-enable new-parens, func-names */

export default themes;
