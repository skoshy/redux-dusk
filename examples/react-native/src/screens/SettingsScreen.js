/**
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { BackgroundView } from '../components/Core/Containers';
import { Header1 } from '../components/Core/Text';
import { Button, ButtonText } from '../components/Core/Input';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ $actions }) => (
  <BackgroundView>
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Header1>Settings</Header1>
      <Button style={{ marginTop: 20 }} onPress={() => $actions.APP.setThemeName(`light`)}>
        <ButtonText>Light Theme</ButtonText>
      </Button>
      <Button onPress={() => $actions.APP.setThemeName(`dark`)}>
        <ButtonText>Dark Theme</ButtonText>
      </Button>
      <Button onPress={() => $actions.APP.setThemeName(`candy`)}>
        <ButtonText>Candy Theme</ButtonText>
      </Button>
    </SafeAreaView>
  </BackgroundView>
);

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    theme: [nameSpaces.APP],
  }),

  // actions -> maps to this.props.$actions.{HANDLER_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(ThisComponent);
