import { createHandler } from '../lib/src/dusk';

export const initialState = {
  newsArticles: [],
  loading: false,
  error: false,
};

export const { nameSpace, types, actions, reducer } = createHandler({
  nameSpace: 'NEWS',
  initialState,
  types: {
    GET_LATEST: {
      REQUEST: {
        action: [],
        reducer: [{ loading: true }],
      },
      SUCCESS: {
        action: ['newsArticles'],
        reducer: [{ loading: false, error: false }, 'newsArticles'],
      },
      FAILURE: {
        reducer: [{ loading: false, error: true }],
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

console.log('types', types);
