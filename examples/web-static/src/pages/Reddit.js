import React from 'react';
import { connect } from '../lib/src/dusk';
import { shadows } from '../shadows';

class RedditPage extends React.Component {
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
      $actions: {
        news: {
          clearNews,
          getNews,
        },
      },
    } = this.props;

    // let's default the button to clearing the news
    let button = <button onClick={clearNews}>Click here to wipe the news away</button>;

    // if there's no news, let's make the button get news instead
    if (newsArticles.length === 0) {
      button = <button onClick={getNews}>Click here to get the news</button>;
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
  RedditPage,
  [shadows.NEWS],
  {
    newsArticles: [shadows.NEWS],
  },
);
