import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ICON_SIZE = 20;
export const defaultNavigatorOptions = {
  cardStyle: {
    backgroundColor: `transparent`, // removes white flash in route transitions when in dark mode
  },
};
export const getNavOptionsVars = (navigation) => {
  const navParams = navigation.state.params || {};
  const theme = navParams.theme || {};
  const defaultHeaderStyles = {
    headerStyle: {
      backgroundColor: theme.headerBackgroundColor,
    },
    headerTitleStyle: {
      color: theme.headerTitleColor,
      fontWeight: `bold`,
    },
    headerTintColor: theme.headerTitleColor,
  };

  return {
    navParams,
    theme,
    defaultHeaderStyles,
  };
};

export const HeaderButton = ({ style = {}, theme = {}, icon, children, ...props }) => {
  let iconToRender = null;
  if (icon) {
    iconToRender = (
      <FontAwesome5 color={theme.headerTitleColor} size={ICON_SIZE} name={icon} />
    );
  }

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 12,
        ...style,
      }}
      {...props}
    >
      {iconToRender}
      {children}
    </TouchableOpacity>
  );
};
