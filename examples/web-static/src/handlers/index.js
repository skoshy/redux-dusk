import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import * as Todos from './Todos';
// import * as News from './News';
import { setupDusk } from '../lib/src/dusk';

export const handlers = {
  [Todos.nameSpace]: Todos,
};

export const {
  nameSpaces,
  types,
  reducers,
  stateMapper,
  actionsMapper,
} = setupDusk(handlers, { connect });

export const combinedReducer = combineReducers(reducers);

console.log(nameSpaces, types);
