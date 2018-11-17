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
import { BackgroundView, PostContainer } from '../components/Core/Containers';
import { SectionHeader } from '../components/Core/Text';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ $state }) => {
  const pinnedPosts = [];
  const regularPosts = [];

  $state.posts.forEach((post) => {
    if (post.Pinned) {
      pinnedPosts.push(<PostContainer key={post.Id} horizontal post={post} />);
    } else {
      regularPosts.push(<PostContainer key={post.Id} post={post} />);
    }
  });

  return (
    <BackgroundView>
      <View style={{ flex: 1 }}>
        <SectionHeader>
          PINNED POSTS
        </SectionHeader>
        <ScrollView
          horizontal
          style={{
            flex: 1,
            marginRight: 0,
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          { pinnedPosts }
        </ScrollView>
        <View
          style={{
            flex: 0,
            height: 1,
            backgroundColor: `#ccc`,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <SectionHeader>
          COMMUNITY POSTS
        </SectionHeader>
        <ScrollView
          style={{
            flex: 1,
            flexGrow: 3,
            marginLeft: 18,
            marginRight: 18,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {regularPosts}
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
