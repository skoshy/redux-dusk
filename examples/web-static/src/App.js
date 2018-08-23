import React from 'react';
import { Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Routes from 'react-static-routes'; /* eslint-disable-line import/no-unresolved, import/extensions */

import { store, persistor } from './store';
import './app.css';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <nav>
            <Link exact to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="content">
            <Routes />
          </div>
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

export default hot(module)(App);
