/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { BackgroundView, PostContainer } from '../components/Core/Containers';
import { Button, ButtonText } from '../components/Core/Input';
import { Text } from '../components/Core/Text';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ navigation, $actions }) => (
  <BackgroundView>
    <SafeAreaView style={{ flex: 1 }}>
      
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
