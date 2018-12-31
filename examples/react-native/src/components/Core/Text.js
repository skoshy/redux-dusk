import React from 'react';
import {
  Text,
} from 'react-native';
import { withTheme } from 'styled-components';

export const Header1 = withTheme(({ theme, style, children }) => {
  const componentStyle = {
    fontSize: 24,
    fontWeight: `bold`,
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
    fontSize: 20,
    fontWeight: `bold`,
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
    fontSize: 18,
    fontWeight: `bold`,
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

export const SectionHeader = withTheme(({ theme, style, children }) => {
  const componentStyle = {
    flex: 0,
    fontSize: 12,
    paddingTop: 5,
    paddingLeft: 5,
    color: theme.textColor,
    ...style,
  };

  return (
    <Text style={componentStyle}>
      {children}
    </Text>
  );
});
