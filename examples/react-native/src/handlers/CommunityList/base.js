import { createHandler } from 'redux-dusk';

export const {
  nameSpace,
  types,
  actions,
  reducer,
} = createHandler({
  nameSpace: `COMMUNITY_LIST`,
  initialState: {
    communities: [],
  },
  types: {
    FETCH: {
      COMMUNITY_LIST: {
        action: [],

        SUCCESS: {
          action: [`communities`],
          reducer: [`communities`],
        },

        FAILURE: {
          action: [],
        },
      },
    },
  },
});
