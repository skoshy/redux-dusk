/**
 * @format
 * @flow
 */

import React from 'react';
import {
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { BackgroundView } from '../components/Core/Containers';
import { Header1 } from '../components/Core/Text';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ navigation, $actions }) => (
  <BackgroundView>
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Header1>Settings</Header1>
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
