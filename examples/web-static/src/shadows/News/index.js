import logic from './logic';

export const name = 'news';
export const initialState = {
  newsArticles: [],
};

export const types = {
  CLEAR_NEWS: `${name}/CLEAR_NEWS`,
  GET_NEWS_REQUEST: `${name}/GET_NEWS_REQUEST`,
  GET_NEWS_SUCCESS: `${name}/GET_NEWS_SUCCESS`,
  GET_NEWS_FAILURE: `${name}/GET_NEWS_FAILURE`,
};

export const actions = {
  clearNews: () => ({ type: types.CLEAR_NEWS }),
  getNews: () => ({ type: types.GET_NEWS_REQUEST }),
};

const selectors = {};
export { selectors };
export { logic };

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_NEWS_SUCCESS:
      return { ...state, newsArticles: action.newsArticles };
    case types.CLEAR_NEWS:
      return { ...initialState };
    default:
      return state;
  }
}
