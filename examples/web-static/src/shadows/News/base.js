export const name = 'news';
export const initialState = {
  newsArticles: [],
  loading: false,
  error: false,
};

export const types = {
  CLEAR_NEWS: `${name}/CLEAR_NEWS`,
  GET_NEWS_REQUEST: `${name}/GET_NEWS_REQUEST`,
  GET_NEWS_SUCCESS: `${name}/GET_NEWS_SUCCESS`,
  GET_NEWS_FAILURE: `${name}/GET_NEWS_FAILURE`,
};
