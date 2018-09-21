import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import {
  Header1,
  Header2,
  BodyText,
} from './Text';

export const BackgroundView = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  flex: 1;
`;

// export const PostContainer = styled.View`
//   background-color: ${props => props.theme.postBackgroundColor};
//   padding: 20px;
//   box-shadow: 0px 1px 2px #ccc;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   margin-left: 2px;
//   margin-right: 2px;
// `;

export const PostContainer = withTheme(withNavigation(({ theme, navigation, horizontal }) => {
  let componentStyle = {
    backgroundColor: theme.postBackgroundColor,
    padding: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowColor: '#ccc',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 2,
    marginRight: 2,
  };

  if (horizontal) {
    componentStyle = {
      ...componentStyle,
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 10,
      marginRight: 10,
      maxWidth: 150,
    };
  }

  return (
    <TouchableOpacity
      style={componentStyle}
      onPress={() => { navigation.navigate('PostScreen'); }}
    >
      <Header2 style={{ marginBottom: 10 }}>Hi there this is my post</Header2>
      <BodyText>This is my really cool text in the body of my post. Isn't it super neat?</BodyText>
    </TouchableOpacity>
  );
}));
