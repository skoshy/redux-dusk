import { parseAction } from './action';
import { typeSeparator } from '../../dusk';

function createHandlerLoop(typesObj, typePrefix) {
  const types = [];
  const actions = [];
  const reducers = [];
  const keys = Object.keys(typesObj);

  keys.forEach((currentType) => {
    const fullType = typePrefix + typeSeparator + currentType;
    const value = typesObj[currentType];

    switch (currentType) {
      case 'action':
        return parseAction(currentType, fullType, value);
      default:
        break;
    }
  });

  return { types, actions, reducers };
}

export const createHandler = (params) => {
  // loop through types and populate actions, types, and reducers
  const { types, actions, reducers } = createHandlerLoop(params.types, '');
};

export default createHandler;
