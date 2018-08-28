import axios from 'axios';
import { createLogic } from 'redux-logic';
import { types } from './base';

export const logic = [
  createLogic({
    name: 'getNews',
    type: types.GET_LATEST_REQUEST, // only apply this logic to this type
    cancelType: types.GET_LATEST_FAILURE, // cancel on this type
    latest: true, // only take latest

    process(_, dispatch, done) {
      const url = 'https://jsonplaceholder.typicode.com/posts';

      axios.get(url)
        .then(resp => dispatch({
          type: types.GET_LATEST_SUCCESS,
          newsArticles: resp.data,
        }))
        .catch((err) => {
          console.error(err);
          return dispatch({
            type: types.GET_LATEST_FAILURE,
            error: true,
          });
        })
        .then(() => done());
    },
  }),
];
export default logic;
