// @flow

/*
  autoMergeNameSpaces:
*/

export const autoMergeNameSpaces = (
  inboundState,
  originalState,
  reducedState,
  { debug },
) => {
  const newState = { ...reducedState };

  if (debug) {
    console.log('From redux-persist (autoMergeNameSpaces)', {
      orig: originalState,
      reduced: reducedState,
      inbound: inboundState,
    });
  }

  // inbound state is what's saved on the client's computer
  // original state is the initialState of our app

  // only rehydrate if inboundState exists and is an object
  if (inboundState && typeof inboundState === 'object') {
    // we will default to the given inbound state, but we'll add in initial variables and delete unused variables

    Object.keys(inboundState).forEach((inboundHandlerKey) => {
      // ignore _persist data
      if (inboundHandlerKey === '_persist') return;

      if (typeof newState[inboundHandlerKey] === 'undefined') {
        // this handler isn't part of the app's initial state anymore (i.e. this was an old handler name and it's been deleted)
        return;
      }

      // currently, we're at the nameSpaces level in the
      // state hierarchy
      const inboundHandlerState = inboundState[inboundHandlerKey];

      if (typeof inboundHandlerState === 'object') {
        // perform a shallow merge, overriding using the values in
        newState[inboundHandlerKey] = {
          ...newState[inboundHandlerKey],
          ...inboundHandlerState,
        };

        // now let's remove keys that aren't valid keys anymore (they used to be in the initial state, which is why they're set in the client, but they're not in the initial state anymore)
        Object.keys(inboundHandlerState).forEach((inboundHandlerStateKey) => {
          if (typeof reducedState[inboundHandlerKey][inboundHandlerStateKey] === 'undefined') {
            // this variable doesn't exist in our app's initialState anymore. so delete it from the client.
            delete newState[inboundHandlerKey][inboundHandlerStateKey];
          }
        });
      }
    });
  }

  if (debug) {
    console.log('Final new state', newState);
  }

  return newState;
};

export default autoMergeNameSpaces;
