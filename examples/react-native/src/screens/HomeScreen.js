/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { BackgroundView } from '../components/Core/Containers';
import { Button, ButtonText } from '../components/Core/Input';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ navigation, $actions }) => (
  <BackgroundView>
    <SafeAreaView>
      <Button onPress={() => $actions.APP.setThemeName('light')}>
        <ButtonText>Light Theme!</ButtonText>
      </Button>
      <Button onPress={() => $actions.APP.setThemeName('dark')}>
        <ButtonText>Dark Theme!</ButtonText>
      </Button>
      <Button onPress={() => navigation.toggleDrawer()}>
        <ButtonText>Toggle Drawer</ButtonText>
      </Button>
    </SafeAreaView>
  </BackgroundView>
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
)(ThisComponent);
