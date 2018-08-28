import React from 'react';
import { connect } from 'react-redux';
import { nameSpaces, stateMapper, actionsMapper } from '../handlers';

class View extends React.Component {
  generateNewsList() {
    const {
      $state: {
        newsArticles,
      },
    } = this.props;

    return (
      newsArticles.map(article => (
        <li key={article.id}>
          {article.title}
        </li>
      ))
    );
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
      <div>
        <h1>Better than Fox News and CNN combined.</h1>
        { this.generateGetOrDeleteNewsButton() }
        <ul>
          { this.generateNewsList() }
        </ul>
      </div>
    );
  }
}

export default connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    newsArticles: [nameSpaces.NEWS],
  }),
  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.NEWS,
  ]),
)(View);
