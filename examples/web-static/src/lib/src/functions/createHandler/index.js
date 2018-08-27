import { parseAction } from './action';
import { parseReducer } from './reducer';
import { typeSeparator } from '../../dusk';

function toProperCase(txt) {
  return txt.replace(/\w\S*/g, (innerTxt) => { return innerTxt.charAt(0).toUpperCase() + innerTxt.substr(1).toLowerCase(); });
}

function getCamelCaseParts(currentType) {
  const splitCurrentType = currentType.split(typeSeparator);
  return splitCurrentType.map(toProperCase);
}

function createHandlerLoop(params, prevType, camelCasePrevType, initialState, nameSpace) {
  const types = [];
  let actions = {};
  let reducers = {};

  const keys = Object.keys(params);

  keys.forEach((currentType) => {
    let nestedHandlerOutput;
    let camelCaseNextType = camelCasePrevType;
    const camelCaseParts = getCamelCaseParts(currentType);
    let nextType = prevType;

    const value = params[currentType];

    switch (currentType) {
      case 'action':
        actions[camelCasePrevType] = parseAction(currentType, nameSpace + typeSeparator + prevType, value);
        break;
      case 'reducer':
        reducers[nameSpace + typeSeparator + prevType] = parseReducer(currentType, nameSpace + typeSeparator + prevType, value, initialState);
        break;
      default:
        if (prevType !== '') {
          nextType += typeSeparator;
        } else {
          camelCaseParts[0] = camelCaseParts[0].toLowerCase();
        }
        camelCaseNextType += camelCaseParts.join('');
        nextType += currentType;
        types.push(nameSpace + typeSeparator + nextType);
        nestedHandlerOutput = createHandlerLoop(value, nextType, camelCaseNextType, initialState, nameSpace);
        types.push(...nestedHandlerOutput.types);
        actions = { ...actions, ...nestedHandlerOutput.actions };
        reducers = { ...reducers, ...nestedHandlerOutput.reducers };
    }

    return true;
  });

  return { types, actions, reducers };
}

export const createHandler = (params = {}) => {
  // loop through types and populate actions, types, and reducers
  const { types, actions, reducers } = createHandlerLoop(params.types, '', '', params.initialState, params.nameSpace);

  const finalReducer = (state = params.initialState, action) => {
    console.log('in final reducer', state, action);
    if (reducers[action.type]) {
      return reducers[action.type](state, action);
    }

    return { ...state };
  };

  const finalActions = actions;

  return {
    types,
    nameSpace: params.nameSpace,
    actions: finalActions,
    reducer: finalReducer,
  };
};

export default createHandler;
