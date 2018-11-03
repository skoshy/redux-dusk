import { createLogic } from 'redux-logic';
import { types } from './base';

export const logic = [
  createLogic({
    name: `fetchCommunityList`, // just used for debugging purposes, not referenced anywhere

    type: types.FETCH_COMMUNITY_LIST, // only apply this logic to this type
    cancelType: types.FETCH_COMMUNITY_LIST_FAILURE, // cancel on this type
    latest: true, // only take latest

    process(_, dispatch, done) {
      // here is where we would do a network request with axios, just supplying static data now
      const communities = [
        {
          id: 1,
          name: `SW - AB/CW`,
        },
        {
          id: 2,
          name: `Otter Development`,
        },
        {
          id: 3,
          name: `Random Community #${Math.round(Math.random() * 100)}`,
        },
      ];

      dispatch({
        type: types.FETCH_COMMUNITY_LIST_SUCCESS,
        communities,
      });

      done();
    },
  }),
];
export default logic;
