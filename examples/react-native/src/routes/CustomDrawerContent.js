import React from 'react';
import { connect } from 'react-redux';
import {
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { ScrollView, StyleSheet } from 'react-native';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const CustomDrawerContentComponent = props => (
  <ScrollView style={{ backgroundColor: 'blue' }}>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
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
)(CustomDrawerContentComponent);
