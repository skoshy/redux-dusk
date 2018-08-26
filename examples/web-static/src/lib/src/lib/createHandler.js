function createHandlerLoop(typesObj, typePrefix) {
  const keys = Object.keys(typesObj);
}

export const createHandler = (params) => {
  // loop through types and populate actions, types, and reducers
  const { types, actions, reducers } = createHandlerLoop(params.types, '');
};

export default createHandler;
