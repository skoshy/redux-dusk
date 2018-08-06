import { combineReducers, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DuskShine from './src/shines';
import DuskShadow from './src/shadows';

class Dusk {
  static shadows;

  static shadowKeys;

  static shadowRootPieces = {};

  static setup(propShadows) {
    this.shadows = propShadows;

    // set shadowKeys to be the Object.keys of the shadows
    // helper variable, used for iterating through the shadows var
    this.shadowKeys = Object.keys(this.shadows);

    // let's get the root pieces for reducers, logic, and sagas
    this.shadowRootPieces.reducer = this.getRootReducer();
    this.shadowRootPieces.logic = this.getRootLogic();
  }

  // creates the rootReducer, which is all the reducers combined into one.
  // this is passed to the store.
  static getRootReducer() {
    const reducersToCombine = {};

    this.shadowKeys.forEach((shadowKey) => {
      reducersToCombine[shadowKey] = this.shadows[shadowKey].reducer;
    });

    const combinedReducers = combineReducers(reducersToCombine);

    return combinedReducers;
  }

  static getRootLogic() {
    const combinedLogic = [];

    this.shadowKeys.forEach((shadowKey) => {
      if (this.shadows[shadowKey].logic) {
        const logicKeys = Object.keys(this.shadows[shadowKey].logic);
        logicKeys.forEach((logicFunctionKey) => {
          combinedLogic.push(this.shadows[shadowKey].logic[logicFunctionKey]);
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

      const shadow = this.shadows[paramShadow];
      const name = paramName || selectedStateVarKey;
      const type = paramType || 'state';

      // determine where do we grab this state item from
      // options: from state, or we can use a selector
      let rootObjectToCheck = state[paramShadow]; // default if type is 'state'
      if (type === 'selector') {
        rootObjectToCheck = shadow.selectors;
      }

      if (this.shadowKeys.includes(paramShadow)) {
        itemsToMap[selectedStateVarKey] = rootObjectToCheck[name];
      }

      if (type === 'selector') {
        // run the selector function
        itemsToMap[selectedStateVarKey] = itemsToMap[selectedStateVarKey](state);
      }
    });

    return itemsToMap;
  }

  // a function to map/import actions to a component
  static actionsMapper(dispatchToPassOff, selectedActions) {
    const itemsToMap = [];

    // Add a case if you're adding a new shadow
    selectedActions.forEach((selectedAction) => {
      if (this.shadowKeys.includes(selectedAction)) {
        const itemToMap = { name: selectedAction };
        const shadow = this.shadows[selectedAction];

        itemToMap.actions = shadow.actions || false;
        itemToMap.selectors = shadow.selectors || false;

        itemsToMap.push(itemToMap);
      }
    });

    // ===========================================================
    // Below does the heavy lifting of mapping actions/selectors
    // for us. No need to edit below.
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
  static connectMapper(component, actionsArray, stateObject) {
    return connect(
      state => this.stateMapper(state, stateObject),
      dispatch => this.actionsMapper(dispatch, actionsArray),
    )(component);
  }
}


export { Dusk };
export { DuskShadow };
export { DuskShine };
