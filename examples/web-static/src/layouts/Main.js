import React from 'react';
import { Link } from 'react-static';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { nameSpaces, stateMapper, actionsMapper } from '../handlers';

const ThisComponent = ({ $state, $actions, children }) => {
  return (
    <div>
      <nav>
        <Link exact to="/">Trello Lite</Link>
        <Link to="/reddit">Reddit Lite</Link>
      </nav>
      <div className="content">
        <div>
          {`Howdy, `}
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
  // actions -> maps to this.props.$actions.{HANDLER_NAME}
  actionsMapper([
    nameSpaces.APP,
  ]),
)(ThisComponent));
