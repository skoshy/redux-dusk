'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHandler = undefined;

var _action = require('./action');

var _reducer = require('./reducer');

var _helpers = require('../../helpers');

var _lib = require('../../lib');

function toProperCase(txt) {
  return txt.replace(/\w\S*/g, function (innerTxt) {
    return innerTxt.charAt(0).toUpperCase() + innerTxt.substr(1).toLowerCase();
  });
}

function getCamelCaseParts(currentType) {
  var splitCurrentType = currentType.split(_lib.typeSeparator);
  return splitCurrentType.map(toProperCase);
}

function createHandlerLoop(params, prevType, camelCasePrevType, initialState, nameSpace) {
  var types = {};
  var actions = {};
  var reducers = {};

  var keys = Object.keys(params);

  keys.forEach(function (currentType) {
    var nestedHandlerOutput = void 0;
    var nestedHandlerOutputTypesKeys = void 0;
    var camelCaseNextType = camelCasePrevType;
    var camelCaseParts = getCamelCaseParts(currentType);
    var nextType = prevType;

    var value = params[currentType];

    switch (currentType) {
      case 'action':
        actions[camelCasePrevType] = (0, _action.parseAction)(currentType, nameSpace + _lib.typeSeparator + prevType, value);
        break;
      case 'reducer':
        reducers[nameSpace + _lib.typeSeparator + prevType] = (0, _reducer.parseReducer)(currentType, nameSpace + _lib.typeSeparator + prevType, value, initialState);
        break;
      default:
        if (prevType !== '') {
          nextType += _lib.typeSeparator;
        } else {
          camelCaseParts[0] = camelCaseParts[0].toLowerCase();
        }
        camelCaseNextType += camelCaseParts.join('');
        nextType += currentType;
        types[nextType] = nameSpace + _lib.typeSeparator + nextType;
        nestedHandlerOutput = createHandlerLoop(value, nextType, camelCaseNextType, initialState, nameSpace);
        if (nestedHandlerOutput.types) {
          nestedHandlerOutputTypesKeys = Object.keys(nestedHandlerOutput.types);
          nestedHandlerOutputTypesKeys.forEach(function (typeKey) {
            var typeVal = nestedHandlerOutput.types[typeKey];
            types[typeKey] = typeVal;
          });
        }
        actions = Object.assign({}, actions, nestedHandlerOutput.actions);
        reducers = Object.assign({}, reducers, nestedHandlerOutput.reducers);
    }

    return true;
  });

  return { types: types, actions: actions, reducers: reducers };
}

var createHandler = exports.createHandler = function createHandler() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // loop through types and populate actions, types, and reducers
  var initialStateCopy = (0, _helpers.cloneObj)(params.initialState);

  var _createHandlerLoop = createHandlerLoop(params.types, '', '', params.initialState, params.nameSpace),
      types = _createHandlerLoop.types,
      actions = _createHandlerLoop.actions,
      reducers = _createHandlerLoop.reducers;

  var finalReducer = function finalReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStateCopy;
    var action = arguments[1];

    (0, _helpers.debugLog)({}, 'Calling Reducer Action: ', action.type, reducers[action.type]);

    if (reducers[action.type] && typeof reducers[action.type] === 'function') {
      return reducers[action.type](state, action);
    }

    return Object.assign({}, state);
  };

  var finalActions = actions;

  return {
    types: types,
    nameSpace: params.nameSpace,
    actions: finalActions,
    reducer: finalReducer
  };
};

exports['default'] = createHandler;