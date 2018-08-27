import { combineReducers, bindActionCreators } from 'redux';
import { connect as reduxConnect } from 'react-redux';
import { createHandler } from './lib/createHandler';
import { setupDusk } from './lib/setupDusk';
import DuskView from './views';
import DuskShadow from './shadows';

export const typeSeparator = '_';

let globalShadows;
let globalShadowKeys;
const globalRootPieces = {
  reducer: {},
  logic: [],
};

class Dusk {
  static setup(propShadows) {
    globalShadows = propShadows;

    // set shadowKeys to be the Object.keys of the shadows
    // helper variable, used for iterating through the shadows var
    globalShadowKeys = Object.keys(globalShadows);

    // let's get the root pieces for reducers, logic, and sagas
    globalRootPieces.reducer = this.getRootReducer();
    globalRootPieces.logic = this.getRootLogic();

    return {
      rootReducer: globalRootPieces.reducer,
      rootLogic: globalRootPieces.logic,
    };
  }

  // creates the rootReducer, which is all the reducers combined into one.
  // this is passed to the store.
  static getRootReducer() {
    const reducersToCombine = {};

    globalShadowKeys.forEach((shadowKey) => {
      reducersToCombine[shadowKey] = globalShadows[shadowKey].reducer;
    });

    const combinedReducers = combineReducers(reducersToCombine);

    return combinedReducers;
  }

  static getRootLogic() {
    const combinedLogic = [];

    globalShadowKeys.forEach((shadowKey) => {
      if (globalShadows[shadowKey].logic) {
        const logicKeys = Object.keys(globalShadows[shadowKey].logic);
        logicKeys.forEach((logicFunctionKey) => {
          combinedLogic.push(globalShadows[shadowKey].logic[logicFunctionKey]);
        });
      }
    });

    return combinedLogic;
  }

  // this is essentially mapStateToProps, but enhanced
  static stateMapper(state, selectedStateVars) {
    const itemsToMap = {};
    const selectedStateVarsKeys = Object.keys(selectedStateVars);

    // Add a case if you're adding a new shadow
    selectedStateVarsKeys.forEach((selectedStateVarKey) => {
      const selectedStateVar = selectedStateVars[selectedStateVarKey];

      const paramShadow = selectedStateVar[0] || undefined;
      const paramName = selectedStateVar[1] || undefined;
      const paramType = selectedStateVar[2] || undefined;

      const shadow = globalShadows[paramShadow];
      const name = paramName || selectedStateVarKey;

      // determine where do we grab this state item from
      // options: from state, or we can use a selector
      let type = paramType;
      if (type === undefined) {
        // No type was specified, so let's check for ourselves
        // Selectors are preferred over state
        type = 'state';
        if (shadow.selectors && shadow.selectors[name]) {
          type = 'selector';
        }
      }

      let rootObjectToCheck = state[paramShadow]; // default if type is 'state'
      if (type === 'selector') {
        rootObjectToCheck = shadow.selectors;
      }

      if (globalShadowKeys.includes(paramShadow)) {
        itemsToMap[selectedStateVarKey] = rootObjectToCheck[name];
      }

      if (type === 'selector') {
        // run the selector function
        itemsToMap[selectedStateVarKey] = itemsToMap[selectedStateVarKey](state);
      }
    });

    return {
      $state: itemsToMap,
    };
  }

  // a function to map/import actions to a component
  static actionsMapper(dispatchToPassOff, selectedActions) {
    const itemsToMap = [];

    // Add a case if you're adding a new shadow
    selectedActions.forEach((selectedAction) => {
      if (globalShadowKeys.includes(selectedAction)) {
        const itemToMap = { name: selectedAction };
        const shadow = globalShadows[selectedAction];

        itemToMap.actions = shadow.actions || false;
        itemToMap.selectors = shadow.selectors || false;

        itemsToMap.push(itemToMap);
      }
    });

    // ===========================================================
    // Below does the heavy lifting of mapping actions/selectors
    // for us.
    // ===========================================================

    const mapDispatchToProps = (dispatch) => {
      const dispatchers = {
        $actions: {},
        $selectors: {},
      };

      itemsToMap.forEach((itemToMap) => {
        if (itemToMap.actions) {
          dispatchers.$actions[itemToMap.name] = bindActionCreators(itemToMap.actions, dispatch);
        }
        if (itemToMap.selectors) {
          dispatchers.$selectors[itemToMap.name] = bindActionCreators(
            itemToMap.selectors,
            dispatch,
          );
        }
      });

      return dispatchers;
    };

    return mapDispatchToProps(dispatchToPassOff);
  }

  // an abstraction layer over redux's connect
  // component     => the component to augment
  // actionsArray  => actions to import into the component
  // stateFunction => state vars to map to the component
  static connect(component, actionsArray, stateObject) {
    return reduxConnect(
      state => Dusk.stateMapper(state, stateObject),
      dispatch => Dusk.actionsMapper(dispatch, actionsArray),
    )(component);
  }
}


export { Dusk };
export { DuskShadow };
export { DuskView };

const { connect, rootPieces } = Dusk;
export { connect, rootPieces, createHandler, setupDusk };
