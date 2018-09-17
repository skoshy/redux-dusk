/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { nameSpaces, stateMapper, actionsMapper } from './src/handlers';
import { BackgroundView } from './src/components/Core/Containers';
import Home from './src/screens/HomeScreen';
import { themes } from './src/themes';

class App extends React.Component {
  getStatusBarTheme() {
    const { $state } = this.props;
    let statusBarTheme = 'dark';

    if ($state.theme === 'dark') {
      statusBarTheme = 'light';
    }

    return statusBarTheme;
  }

  render = () => {
    const { $state } = this.props;

    return (
      <ThemeProvider theme={themes[$state.theme]}>
        <BackgroundView>
          <StatusBar
            barStyle={`${this.getStatusBarTheme()}-content`}
          />
          <Home />
        </BackgroundView>
      </ThemeProvider>
    );
  };
}

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
