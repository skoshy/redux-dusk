import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from '../../store';
import LoadingIcon from './Icon';
import { IS_BROWSER } from '../../helpers/globals';

const loadingOverlay = (
  <div
    className="js-only"
    style={{
      position: `fixed`,
      top: `0`,
      left: `0`,
      width: `100%`,
      height: `100%`,
      background: `white`,
      padding: `40px 0 0`,
      zIndex: `100`,
    }}
  >
    <LoadingIcon style={{ margin: `0 auto`, width: `200px`, height: `200px` }} />
  </div>
);

const View = ({ children, ...props }) => {
  let toReturn = (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

  if (IS_BROWSER) {
    // Initialize a PersistGate over the children ONLY if this is being rendereed
    // via the browser. If it's node (SSR), we shouldn't use PersistGate
    toReturn = (
      <PersistGate
        loading={loadingOverlay}
        persistor={persistor}
        {...props}
      >
        {toReturn}
      </PersistGate>
    );
  }

  return toReturn;
};

export default View;
