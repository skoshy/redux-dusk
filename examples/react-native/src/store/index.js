import { createLogicMiddleware } from 'redux-logic';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { autoMergeNameSpaces } from 'redux-dusk';
import { combinedLogic, combinedReducer } from '../handlers';
import { name } from '../../package.json';

const logicMiddleware = createLogicMiddleware(combinedLogic);
const middleware = [
  logicMiddleware,
];

// Setup enhancers like Dev Tools and other middleware
const enhancer = compose(applyMiddleware(...middleware));

// Persisting Config with redux-persist
const persistConfig = {
  key: name,
  storage,
  stateReconciler: autoMergeNameSpaces,
  debug: false,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
