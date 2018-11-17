/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { nameSpaces, stateMapper, actionsMapper } from './src/handlers';
import { BackgroundView } from './src/components/Core/Containers';
import { DefaultRoute } from './src/routes';
import { themes } from './src/themes';

class App extends React.Component {
  getStatusBarTheme = () => {
    const { $state } = this.props;
    const statusBarTheme = {
      translucent: false,
      background: null,
      content: `dark`,
    };

    if ($state.themeName === `dark`) {
      statusBarTheme.content = `light`;
    }

    // force black status bar on Android
    if (Platform.OS === `android`) {
      statusBarTheme.content = `light`;
      statusBarTheme.background = `black`;
    }

    return statusBarTheme;
  }

  getStatusBarBackground = () => {
    let background = null;

    if (Platform.OS === `android`) {
      background = `black`;
    }

    return background;
  }

  render = () => {
    const { $state } = this.props;
    const statusBarTheme = this.getStatusBarTheme();

    return (
      <ThemeProvider theme={themes[$state.themeName]}>
        <BackgroundView>
          <StatusBar
            translucent={statusBarTheme.translucent}
            backgroundColor={statusBarTheme.background}
            barStyle={`${statusBarTheme.content}-content`}
          />
          <DefaultRoute />
        </BackgroundView>
      </ThemeProvider>
    );
  }
}

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    themeName: [nameSpaces.APP],
  }),

  // actions -> maps to this.props.$actions.{HANDLER_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(App);
