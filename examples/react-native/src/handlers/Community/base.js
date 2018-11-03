import { createHandler } from 'redux-dusk';

export const {
  nameSpace,
  types,
  actions,
  reducer,
} = createHandler({
  nameSpace: `COMMUNITY`,
  initialState: {
    id: 0,
    name: ``,
    posts: [],
  },
  types: {
    SET: {
      COMMUNITY: {
        action: [`id`, `name`],
        reducer: {
          reduce: [`id`, `name`],
        },
      },
    },
    FETCH: {
      COMMUNITY: {
        action: [],

        SUCCESS: {
          action: [`posts`],
          reducer: [`posts`],
        },

        FAILURE: {
          action: [],
        },
      },
    },
  },
});
