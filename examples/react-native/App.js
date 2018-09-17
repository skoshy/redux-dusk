/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { nameSpaces, stateMapper, actionsMapper } from './src/handlers';
import Home from './src/screens/HomeScreen';
import { themes } from './src/themes';

const App = ({ $state }) => (
  <ThemeProvider theme={themes[$state.theme]}>
    <Home />
  </ThemeProvider>
);

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    theme: [nameSpaces.APP],
  }),

  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(App);
