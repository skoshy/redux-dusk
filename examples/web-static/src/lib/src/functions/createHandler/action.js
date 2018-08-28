export const parseAction = (currentType, fullType, parseActionParams) => {
  if (Array.isArray(parseActionParams)) {
    // let's create our own action
    return (...args) => {
      const actionParams = {};
      parseActionParams.forEach((parseActionParam, parseActionParamIndex) => {
        actionParams[parseActionParam] = args[parseActionParamIndex];
      });

      const action = {
        type: fullType,
        ...actionParams,
      };

      return action;
    };
  }

  // else, let's assume the user gave their own function as a param.
  // let's use that instead as the action.
  return parseActionParams;
};

export default parseAction;
