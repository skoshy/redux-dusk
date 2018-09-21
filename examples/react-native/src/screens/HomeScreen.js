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
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { BackgroundView, PostContainer } from '../components/Core/Containers';
import { Button, ButtonText } from '../components/Core/Input';
import { SectionHeader } from '../components/Core/Text';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ navigation, $actions }) => (
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
        <PostContainer horizontal />
        <PostContainer horizontal />
        <PostContainer horizontal />
        <PostContainer horizontal />
        <PostContainer horizontal />
        <PostContainer horizontal />
        <PostContainer horizontal />
      </ScrollView>
      <View
        style={{
          flex: 0,
          height: 1,
          backgroundColor: '#ccc',
          marginTop: 5,
          marginBottom: 5,
        }}
      />
      <SectionHeader>
        ALL POSTS
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
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </ScrollView>
    </View>
  </BackgroundView>
);

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    theme: [nameSpaces.APP],
  }),

  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(ThisComponent);
