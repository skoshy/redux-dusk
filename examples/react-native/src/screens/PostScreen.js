/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { BackgroundView } from '../components/Core/Containers';
import { Header1, BodyText } from '../components/Core/Text';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ navigation, $state }) => {
  const currentPost = $state.posts.find(post => post.Id === navigation.getParam(`PostId`));

  return (
    <BackgroundView>
      <View style={{ flex: 1, margin: 20 }}>
        <ScrollView>
          <Header1 style={{ marginBottom: 20 }}>
            { currentPost.Title }
          </Header1>
          <BodyText>
            { currentPost.Body }
          </BodyText>
        </ScrollView>
      </View>
    </BackgroundView>
  );
};

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    theme: [nameSpaces.APP],
    posts: [nameSpaces.COMMUNITY],
  }),

  // actions -> maps to this.props.$actions.{HANDLER_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(ThisComponent);
