module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
  ],
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  rules: {
    'react/prop-types': [
      'warn',
      {
        skipUndeclared: true,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prefer-stateless-function': [
      1,
    ],
    'jsx-a11y/anchor-is-valid': [
      0,
    ],
    /*
      allows declarations like this:
      const blah = (d) => {
        return d;
      };

      instead of requiring it to be
      const blah = (d) => d;
    */
    'arrow-body-style': [
      0,
    ],
    'arrow-parens': [
      0,
    ],
    /*
      we include the common-tags package to help with tagged template issues
      https://github.com/declandewet/common-tags

      good use-case is the stripIndent function

      this package is better than the dedent packages, which are similar
    */
    'quotes': [
      "error",
      "backtick",
      {
        "avoidEscape": true,
      },
    ],
    'no-multi-spaces': [
      0,
      {
        ignoreEOLComments: true,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { minProperties: 8, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 8, multiline: true, consistent: true },
        ImportDeclaration: { minProperties: 8, multiline: true, consistent: true },
        ExportDeclaration: { minProperties: 8, multiline: true, consistent: true },
      },
    ],
  },
};
