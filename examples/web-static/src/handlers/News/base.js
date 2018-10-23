import { createHandler } from '../../lib';

const initialState = {
  newsArticles: [],
  loading: false,
  error: false,
};

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: `NEWS`,
  initialState,
  types: {
    GET_LATEST: {
      REQUEST: {
        action: [],
        reducer: {
          set: { loading: true },
        },
      },
      SUCCESS: {
        reducer: {
          set: { loading: false, error: false },
          reduce: [`newsArticles`],
        },
      },
      FAILURE: {
        reducer: {
          set: { loading: false, error: true },
        },
      },
    },
    CLEAR: {
      action: [],
      reducer: {
        reset: true,
      },
    },
  },
});
