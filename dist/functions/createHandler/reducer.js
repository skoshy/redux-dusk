'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseReducer = undefined;

var _helpers = require('../../helpers');

var parseReducer = exports.parseReducer = function parseReducer(currentType, fullType, reducerParams, initialState) {
  if ((0, _helpers.isArray)(reducerParams)) {
    // it's an array; we'll append these new values to the state, e.x. ['todos', 'lastUpdated']
    var addToState = {};
    reducerParams.forEach(function (parseParam) {
      if ((0, _helpers.isObject)(parseParam)) {
        // this is an object, e.x. {loading: false, error: 'Nothing found'}
        // let's loop through this object and set params accordingly
        var parseParamKeys = Object.keys(parseParam);
        parseParamKeys.forEach(function (parseParamKey) {
          var parseInnerParam = parseParam[parseParamKey];
          addToState[parseParamKey] = parseInnerParam;
        });
      } else {
        // it's a string, so just set it to undefined
        addToState[parseParam] = undefined;
      }
    });

    var addToStateKeys = Object.keys(addToState);

    return function (state, action) {
      addToStateKeys.forEach(function (key) {
        addToState[key] = action[key];
      });

      return Object.assign({}, state, addToState);
    };
  }

  if ((0, _helpers.isObject)(reducerParams)) {
    if (reducerParams.reset) {
      return function () {
        return Object.assign({}, (0, _helpers.cloneObj)(initialState));
      };
    }
  }

  return reducerParams;
};

exports['default'] = parseReducer;