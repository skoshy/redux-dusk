import { createLogicMiddleware } from 'redux-logic';
import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Dusk } from '../lib/src/dusk';
import { shadowsMap } from '../shadows';

const { rootLogic, rootReducer } = Dusk.setup(shadowsMap);

const logicMiddleware = createLogicMiddleware(rootLogic);
const middleware = [
  logicMiddleware,
];

// Setup enhancers like Dev Tools and other middleware
const enhancer = compose(applyMiddleware(...middleware));

// Persisting Config with redux-persist
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
