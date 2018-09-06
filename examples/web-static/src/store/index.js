import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import { createLogicMiddleware } from 'redux-logic';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { autoMergeNameSpaces } from '../../../../src/dusk';
import { combinedLogic, combinedReducer } from '../handlers';
import { name } from '../../package.json';

const logicMiddleware = createLogicMiddleware(combinedLogic);
const middleware = [
  logicMiddleware,
];

// Setup enhancers like Dev Tools and other middleware
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

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
