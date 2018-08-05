export default class Dusk {
  // this is essentially mapStateToProps, but enhanced
  export static function stateMapper(state, selectedStateVars) {
    const itemsToMap = {};
    const selectedStateVarsKeys = Object.keys(selectedStateVars);

    // Add a case if you're adding a new duck
    selectedStateVarsKeys.forEach((selectedStateVarKey) => {
      const selectedStateVar = selectedStateVars[selectedStateVarKey];

      const paramDuck = selectedStateVar[0] || undefined;
      const paramName = selectedStateVar[1] || undefined;
      const paramType = selectedStateVar[2] || undefined;

      const duck = rootMapper[paramDuck];
      const name = paramName || selectedStateVarKey;
      const type = paramType || 'state';

      // determine where do we grab this state item from
      // options: from state, or we can use a selector
      let rootObjectToCheck = state[paramDuck]; // default if type is 'state'
      if (type === 'selector') {
        rootObjectToCheck = duck.selectors;
      }

      if (rootKeys.includes(paramDuck)) {
        itemsToMap[selectedStateVarKey] = rootObjectToCheck[name];
      }

      if (type === 'selector') {
        // run the selector function
        itemsToMap[selectedStateVarKey] = itemsToMap[selectedStateVarKey](state);
      }
    });

    return itemsToMap;
  }
}
