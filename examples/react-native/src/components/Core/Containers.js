import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { withTheme } from 'styled-components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

  let bottomTray = (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <BodyText>5 comments</BodyText>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', paddingLeft: 5, paddingRight: 5, alignItems: 'center' }}>
            <FontAwesome5 size={14} color={theme.textColor} name="arrow-up" />
            <BodyText style={{ paddingLeft: 5, flexGrow: 1 }}>
              3
            </BodyText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', paddingLeft: 5, paddingRight: 5, alignItems: 'center' }}>
            <FontAwesome5 size={14} color={theme.textColor} name="arrow-down" />
            <BodyText style={{ paddingLeft: 5, flexGrow: 1 }}>
              1
            </BodyText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (horizontal) {
    componentStyle = {
      ...componentStyle,
      marginTop: 2,
      marginBottom: 2,
      marginLeft: 10,
      marginRight: 10,
      maxWidth: 150,
    };

    bottomTray = null;
  }

  return (
    <TouchableOpacity
      style={componentStyle}
      onPress={() => { navigation.navigate('PostScreen'); }}
    >
      <View>
        <Header2 style={{ marginBottom: 10 }}>Hi there this is my post</Header2>
        <BodyText style={{ flex: 1 }}>
          This is my really cool text in the body of my post. Isn't it super neat?
        </BodyText>
      </View>
      { bottomTray }
    </TouchableOpacity>
  );
}));
