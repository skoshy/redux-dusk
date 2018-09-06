import { isObject, isArray, isFunction, cloneObj, debugLog } from '../../helpers';

function parseReducerInnerLoop(parseParam) {
  const toReturn = { };

  if (isObject(parseParam)) {
    // this is an object, e.x. {newUserName: 'username', inputtedText: 'docTitle'}
    // the key will be the variable name from the action, the value will be the state
    // var to set it to.
    const parseParamKeys = Object.keys(parseParam);
    parseParamKeys.forEach((actionVarName) => {
      const stateVarName = parseParam[actionVarName];
      toReturn[stateVarName] = actionVarName;
    });
  } else {
    // it's a string, so just set it to undefined
    toReturn[parseParam] = undefined;
  }

  return toReturn;
}

export const parseReducer = (currentType, fullType, reducerParams, initialState) => {
  let thingsToReduce = reducerParams;
  let thingsToReset = [];
  let toSet = {};
  let toAdd = {};
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

    thingsToReduce.forEach((parseParam) => {
      toAdd = { ...toAdd, ...parseReducerInnerLoop(parseParam) };
    });
  }

  const toAddKeys = Object.keys(toAdd);

  return (state, action) => {
    const clonedInitialStateInner = cloneObj(initialState); // we must clone it in here again

    if (isFunction(thingsToReduce)) {
      toAdd = thingsToReduce(state, action);
    } else {
      toAddKeys.forEach((key) => {
        if (typeof action[key] !== 'undefined') {
          toAdd[key] = action[key];
        }
      });
    }

    thingsToReset.forEach((parseParam) => {
      if (typeof clonedInitialStateInner[parseParam] !== 'undefined') {
        toReset[parseParam] = clonedInitialStateInner[parseParam];
      }
    });

    debugLog({}, 'state', state, 'cloned initial state', clonedInitialStateInner, 'addToState', toAdd, 'supposed to reset', thingsToReset, 'resetting', toReset);

    return {
      ...state,
      ...toSet,
      ...toAdd,
      ...toReset,
    };
  };
};

export default parseReducer;
