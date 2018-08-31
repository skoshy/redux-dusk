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
  var clonedInitialState = (0, _helpers.cloneObj)(initialState);

  if ((0, _helpers.isObject)(reducerParams)) {
    thingsToReduce = [];
    if (reducerParams.reduce) {
      thingsToReduce = reducerParams.reduce;
    }

    if (reducerParams.reset) {
      if (reducerParams.reset === true) {
        // end here, everything should be reset
        return function () {
          var clonedInitialStateInner = (0, _helpers.cloneObj)(initialState); // we must clone it in here again
          (0, _helpers.debugLog)({}, 'Resetting to initial state for type', fullType);
          return Object.assign({}, clonedInitialStateInner);
        };
      }

      thingsToReset = reducerParams.reset;
    }
  }

  (0, _helpers.debugLog)({}, 'Type', fullType, 'Things to reduce', thingsToReduce, 'Things to reset', thingsToReset);

  if ((0, _helpers.isArray)(thingsToReduce)) {
    // it's an array; we'll append these new values to the state, e.x. ['todos', 'lastUpdated']
    var addToState = {};
    var addToStateKeys = Object.keys(addToState);
    var resetFromInitialState = {};

    thingsToReduce.forEach(function (parseParam) {
      addToState = Object.assign({}, addToState, parseReducerInnerLoop(parseParam));
    });

    thingsToReset.forEach(function (parseParam) {
      if (clonedInitialState[parseParam]) {
        resetFromInitialState[parseParam] = clonedInitialState[parseParam];
      }
    });

    // update since we just added a bunch of keys
    addToStateKeys = Object.keys(addToState);

    return function (state, action) {
      addToStateKeys.forEach(function (key) {
        if (typeof action[key] !== 'undefined') {
          addToState[key] = action[key];
        }
      });

      (0, _helpers.debugLog)({}, 'state', state, 'addToState', addToState, 'reset', resetFromInitialState);

      return Object.assign({}, state, addToState, resetFromInitialState);
    };
  }

  return thingsToReduce;
};

exports['default'] = parseReducer;