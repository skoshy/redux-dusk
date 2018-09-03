'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupDusk = undefined;

var _getPartFromHandlers = require('./getPartFromHandlers');

var _helpers = require('../helpers');

var stateMapper = function stateMapper(handlers, state, selectedStateVars) {
  var handlerKeys = Object.keys(handlers);
  var itemsToMap = {};
  var selectedStateVarsKeys = Object.keys(selectedStateVars);

  // Add a case if you're adding a new shadow
  selectedStateVarsKeys.forEach(function (selectedStateVarKey) {
    var selectedStateVar = selectedStateVars[selectedStateVarKey];

    var paramShadow = selectedStateVar[0] || undefined;
    var paramName = selectedStateVar[1] || undefined;
    var paramType = selectedStateVar[2] || undefined;

    var shadow = handlers[paramShadow];
    var name = paramName || selectedStateVarKey;

    // determine where do we grab this state item from
    // options: from state, or we can use a selector
    var type = paramType;
    if (type === undefined) {
      // No type was specified, so let's check for ourselves
      // Selectors are preferred over state
      type = 'state';
      if (shadow.selectors && shadow.selectors[name]) {
        type = 'selector';
      }
    }

    var rootObjectToCheck = state[paramShadow]; // default if type is 'state'
    if (type === 'selector') {
      rootObjectToCheck = shadow.selectors;
    }

    if (handlerKeys.includes(paramShadow)) {
      itemsToMap[selectedStateVarKey] = rootObjectToCheck[name];
    }

    if (type === 'selector') {
      // run the selector function
      itemsToMap[selectedStateVarKey] = itemsToMap[selectedStateVarKey](state);
    }
  });

  return {
    $state: itemsToMap
  };
};

var actionsMapper = function actionsMapper(handlers, dispatchToPassOff, selectedActions) {
  var handlerKeys = Object.keys(handlers);
  var itemsToMap = [];

  // Add a case if you're adding a new shadow
  selectedActions.forEach(function (selectedAction) {
    if (handlerKeys.includes(selectedAction)) {
      var itemToMap = { name: selectedAction };
      var shadow = handlers[selectedAction];

      itemToMap.actions = shadow.actions || false;
      itemToMap.selectors = shadow.selectors || false;

      itemsToMap.push(itemToMap);
    }
  });

  var bindActionCreator = function bindActionCreator(actionCreator, dispatch) {
    return function () {
      return dispatch(actionCreator.apply(undefined, arguments));
    };
  };

  var bindActionCreators = function bindActionCreators(actions, dispatch) {
    var actionsKeys = Object.keys(actions);
    var actionsCreators = {};

    actionsKeys.forEach(function (actionKey) {
      var action = actions[actionKey];
      actionsCreators[actionKey] = bindActionCreator(action, dispatch);
    });

    return actionsCreators;
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    var dispatchers = {
      $actions: {},
      $selectors: {}
    };

    itemsToMap.forEach(function (itemToMap) {
      if (itemToMap.actions) {
        dispatchers.$actions[itemToMap.name] = bindActionCreators(itemToMap.actions, dispatch);
      }
      if (itemToMap.selectors) {
        dispatchers.$selectors[itemToMap.name] = bindActionCreators(itemToMap.selectors, dispatch);
      }
    });

    return dispatchers;
  };

  return mapDispatchToProps(dispatchToPassOff);
};

var setupDusk = exports.setupDusk = function setupDusk(paramHandlers) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var handlers = paramHandlers;
  if ((0, _helpers.isArray)(paramHandlers)) {
    handlers = {};
    paramHandlers.forEach(function (handler) {
      handlers[handler.nameSpace] = handler;
    });
  }

  var types = (0, _getPartFromHandlers.getPartFromHandlers)(handlers, 'types');
  var nameSpaces = (0, _getPartFromHandlers.getPartFromHandlers)(handlers, 'nameSpace');
  var reducers = (0, _getPartFromHandlers.getPartFromHandlers)(handlers, 'reducer');

  // generate a mapDispatchToProps var
  var stateMapperPublic = function stateMapperPublic(selectedStateVars) {
    return function (state) {
      return stateMapper(handlers, state, selectedStateVars);
    };
  };
  var actionsMapperPublic = function actionsMapperPublic(selectedActions) {
    return function (dispatch) {
      return actionsMapper(handlers, dispatch, selectedActions);
    };
  };

  return {
    reducers: reducers,
    types: types,
    nameSpaces: nameSpaces,
    stateMapper: stateMapperPublic,
    actionsMapper: actionsMapperPublic
  };
};

exports['default'] = setupDusk;