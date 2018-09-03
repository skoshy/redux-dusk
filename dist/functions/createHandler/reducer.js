'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseReducer = undefined;

var _helpers = require('../../helpers');

function parseReducerInnerLoop(parseParam) {
  var toReturn = {};

  if ((0, _helpers.isObject)(parseParam)) {
    // this is an object, e.x. {loading: false, error: 'Nothing found'}
    // let's loop through this object and set params accordingly
    var parseParamKeys = Object.keys(parseParam);
    parseParamKeys.forEach(function (parseParamKey) {
      var parseInnerParam = parseParam[parseParamKey];
      toReturn[parseParamKey] = parseInnerParam;
    });
  } else {
    // it's a string, so just set it to undefined
    toReturn[parseParam] = undefined;
  }

  return toReturn;
}

var parseReducer = exports.parseReducer = function parseReducer(currentType, fullType, reducerParams, initialState) {
  var thingsToReduce = reducerParams;
  var thingsToReset = [];
  var addToState = {};
  var resetFromInitialState = {};

  if ((0, _helpers.isObject)(reducerParams)) {
    thingsToReduce = [];
    if (reducerParams.reduce) {
      thingsToReduce = reducerParams.reduce;
    }

    if (reducerParams.reset) {
      thingsToReset = reducerParams.reset;
      if (reducerParams.reset === true) {
        // everything should be reset
        thingsToReset = Object.keys(initialState);
      }
    }
  }

  (0, _helpers.debugLog)({}, 'Type', fullType, 'Things to reduce', thingsToReduce, 'Things to reset', thingsToReset);

  if ((0, _helpers.isArray)(thingsToReduce)) {
    // it's an array; we'll append these new values to the state, e.x. ['todos', 'lastUpdated']

    thingsToReduce.forEach(function (parseParam) {
      addToState = Object.assign({}, addToState, parseReducerInnerLoop(parseParam));
    });
  }

  var addToStateKeys = Object.keys(addToState);

  return function (state, action) {
    var clonedInitialStateInner = (0, _helpers.cloneObj)(initialState); // we must clone it in here again

    if ((0, _helpers.isFunction)(thingsToReduce)) {
      addToState = thingsToReduce(state, action);
    } else {
      addToStateKeys.forEach(function (key) {
        if (typeof action[key] !== 'undefined') {
          addToState[key] = action[key];
        }
      });
    }

    thingsToReset.forEach(function (parseParam) {
      if (typeof clonedInitialStateInner[parseParam] !== 'undefined') {
        resetFromInitialState[parseParam] = clonedInitialStateInner[parseParam];
      }
    });

    (0, _helpers.debugLog)({}, 'state', state, 'cloned initial state', clonedInitialStateInner, 'addToState', addToState, 'supposed to reset', thingsToReset, 'resetting', resetFromInitialState);

    return Object.assign({}, state, addToState, resetFromInitialState);
  };
};

exports['default'] = parseReducer;