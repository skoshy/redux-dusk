import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import * as Todos from './Todos';
import * as News from './News';
import { setupDusk, getPartFromHandlers } from '../lib/src/dusk';

export const handlers = {
  [Todos.nameSpace]: Todos,
  [News.nameSpace]: News,
};

export const {
  nameSpaces,
  types,
  reducers,
  stateMapper,
  actionsMapper,
} = setupDusk(handlers, { connect });

export const combinedLogic = getPartFromHandlers(handlers, 'logic');
export const combinedReducer = combineReducers(reducers);
