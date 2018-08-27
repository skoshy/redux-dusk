import { name, initialState, types } from './base';

export { name, initialState, types };

export const actions = {
  clearNews: () => ({ type: types.CLEAR_NEWS }),
  getNews: () => ({ type: types.GET_NEWS_REQUEST }),
};

import logic from './logic'; /* eslint-disable-line import/first */

export { logic };

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        newsArticles: action.newsArticles,
      };
    case types.GET_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case types.CLEAR_NEWS:
      return { ...initialState };
    default:
      return state;
  }
}
