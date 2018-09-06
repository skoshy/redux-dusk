import React from 'react';
import { Link, Head } from 'react-static';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { nameSpaces, stateMapper, actionsMapper } from '../handlers';

const View = ({ $state, $actions, children }) => {
  return (
    <div>
      <Head>
        <meta name="google-site-verification" content="tgLQNZQlcEns3DHccnc0iejTHBXXOLm1LGlXcW7fZrE" />
      </Head>
      <nav>
        <Link exact to="/">Trello Lite</Link>
        <Link to="/reddit">Reddit Lite</Link>
      </nav>
      <div className="content">
        <div>
          {'Welcome, '}
          <input
            type="text"
            value={$state.firstName}
            onChange={e => $actions.APP.setFirstName(e.target.value)}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default hot(module)(connect(
  // variables from the store -> maps to this.props.$state
  stateMapper({
    firstName: [nameSpaces.APP],
  }),
  // actions -> maps to this.props.$actions.{SHADOW_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(View));
