import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from '../../store';
import LoadingIcon from './Icon';

const View = () => {
  const loadingOverlay = (
    <div
      className="js-only"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'white',
        padding: '40px 0 0',
        zIndex: '100',
      }}
    >
      <LoadingIcon style={{ margin: '0 auto', width: '200px', height: '200px' }} />
    </div>
  );

  return (
    <PersistGate
      loading={loadingOverlay}
      persistor={persistor}
    >
      <React.Fragment />
    </PersistGate>
  );
};

export default View;
