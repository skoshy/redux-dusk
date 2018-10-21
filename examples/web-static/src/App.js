import React from 'react';
import { Router, Head, withSiteData } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes'; /* eslint-disable-line import/no-unresolved, import/extensions */
import { Provider } from 'react-redux';
import { store } from './store';
import PersistGate from './components/Loading/PersistGate';
import './app.css';

const View = ({ siteTitle }) => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>{siteTitle}</title>
          <noscript>
            {'<style> .js-only {display: none !important; } </style>'}
          </noscript>
        </Head>
        <PersistGate />
        <Router>
          <Routes />
        </Router>
      </React.Fragment>
    </Provider>
  );
};

export default hot(module)(withSiteData(View));
