import { parseAction } from './action';
import { parseReducer } from './reducer';
import { typeSeparator } from '../../dusk';

function createHandlerLoop(params, typePrefix, initialState) {
  const types = [];
  const actions = [];
  const reducers = [];

  console.log('before keys', params);
  const keys = Object.keys(params);

  keys.forEach((currentType) => {
    let nestedHandlerOutput;
    const fullType = typePrefix + currentType;
    const value = params[currentType];

    switch (currentType) {
      case 'action':
        return actions.push(parseAction(currentType, fullType, value));
      case 'reducer':
        return reducers.push(parseReducer(currentType, fullType, value, initialState));
      default:
        types.push(fullType);
        nestedHandlerOutput = createHandlerLoop(value, fullType + typeSeparator, initialState);
        actions.push(...nestedHandlerOutput.actions);
        types.push(...nestedHandlerOutput.types);
        reducers.push(...nestedHandlerOutput.reducers);
    }
  });

  return { types, actions, reducers };
}

export const createHandler = (params) => {
  // loop through types and populate actions, types, and reducers
  const { types, actions, reducers } = createHandlerLoop(params.types, '', params.initialState);
  return { types, actions, reducers };
};

export default createHandler;
