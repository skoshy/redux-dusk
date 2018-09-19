import React from 'react';
import { connect } from 'react-redux';
import {
  DrawerItems,
  SafeAreaView,
} from 'react-navigation';
import { ScrollView, StyleSheet } from 'react-native';
import { withTheme } from 'styled-components';
import { Button, ButtonText } from '../components/Core/Input';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const CustomDrawerContentComponent = (props) => {
  const { theme, $actions } = props;

  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: theme.drawerBackgroundColor,
    },
    container: {
      flex: 1,
    },
  });

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <Button onPress={() => $actions.APP.setThemeName('light')}>
          <ButtonText>Light Theme!</ButtonText>
        </Button>
        <Button onPress={() => $actions.APP.setThemeName('dark')}>
          <ButtonText>Dark Theme!</ButtonText>
        </Button>
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
