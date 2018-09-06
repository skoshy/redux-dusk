import React from 'react';
import { connect } from 'react-redux';
import { nameSpaces, stateMapper, actionsMapper } from '../handlers';
import Layout from '../layouts/Main';

class View extends React.Component {
  generateNewsList() {
    const { $state } = this.props;
    const toReturn = [];

    if ($state.error) {
      toReturn.push((
        <p style={{ color: 'red' }}>An error has occured when trying to get the latest news. Try again.</p>
      ));
    }

    if ($state.loading) {
      toReturn.push((
        <p style={{ color: 'brown' }}>Loading...</p>
      ));
    }

    toReturn.push((
      $state.newsArticles.map(article => (
        <li key={article.id}>
          {article.title}
        </li>
      ))
    ));

    return toReturn;
  }

  generateGetOrDeleteNewsButton() {
    const {
      $state: {
        newsArticles,
      },
      $actions,
    } = this.props;

    // let's default the button to clearing the news
    let button = <button onClick={() => $actions.NEWS.clear()}>Click here to wipe the news away</button>;

    // if there's no news, let's make the button get news instead
    if (newsArticles.length === 0) {
      button = <button onClick={() => $actions.NEWS.getLatestRequest()}>Click here to get the news</button>;
    }

    return button;
  }

  render() {
    return (
      <Layout>
        <h1>Better than Fox News and CNN combined.</h1>
        { this.generateGetOrDeleteNewsButton() }
        <ul>
          { this.generateNewsList() }
        </ul>
      </Layout>
    );
  }
}

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    newsArticles: [nameSpaces.NEWS],
    loading: [nameSpaces.NEWS],
    error: [nameSpaces.NEWS],
  }),
  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.NEWS,
  ]),
)(View);
