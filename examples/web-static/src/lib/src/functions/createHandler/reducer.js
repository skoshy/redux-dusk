import { isObject, isArray, cloneObj } from '../../helpers';

export const parseReducer = (currentType, fullType, reducerParams, initialState) => {
  if (isArray(reducerParams)) {
    // it's an array; we'll append these new values to the state
    const addToState = {};
    reducerParams.forEach((parseParam) => {
      addToState[parseParam] = undefined;
    });
    const addToStateKeys = Object.keys(addToState);

    return (state, action) => {
      addToStateKeys.forEach((key) => {
        addToState[key] = action[key];
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
