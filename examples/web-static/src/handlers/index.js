import { combineReducers } from 'redux';
import { setupDusk, getPartFromHandlers } from '../lib';

// import all your handlers here
import * as App from './App';
import * as Todos from './Todos';
import * as News from './News';

// list out all your handlers here
const handlers = [
  App,
  Todos,
  News,
];

export const {
  nameSpaces,     // gets imported in components/pages for easy store referencing
  types,          // global list of all types
  reducers,       // global list of all reducers
  stateMapper,    // function -> maps parts of the store to components/pages, see docs
  actionsMapper,  // function -> maps actions to components/pages, see docs
} = setupDusk(handlers);

export const combinedReducer = combineReducers(reducers);

// we need a combined logic object to pass to set up redux-logic
export const combinedLogic = getPartFromHandlers(handlers, `logic`);
