import axios from 'axios';
import { createLogic } from 'redux-logic';
import { types } from './';

export const logic = {
  getNews: createLogic({
    type: types.GET_NEWS_REQUEST, // only apply this logic to this type
    cancelType: types.GET_NEWS_FAILURE, // cancel on this type
    latest: true, // only take latest

    process({ getState }, dispatch, done) {
      const url = 'https://jsonplaceholder.typicode.com/posts';

      axios.get(url)
        .then(resp => dispatch({
          type: types.GET_NEWS_SUCCESS,
          newsArticles: resp.data,
        }))
        .catch((err) => {
          console.error(err);
          return dispatch({
            type: types.GET_NEWS_FAILURE,
            error: true,
          });
        })
        .then(() => done());
    },
  }),
};
export default logic;
