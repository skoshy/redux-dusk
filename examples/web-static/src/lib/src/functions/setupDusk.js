import { getPartFromHandlers } from './getPartFromHandlers';

const stateMapper = (handlers, state, selectedStateVars) => {
  const handlerKeys = Object.keys(handlers);
  const itemsToMap = {};
  const selectedStateVarsKeys = Object.keys(selectedStateVars);

  // Add a case if you're adding a new shadow
  selectedStateVarsKeys.forEach((selectedStateVarKey) => {
    const selectedStateVar = selectedStateVars[selectedStateVarKey];

    const paramShadow = selectedStateVar[0] || undefined;
    const paramName = selectedStateVar[1] || undefined;
    const paramType = selectedStateVar[2] || undefined;

    const shadow = handlers[paramShadow];
    const name = paramName || selectedStateVarKey;

    // determine where do we grab this state item from
    // options: from state, or we can use a selector
    let type = paramType;
    if (type === undefined) {
      // No type was specified, so let's check for ourselves
      // Selectors are preferred over state
      type = 'state';
      if (shadow.selectors && shadow.selectors[name]) {
        type = 'selector';
      }
    }

    let rootObjectToCheck = state[paramShadow]; // default if type is 'state'
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
    $state: itemsToMap,
  };
};

const actionsMapper = (handlers, dispatchToPassOff, selectedActions) => {
  const handlerKeys = Object.keys(handlers);
  const itemsToMap = [];

  // Add a case if you're adding a new shadow
  selectedActions.forEach((selectedAction) => {
    if (handlerKeys.includes(selectedAction)) {
      const itemToMap = { name: selectedAction };
      const shadow = handlers[selectedAction];

      itemToMap.actions = shadow.actions || false;
      itemToMap.selectors = shadow.selectors || false;

      itemsToMap.push(itemToMap);
    }
  });

  const bindActionCreator = (actionCreator, dispatch) => {
    return (...args) => dispatch(actionCreator(...args));
  };

  const bindActionCreators = (actions, dispatch) => {
    const actionsKeys = Object.keys(actions);
    const actionsCreators = {};

    actionsKeys.forEach((actionKey) => {
      const action = actions[actionKey];
      actionsCreators[actionKey] = bindActionCreator(action, dispatch);
    });

    return actionsCreators;
  };

  const mapDispatchToProps = (dispatch) => {
    const dispatchers = {
      $actions: {},
      $selectors: {},
    };

    itemsToMap.forEach((itemToMap) => {
      if (itemToMap.actions) {
        dispatchers.$actions[itemToMap.name] = bindActionCreators(itemToMap.actions, dispatch);
      }
      if (itemToMap.selectors) {
        dispatchers.$selectors[itemToMap.name] = bindActionCreators(
          itemToMap.selectors,
          dispatch,
        );
      }
    });

    return dispatchers;
  };

  return mapDispatchToProps(dispatchToPassOff);
};

export const setupDusk = (handlers, options = {}) => {
  let actionsMapperPublic;
  let stateMapperPublic;
  const types = getPartFromHandlers(handlers, 'types');
  const nameSpaces = getPartFromHandlers(handlers, 'nameSpace');
  const reducers = getPartFromHandlers(handlers, 'reducer');

  // generate a mapDispatchToProps var
  if (options.connect) {
    stateMapperPublic = (selectedStateVars) => {
      return state => stateMapper(handlers, state, selectedStateVars);
    };
    actionsMapperPublic = (selectedActions) => {
      return dispatch => actionsMapper(handlers, dispatch, selectedActions);
    };
  }

  return {
    reducers,
    types,
    nameSpaces,
    stateMapper: stateMapperPublic,
    actionsMapper: actionsMapperPublic,
  };
};

export default setupDusk;
