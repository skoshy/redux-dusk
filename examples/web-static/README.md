# redux-dusk - Static Web Page Example

This is an example of redux-dusk using React-Static.

## To run...

- do `npm install` in the main redux-dusk folder `(redux-dusk/)`
- do `npm install` in this folder `(redux-dusk/examples/web-static)`
- do `npm start` to start the dev server

## To build...

- do `npm run build` in this folder
- built files will exist in `dist/`

### Building notes

#### Node Safe Code
Remember to write your code so it's node safe, or else it'll work in dev mode, but not when building.

Use the `IS_BROWSER` global in `src/helpers/globals.js` throughout your application anywhere you need to check if your page is being built/rendered with a browser or with pure Node.

An example can be found in the custom PersistGate we're using in `src/components/Loading/CustomPersistGate.js`.

For more information, see react-static's page on Node safe code.
