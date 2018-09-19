import React from 'react';
import { connect } from 'react-redux';
import {
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { ScrollView, StyleSheet } from 'react-native';
import { withTheme } from 'styled-components';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomDrawerContentComponent = (props) => {
  const { theme } = props;

  return (
    <ScrollView style={{ backgroundColor: theme.drawerBackgroundColor }}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default withTheme(connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    theme: [nameSpaces.APP],
  }),

  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(CustomDrawerContentComponent));
