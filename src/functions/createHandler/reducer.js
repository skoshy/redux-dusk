import { isObject, isArray, isFunction, cloneObj, debugLog } from '../../helpers';

function parseReducerInnerLoop(parseParam) {
  const toReturn = { };

  if (isObject(parseParam)) {
    // this is an object, e.x. {newUserName: 'username', inputtedText: 'docTitle'}
    // the key will be the variable name from the action, the value will be the state
    // var to set it to.
    const actionVarNames = Object.keys(parseParam);
    actionVarNames.forEach((actionVarName) => {
      const stateVarName = parseParam[actionVarName];

      toReturn[stateVarName] = actionVarName;
    });
  } else {
    // it's a string, so just set it to itself
    toReturn[parseParam] = parseParam;
  }

  return toReturn;
}

export const parseReducer = (currentType, fullType, reducerParams, initialState) => {
  let thingsToReduce = reducerParams;
  let thingsToReset = [];
  let toSet = {};
  let toReduce = {};
  const toReset = {};

  if (isObject(reducerParams)) {
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

  debugLog(
    {},
    'Type', fullType,
    'Things to reduce', thingsToReduce,
    'Things to reset', thingsToReset,
  );

  if (isArray(thingsToReduce)) {
    // it's an array; we'll append these new values to the state, e.x. ['todos', 'lastUpdated']

    thingsToReduce.forEach((thingToReduce) => {
      toReduce = { ...toReduce, ...parseReducerInnerLoop(thingToReduce) };
    });
  }

  const toAddKeys = Object.keys(toReduce);

  return (state, action) => {
    // we have to clone all these things so they don't set by reference
    const clonedInitialStateInner = cloneObj(initialState);
    let clonedToReduce = cloneObj(toReduce);
    const clonedToReset = cloneObj(toReset);
    const clonedToSet = cloneObj(toSet);

    if (isFunction(thingsToReduce)) {
      clonedToReduce = thingsToReduce(state, action);
    } else {
      toAddKeys.forEach((stateVarName) => {
        const actionVarName = clonedToReduce[stateVarName];
        if (typeof action[actionVarName] !== 'undefined') {
          clonedToReduce[stateVarName] = action[actionVarName];
        }
      });
    }

    thingsToReset.forEach((parseParam) => {
      if (typeof clonedInitialStateInner[parseParam] !== 'undefined') {
        clonedToReset[parseParam] = clonedInitialStateInner[parseParam];
      }
    });

    debugLog(
      {},
      'state', state,
      'cloned initial state', clonedInitialStateInner,
      'setting', clonedToSet,
      'supposed to add', thingsToReduce,
      'reducing...', clonedToReduce,
      'supposed to reset', thingsToReset,
      'resetting', clonedToReset,
    );

    return {
      ...state,
      ...clonedToSet,
      ...clonedToReduce,
      ...clonedToReset,
    };
  };
};

export default parseReducer;
