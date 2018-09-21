import React from 'react';
import {
  Text,
} from 'react-native';
import { withTheme } from 'styled-components/native';

export const Header1 = withTheme(({ theme, style, children }) => {
  const componentStyle = {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.textColor,
    ...style,
  };

  return (
    <Text style={componentStyle}>
      { children }
    </Text>
  );
});

export const Header2 = withTheme(({ theme, style, children }) => {
  const componentStyle = {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.textColor,
    ...style,
  };

  return (
    <Text style={componentStyle}>
      {children}
    </Text>
  );
});

export const Header3 = withTheme(({ theme, style, children }) => {
  const componentStyle = {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textColor,
    ...style,
  };

  return (
    <Text style={componentStyle}>
      {children}
    </Text>
  );
});

export const BodyText = withTheme(({ theme, style, children }) => {
  const componentStyle = {
    flex: 1,
    fontSize: 16,
    color: theme.textColor,
    ...style,
  };

  return (
    <Text style={componentStyle}>
      {children}
    </Text>
  );
});
