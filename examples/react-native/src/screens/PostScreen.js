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
import { Header1, BodyText } from '../components/Core/Text';
import { stateMapper, actionsMapper, nameSpaces } from '../handlers';

const ThisComponent = ({ navigation, $actions }) => (
  <BackgroundView>
    <View style={{ flex: 1, margin: 20 }}>
      <ScrollView>
        <Header1 style={{ marginBottom: 20 }}>
          Post Header
        </Header1>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor erat ante, et varius tellus molestie eget. Mauris sed posuere diam, in tincidunt augue. Nunc sed dictum ligula. Ut non enim ut sem sodales tincidunt nec non risus. Mauris efficitur orci nunc, id congue nisl blandit et. Proin libero tellus, luctus a sapien vel, posuere euismod nisl. Suspendisse tempor dolor nec metus ultrices, ut rhoncus ante ornare. Integer finibus non mi sed porttitor. Integer sit amet nibh sed leo auctor eleifend sed volutpat libero. Mauris in fermentum ex. Donec faucibus egestas justo id ultrices. Phasellus bibendum enim id massa laoreet dictum. Aliquam erat volutpat. Nam sit amet semper mi. Duis consequat blandit metus. Nunc quis arcu eget dui pharetra feugiat. Curabitur sollicitudin id nulla sit amet sollicitudin. Vivamus ac accumsan lectus, quis viverra turpis. Nunc pellentesque nisl non est sollicitudin tristique. Etiam at ante eu justo imperdiet ullamcorper quis in metus. Curabitur accumsan enim eu dui finibus ultricies. Ut lacinia varius lorem, ac vulputate felis. Fusce commodo risus sit amet pharetra rhoncus. Vestibulum rutrum ante nulla. Donec fermentum maximus nisi, ac luctus mauris. Aenean ac hendrerit odio. Quisque rhoncus nunc lectus, ut egestas arcu ultrices lobortis. Suspendisse tincidunt tortor augue, in placerat eros tempus eget. Morbi felis augue, congue nec ultrices nec, ultricies ut mi. Sed sit amet metus quis leo consectetur fermentum et nec arcu. Fusce pharetra vehicula risus, non ornare nunc consequat in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus et ornare turpis, vel pulvinar nibh. Duis vitae tellus ac erat viverra ornare blandit nec nulla. Maecenas placerat vulputate elit at bibendum. Integer et arcu a leo semper mollis. Pellentesque porttitor aliquet molestie. Nam consequat cursus ante, sit amet dictum nisi porta nec. Nunc ultrices tincidunt arcu. Sed id metus et justo dapibus consectetur. Aliquam libero libero, fermentum in tincidunt sed, porta at purus. Nam nunc ligula, eleifend at leo vel, mollis lobortis diam. Suspendisse eros lectus, dapibus vitae lorem sit amet, mattis accumsan erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse vitae lacinia nibh. Morbi pulvinar magna ut nunc imperdiet, a mollis massa hendrerit. Nullam pretium est quis consectetur pretium. Proin erat quam, laoreet vitae mauris vitae, lobortis posuere urna.
        </BodyText>
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
