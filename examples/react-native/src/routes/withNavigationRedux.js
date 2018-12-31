/**
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import { nameSpaces, stateMapper, actionsMapper } from '../handlers';

export function withNavigationRedux(WrappedComponent) {
  class WithNavigationClass extends React.Component {
    static constructNavigationNewParams(nextProps) {
      const { navigation, $state } = nextProps;

      const newNavigationParams = {};
      const navigationParams = navigation.state.params || {};

      if (navigationParams.themeName !== $state.themeName) {
        newNavigationParams.themeName = $state.themeName;
        newNavigationParams.theme = nextProps.theme;
      }

      return newNavigationParams;
    }

    static shouldComponentUpdateOrOnConstruct(nextProps) {
      const { navigation } = nextProps;
      const newNavigationParams = WithNavigationClass.constructNavigationNewParams(nextProps);

      if (Object.keys(newNavigationParams).length > 0) {
        navigation.setParams(newNavigationParams);
      }

      return true;
    }

    constructor(props) {
      super(props);

      WithNavigationClass.shouldComponentUpdateOrOnConstruct(props);
    }

    shouldComponentUpdate(nextProps) {
      return WithNavigationClass.shouldComponentUpdateOrOnConstruct(nextProps);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    // variables from the store -> maps to this.props.$state
    stateMapper({
      themeName: [nameSpaces.APP],
    }),

    // actions -> maps to this.props.$actions.{HANDLER_NAME}
    actionsMapper([
      nameSpaces.APP,
    ]),
  )(withTheme(WithNavigationClass));
}

export default withNavigationRedux;
