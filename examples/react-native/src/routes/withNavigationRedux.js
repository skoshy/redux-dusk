/**
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { nameSpaces, stateMapper, actionsMapper } from '../handlers';

export function withNavigationRedux(WrappedComponent) {
  class WithNavigationClass extends React.Component {
    static constructNavigationNewParams(nextProps) {
      const { navigation, $state } = nextProps;

      const newNavigationParams = {};
      const navigationParams = navigation.state.params || {};

      if (navigationParams.themeName !== $state.theme) {
        newNavigationParams.themeName = $state.theme;
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
      theme: [nameSpaces.APP],
    }),

    // actions -> maps to this.props.$actions.{SHADOW_NAME}
    actionsMapper([
      nameSpaces.APP,
    ]),
  )(WithNavigationClass);
}

export default withNavigationRedux;
