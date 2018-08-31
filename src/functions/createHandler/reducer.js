import { isObject, isArray, cloneObj, debugLog } from '../../helpers';

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

  if (isObject(reducerParams)) {
    thingsToReduce = [];
    if (reducerParams.reduce) {
      thingsToReduce = reducerParams.reduce;
    }

    if (reducerParams.reset) {
      if (reducerParams.reset === true) {
        // end here, everything should be reset
        return () => {
          const clonedInitialStateInner = cloneObj(initialState); // we must clone it in here again
          debugLog({}, 'Resetting to initial state for type', fullType);
          return { ...clonedInitialStateInner };
        };
      }

      thingsToReset = reducerParams.reset;
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
    let addToState = {};
    let addToStateKeys = Object.keys(addToState);
    const resetFromInitialState = {};

    thingsToReduce.forEach((parseParam) => {
      addToState = { ...addToState, ...parseReducerInnerLoop(parseParam) };
    });

    // update since we just added a bunch of keys
    addToStateKeys = Object.keys(addToState);

    return (state, action) => {
      const clonedInitialStateInner = cloneObj(initialState); // we must clone it in here again

      addToStateKeys.forEach((key) => {
        if (typeof action[key] !== 'undefined') {
          addToState[key] = action[key];
        }
      });

      thingsToReset.forEach((parseParam) => {
        if (clonedInitialStateInner[parseParam]) {
          resetFromInitialState[parseParam] = clonedInitialStateInner[parseParam];
        }
      });

      debugLog({}, 'state', state, 'addToState', addToState, 'reset', resetFromInitialState);

      return {
        ...state,
        ...addToState,
        ...resetFromInitialState,
      };
    };
  }

  return thingsToReduce;
};

export default parseReducer;
