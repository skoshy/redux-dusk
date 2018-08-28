import { isObject, isArray, cloneObj } from '../../helpers';

export const parseReducer = (currentType, fullType, reducerParams, initialState) => {
  if (isArray(reducerParams)) {
    // it's an array; we'll append these new values to the state, e.x. ['todos', 'lastUpdated']
    const addToState = {};
    reducerParams.forEach((parseParam) => {
      if (isObject(parseParam)) {
        // this is an object, e.x. {loading: false, error: 'Nothing found'}
        // let's loop through this object and set params accordingly
        const parseParamKeys = Object.keys(parseParam);
        parseParamKeys.forEach((parseParamKey) => {
          const parseInnerParam = parseParam[parseParamKey];
          addToState[parseParamKey] = parseInnerParam;
        });
      } else {
        // it's a string, so just set it to undefined
        addToState[parseParam] = undefined;
      }
    });

    const addToStateKeys = Object.keys(addToState);

    return (state, action) => {
      addToStateKeys.forEach((key) => {
        if (typeof action[key] !== 'undefined' || typeof addToState[key] === 'undefined') {
          addToState[key] = action[key];
        }
      });

      return {
        ...state,
        ...addToState,
      };
    };
  }

  if (isObject(reducerParams)) {
    if (reducerParams.reset) {
      return () => {
        return { ...cloneObj(initialState) };
      };
    }
  }

  return reducerParams;
};

export default parseReducer;
