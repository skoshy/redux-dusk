import { createHandler } from '../../lib';

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
        reducer: ['newsArticles', { loading: false, error: false }],
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
