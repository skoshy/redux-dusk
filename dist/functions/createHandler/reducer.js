'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseReducer = undefined;

var _helpers = require('../../helpers');

function parseReducerInnerLoop(parseParam) {
  var toReturn = {};

  if ((0, _helpers.isObject)(parseParam)) {
    // this is an object, e.x. {newUserName: 'username', inputtedText: 'docTitle'}
    // the key will be the variable name from the action, the value will be the state
    // var to set it to.
    var actionVarNames = Object.keys(parseParam);
    actionVarNames.forEach(function (actionVarName) {
      var stateVarName = parseParam[actionVarName];

      toReturn[stateVarName] = actionVarName;
    });
  } else {
    // it's a string, so just set it to itself
    toReturn[parseParam] = parseParam;
  }

  return toReturn;
}

var parseReducer = exports.parseReducer = function parseReducer(currentType, fullType, reducerParams, initialState) {
  var thingsToReduce = reducerParams;
  var thingsToReset = [];
  var toSet = {};
  var toReduce = {};
  var toReset = {};

  if ((0, _helpers.isObject)(reducerParams)) {
    thingsToReduce = [];
    if (reducerParams.set) {
      toSet = reducerParams.set;
    }

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

    thingsToReduce.forEach(function (thingToReduce) {
      toReduce = Object.assign({}, toReduce, parseReducerInnerLoop(thingToReduce));
    });
  }

  var toAddKeys = Object.keys(toReduce);

  return function (state, action) {
    // we have to clone all these things so they don't set by reference
    var clonedInitialStateInner = (0, _helpers.cloneObj)(initialState);
    var clonedToReduce = (0, _helpers.cloneObj)(toReduce);
    var clonedToReset = (0, _helpers.cloneObj)(toReset);
    var clonedToSet = (0, _helpers.cloneObj)(toSet);

    if ((0, _helpers.isFunction)(thingsToReduce)) {
      clonedToReduce = thingsToReduce(state, action);
    } else {
      toAddKeys.forEach(function (stateVarName) {
        var actionVarName = clonedToReduce[stateVarName];
        if (typeof action[actionVarName] !== 'undefined') {
          clonedToReduce[stateVarName] = action[actionVarName];
        }
      });
    }

    thingsToReset.forEach(function (parseParam) {
      if (typeof clonedInitialStateInner[parseParam] !== 'undefined') {
        clonedToReset[parseParam] = clonedInitialStateInner[parseParam];
      }
    });

    (0, _helpers.debugLog)({}, 'state', state, 'cloned initial state', clonedInitialStateInner, 'setting', clonedToSet, 'supposed to add', thingsToReduce, 'reducing...', clonedToReduce, 'supposed to reset', thingsToReset, 'resetting', clonedToReset);

    return Object.assign({}, state, clonedToSet, clonedToReduce, clonedToReset);
  };
};

exports['default'] = parseReducer;