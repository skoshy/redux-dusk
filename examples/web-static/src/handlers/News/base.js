import { createHandler } from '../../lib';

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'NEWS',
  initialState: {
    newsArticles: [],
    loading: false,
    error: false,
  },
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
          reduce: ['newsArticles'],
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
