import { combineReducers } from 'redux';
import { setupDusk, getPartFromHandlers } from '../lib';
import * as App from './App';
import * as Todos from './Todos';
import * as News from './News';

const handlers = [
  App,
  Todos,
  News,
];

export const {
  nameSpaces,
  types,
  reducers,
  stateMapper,
  actionsMapper,
} = setupDusk(handlers);

export const combinedReducer = combineReducers(reducers);

// we need a combined logic object to pass to set up redux-logic
export const combinedLogic = getPartFromHandlers(handlers, 'logic');
