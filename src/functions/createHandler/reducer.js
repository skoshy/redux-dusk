import { isObject, isArray, isFunction, cloneObj, debugLog } from '../../helpers';

function parseReducerInnerLoop(parseParam) {
  const toReturn = { };

  if (isObject(parseParam)) {
    // this is an object, e.x. {loading: false, error: 'Nothing found'}
    // let's loop through this object and set params accordingly
    const parseParamKeys = Object.keys(parseParam);
    parseParamKeys.forEach((parseParamKey) => {
      const parseInnerParam = parseParam[parseParamKey];
      toReturn[parseParamKey] = parseInnerParam;
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
  let addToState = {};
  const resetFromInitialState = {};

  if (isObject(reducerParams)) {
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

  debugLog(
    {},
    'Type', fullType,
    'Things to reduce', thingsToReduce,
    'Things to reset', thingsToReset,
  );

  if (isArray(thingsToReduce)) {
    // it's an array; we'll append these new values to the state, e.x. ['todos', 'lastUpdated']

    thingsToReduce.forEach((parseParam) => {
      addToState = { ...addToState, ...parseReducerInnerLoop(parseParam) };
    });
  }

  const addToStateKeys = Object.keys(addToState);

  return (state, action) => {
    const clonedInitialStateInner = cloneObj(initialState); // we must clone it in here again

    if (isFunction(thingsToReduce)) {
      addToState = thingsToReduce(state, action);
    } else {
      addToStateKeys.forEach((key) => {
        if (typeof action[key] !== 'undefined') {
          addToState[key] = action[key];
        }
      });
    }

    thingsToReset.forEach((parseParam) => {
      if (typeof clonedInitialStateInner[parseParam] !== 'undefined') {
        resetFromInitialState[parseParam] = clonedInitialStateInner[parseParam];
      }
    });

    debugLog({}, 'state', state, 'cloned initial state', clonedInitialStateInner, 'addToState', addToState, 'supposed to reset', thingsToReset, 'resetting', resetFromInitialState);

    return {
      ...state,
      ...addToState,
      ...resetFromInitialState,
    };
  };
};

export default parseReducer;
